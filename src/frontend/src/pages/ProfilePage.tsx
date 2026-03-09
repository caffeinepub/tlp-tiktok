import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Edit2,
  Grid3X3,
  Heart,
  Loader2,
  LogIn,
  LogOut,
  Settings,
  Share2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { SAMPLE_VIDEOS, formatCount } from "../data/sampleVideos";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCallerProfile, useSaveProfile } from "../hooks/useQueries";
import type { UserProfile } from "../hooks/useQueries";

export function ProfilePage() {
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const { data: profile, isLoading } = useGetCallerProfile();
  const saveProfile = useSaveProfile();
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState<UserProfile>({
    username: "",
    bio: "",
    avatarUrl: "",
    followers: 0n,
    following: 0n,
  });

  const displayProfile = profile ?? {
    username: identity
      ? `user_${identity.getPrincipal().toString().slice(0, 8)}`
      : "Guest",
    bio: identity
      ? "Welcome to tlp TikTok! 🎵"
      : "Login to personalize your profile",
    avatarUrl: "",
    followers: 0n,
    following: 0n,
  };

  const handleEditOpen = () => {
    setEditData({
      username: displayProfile.username,
      bio: displayProfile.bio,
      avatarUrl: displayProfile.avatarUrl ?? "",
      followers: displayProfile.followers,
      following: displayProfile.following,
    });
    setEditOpen(true);
  };

  const handleSave = async () => {
    if (!identity) return;
    try {
      await saveProfile.mutateAsync(editData);
      setEditOpen(false);
      toast.success("Profile updated!");
    } catch {
      toast.error("Failed to save profile");
    }
  };

  if (!identity) {
    return (
      <div
        className="min-h-dvh pb-20 pt-14 flex flex-col"
        style={{ background: "oklch(0.08 0 0)" }}
      >
        {/* Header */}
        <div
          className="fixed top-0 left-0 right-0 z-30 px-4 pt-12 pb-3"
          style={{
            background: "oklch(0.08 0 0 / 0.95)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid oklch(0.20 0.02 300 / 0.5)",
          }}
        >
          <h1 className="font-display font-black text-xl text-foreground">
            Profile
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 gap-8 px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6 w-full max-w-xs"
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background: "oklch(0.18 0.01 300)" }}
            >
              <LogIn className="w-10 h-10 text-tlp-pink" />
            </div>
            <div className="text-center">
              <h2 className="font-display font-black text-2xl text-foreground mb-2">
                Join tlp TikTok
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Sign in to create your profile, upload videos, like content and
                connect with creators.
              </p>
            </div>

            <Button
              data-ocid="auth.login_button"
              onClick={login}
              disabled={isLoggingIn}
              className="w-full h-12 rounded-xl font-bold text-base text-white"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.28 350), oklch(0.72 0.18 195))",
              }}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Secured by Internet Identity · No password needed
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-dvh pb-24 pt-14"
      style={{ background: "oklch(0.08 0 0)" }}
    >
      {/* Header */}
      <div
        className="fixed top-0 left-0 right-0 z-30 px-4 pt-12 pb-3"
        style={{
          background: "oklch(0.08 0 0 / 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid oklch(0.20 0.02 300 / 0.5)",
        }}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-display font-black text-xl text-foreground">
            Profile
          </h1>
          <button
            type="button"
            onClick={clear}
            aria-label="Logout"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center pt-20">
          <Loader2 className="w-8 h-8 animate-spin text-tlp-pink" />
        </div>
      ) : (
        <div className="px-4 pt-4">
          {/* Profile header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 pb-6"
          >
            <Avatar className="w-24 h-24 ring-2 ring-tlp-pink ring-offset-2 ring-offset-background">
              <AvatarFallback
                className="text-2xl font-black"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.28 350 / 0.4), oklch(0.72 0.18 195 / 0.4))",
                  color: "white",
                }}
              >
                {displayProfile.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="text-center">
              <h2 className="font-display font-black text-xl text-foreground">
                @{displayProfile.username}
              </h2>
              <p className="text-muted-foreground text-sm mt-1 max-w-xs">
                {displayProfile.bio}
              </p>
              <p className="text-xs text-muted-foreground mt-2 font-mono opacity-60">
                {identity.getPrincipal().toString().slice(0, 20)}...
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8">
              {[
                {
                  label: "Following",
                  value: formatCount(Number(displayProfile.following)),
                },
                {
                  label: "Followers",
                  value: formatCount(Number(displayProfile.followers)),
                },
                { label: "Likes", value: "0" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display font-black text-lg text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 w-full max-w-xs">
              <Button
                data-ocid="profile.edit_button"
                onClick={handleEditOpen}
                variant="outline"
                className="flex-1 h-10 rounded-xl border-border/60 font-semibold text-sm"
              >
                <Edit2 className="w-4 h-4 mr-1.5" />
                Edit Profile
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-xl border-border/60"
                aria-label="Share profile"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-xl border-border/60"
                aria-label="Settings"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Video grid tabs */}
          <div className="flex border-b border-border/30 mb-1">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold border-b-2 border-tlp-pink text-foreground"
            >
              <Grid3X3 className="w-4 h-4" />
              Videos
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-muted-foreground"
            >
              <Heart className="w-4 h-4" />
              Liked
            </button>
          </div>

          {/* Videos grid */}
          <div className="grid grid-cols-3 gap-0.5">
            {SAMPLE_VIDEOS.slice(0, 3).map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="relative aspect-[9/16] overflow-hidden bg-muted cursor-pointer"
                data-ocid={`profile.video.item.${i + 1}`}
              >
                <video
                  src={video.videoUrl}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="thumbnail-overlay absolute inset-0" />
                <div className="absolute bottom-1 left-1">
                  <span className="text-white text-xs font-semibold drop-shadow">
                    ▶ {formatCount(video.views)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Profile Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent
          data-ocid="profile.dialog"
          className="max-w-sm mx-4 rounded-2xl"
          style={{ background: "oklch(0.12 0.005 300)" }}
        >
          <DialogHeader>
            <DialogTitle className="font-display font-black">
              Edit Profile
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label className="text-sm font-semibold mb-1.5 block">
                Username
              </Label>
              <Input
                data-ocid="profile.input"
                value={editData.username}
                onChange={(e) =>
                  setEditData((p) => ({ ...p, username: e.target.value }))
                }
                placeholder="Your username"
                className="bg-muted border-border/40 rounded-xl"
              />
            </div>
            <div>
              <Label className="text-sm font-semibold mb-1.5 block">Bio</Label>
              <Textarea
                data-ocid="profile.textarea"
                value={editData.bio}
                onChange={(e) =>
                  setEditData((p) => ({ ...p, bio: e.target.value }))
                }
                placeholder="Tell the world about yourself..."
                rows={3}
                className="bg-muted border-border/40 rounded-xl resize-none text-sm"
              />
            </div>
            <div className="flex gap-3">
              <Button
                data-ocid="profile.cancel_button"
                variant="outline"
                className="flex-1 rounded-xl border-border/40"
                onClick={() => setEditOpen(false)}
              >
                Cancel
              </Button>
              <Button
                data-ocid="profile.save_button"
                onClick={handleSave}
                disabled={saveProfile.isPending}
                className="flex-1 rounded-xl text-white font-bold"
                style={{ background: "oklch(0.65 0.28 350)" }}
              >
                {saveProfile.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
