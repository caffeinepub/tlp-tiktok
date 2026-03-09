import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Video {
    id: string;
    title: string;
    creator: Principal;
    views: bigint;
    description: string;
    videoBlob: ExternalBlob;
    likes: bigint;
    thumbnailBlob: ExternalBlob;
    timestamp: bigint;
}
export interface UserProfile {
    bio: string;
    username: string;
    avatarUrl: string;
    followers: bigint;
    following: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addComment(videoId: string, text: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createVideo(id: string, title: string, description: string, videoBlob: ExternalBlob, thumbnailBlob: ExternalBlob): Promise<void>;
    deleteVideo(videoId: string): Promise<void>;
    followUser(user: Principal): Promise<void>;
    getAllUsers(): Promise<Array<UserProfile>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFeed(offset: bigint, limit: bigint): Promise<Array<Video>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    likeVideo(videoId: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
