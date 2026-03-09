import Map "mo:core/Map";
import Array "mo:core/Array";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Set "mo:core/Set";
import Order "mo:core/Order";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Storage "blob-storage/Storage";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  type UserProfile = {
    username : Text;
    bio : Text;
    avatarUrl : Text;
    followers : Nat;
    following : Nat;
  };

  type Video = {
    id : Text;
    title : Text;
    description : Text;
    videoBlob : Storage.ExternalBlob;
    thumbnailBlob : Storage.ExternalBlob;
    creator : Principal;
    likes : Nat;
    views : Nat;
    timestamp : Int;
  };

  type Comment = {
    videoId : Text;
    text : Text;
    author : Principal;
    timestamp : Int;
  };

  module Video {
    public func compareByTimestamp(vid1 : Video, vid2 : Video) : Order.Order {
      Int.compare(vid2.timestamp, vid1.timestamp);
    };
  };

  let profiles = Map.empty<Principal, UserProfile>();
  let videos = Map.empty<Text, Video>();
  let comments = Map.empty<Text, [Comment]>();
  let followers = Map.empty<Principal, Set.Set<Principal>>();
  let following = Map.empty<Principal, Set.Set<Principal>>();

  func getOrCreateSet(map : Map.Map<Principal, Set.Set<Principal>>, key : Principal) : Set.Set<Principal> {
    switch (map.get(key)) {
      case (null) {
        let newSet = Set.empty<Principal>();
        map.add(key, newSet);
        newSet;
      };
      case (?existingSet) { existingSet };
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    profiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    profiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    profiles.add(caller, profile);
  };

  public shared ({ caller }) func createVideo(
    id : Text,
    title : Text,
    description : Text,
    videoBlob : Storage.ExternalBlob,
    thumbnailBlob : Storage.ExternalBlob
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create videos");
    };

    let video : Video = {
      id;
      title;
      description;
      videoBlob;
      thumbnailBlob;
      creator = caller;
      likes = 0;
      views = 0;
      timestamp = Time.now();
    };
    videos.add(id, video);
  };

  public shared ({ caller }) func likeVideo(videoId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can like videos");
    };

    let video = switch (videos.get(videoId)) {
      case (null) { Runtime.trap("Video not found") };
      case (?video) { video };
    };

    let updatedVideo = {
      video with
      likes = video.likes + 1;
    };
    videos.add(videoId, updatedVideo);
  };

  public shared ({ caller }) func addComment(videoId : Text, text : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can comment");
    };

    let comment : Comment = {
      videoId;
      text;
      author = caller;
      timestamp = Time.now();
    };

    let existingComments = switch (comments.get(videoId)) {
      case (null) { [] };
      case (?c) { c };
    };

    let commentList = List.fromArray<Comment>([comment]);
    commentList.addAll(existingComments.values());
    comments.add(videoId, commentList.toArray());
  };

  public shared ({ caller }) func followUser(user : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can follow others");
    };

    let callerFollowing = getOrCreateSet(following, caller);
    let userFollowers = getOrCreateSet(followers, user);

    if (callerFollowing.contains(user)) {
      Runtime.trap("Already following this user");
    };

    callerFollowing.add(user);
    userFollowers.add(caller);
  };

  public query ({ caller }) func getFeed(offset : Nat, limit : Nat) : async [Video] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view the feed");
    };

    let allVideos = videos.values().toArray();
    if (offset >= allVideos.size()) { return [] };
    let sortedVideos = allVideos.sort(Video.compareByTimestamp);

    let end = if (offset + limit > sortedVideos.size()) {
      sortedVideos.size();
    } else { offset + limit };

    sortedVideos.sliceToArray(offset, end - offset);
  };

  public shared ({ caller }) func deleteVideo(videoId : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete videos");
    };
    videos.remove(videoId);
  };

  public query ({ caller }) func getAllUsers() : async [UserProfile] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all users");
    };
    profiles.values().toArray();
  };
};
