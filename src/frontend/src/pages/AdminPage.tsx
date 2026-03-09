import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Loader2,
  Shield,
  Trash2,
  Users,
  Video,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { SAMPLE_VIDEOS } from "../data/sampleVideos";
import { formatCount } from "../data/sampleVideos";
import {
  useDeleteVideo,
  useGetAllUsers,
  useGetFeed,
  useIsAdmin,
} from "../hooks/useQueries";

export function AdminPage() {
  const { data: isAdmin, isLoading: checkingAdmin } = useIsAdmin();
  const { data: videos } = useGetFeed(0, 50);
  const { data: users } = useGetAllUsers();
  const deleteVideo = useDeleteVideo();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const displayVideos = videos && videos.length > 0 ? videos : SAMPLE_VIDEOS;
  const displayUsers = users ?? [];

  const handleDelete = async (videoId: string) => {
    setDeletingId(videoId);
    try {
      await deleteVideo.mutateAsync(videoId);
      toast.success("Video deleted");
    } catch {
      toast.error("Failed to delete video");
    } finally {
      setDeletingId(null);
    }
  };

  if (checkingAdmin) {
    return (
      <div
        className="min-h-dvh flex items-center justify-center"
        style={{ background: "oklch(0.08 0 0)" }}
      >
        <Loader2 className="w-8 h-8 animate-spin text-tlp-pink" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div
        className="min-h-dvh pb-20 pt-14 flex flex-col items-center justify-center px-8 gap-6"
        style={{ background: "oklch(0.08 0 0)" }}
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{ background: "oklch(0.62 0.26 27 / 0.2)" }}
        >
          <AlertTriangle
            className="w-10 h-10"
            style={{ color: "oklch(0.62 0.26 27)" }}
          />
        </div>
        <div className="text-center">
          <h2 className="font-display font-black text-2xl text-foreground mb-2">
            Access Denied
          </h2>
          <p className="text-muted-foreground text-sm">
            You need admin privileges to access this panel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-dvh pb-24 pt-14"
      style={{ background: "oklch(0.08 0 0)" }}
      data-ocid="admin.panel"
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
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-tlp-pink" />
          <h1 className="font-display font-black text-xl text-foreground">
            Admin Panel
          </h1>
        </div>
      </div>

      <div className="px-4 pt-2">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            {
              label: "Total Videos",
              value: displayVideos.length.toString(),
              color: "oklch(0.65 0.28 350)",
            },
            {
              label: "Total Users",
              value: (displayUsers.length || 5).toString(),
              color: "oklch(0.72 0.18 195)",
            },
            { label: "Reports", value: "3", color: "oklch(0.62 0.26 27)" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-3 text-center"
              style={{
                background: "oklch(0.12 0.005 300)",
                border: "1px solid oklch(0.20 0.02 300)",
              }}
            >
              <p
                className="font-display font-black text-xl"
                style={{ color: stat.color }}
              >
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="videos">
          <TabsList
            className="w-full mb-4 rounded-xl"
            style={{ background: "oklch(0.12 0.005 300)" }}
          >
            <TabsTrigger
              value="videos"
              data-ocid="admin.videos_tab"
              className="flex-1 flex items-center gap-1.5 rounded-lg"
            >
              <Video className="w-4 h-4" />
              Videos
            </TabsTrigger>
            <TabsTrigger
              value="users"
              data-ocid="admin.users_tab"
              className="flex-1 flex items-center gap-1.5 rounded-lg"
            >
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
          </TabsList>

          {/* Videos tab */}
          <TabsContent value="videos">
            <div className="space-y-2">
              {displayVideos.map((item, i) => {
                const isSample = !videos || videos.length === 0;
                const id = isSample
                  ? (item as (typeof SAMPLE_VIDEOS)[0]).id
                  : (item as { id: string }).id;
                const title = isSample
                  ? (item as (typeof SAMPLE_VIDEOS)[0]).title
                  : (item as { title: string }).title;
                const views = isSample
                  ? (item as (typeof SAMPLE_VIDEOS)[0]).views
                  : Number((item as { views: bigint }).views);
                const likes = isSample
                  ? (item as (typeof SAMPLE_VIDEOS)[0]).likes
                  : Number((item as { likes: bigint }).likes);

                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{
                      background: "oklch(0.12 0.005 300)",
                      border: "1px solid oklch(0.18 0.01 300)",
                    }}
                    data-ocid={`admin.video.item.${i + 1}`}
                  >
                    <div className="w-12 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <video
                        src={
                          isSample
                            ? (item as (typeof SAMPLE_VIDEOS)[0]).videoUrl
                            : undefined
                        }
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                        preload="metadata"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {title}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground">
                          👁 {formatCount(views)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ❤️ {formatCount(likes)}
                        </span>
                      </div>
                    </div>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          data-ocid={`admin.delete_button.${i + 1}`}
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 flex-shrink-0 hover:bg-destructive/20"
                          aria-label="Delete video"
                          disabled={deletingId === id}
                        >
                          {deletingId === id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4 text-destructive" />
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent
                        data-ocid="admin.dialog"
                        style={{ background: "oklch(0.12 0.005 300)" }}
                      >
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Video?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete "{title}". This action
                            cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel data-ocid="admin.cancel_button">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            data-ocid="admin.confirm_button"
                            onClick={() => handleDelete(id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* Users tab */}
          <TabsContent value="users">
            {displayUsers.length === 0 ? (
              // Show sample users if no real users
              <div className="space-y-2">
                {[
                  "@wild.creator",
                  "@forest.vibes",
                  "@dreamy.shots",
                  "@epic.moments",
                  "@planet.earth.fan",
                ].map((username, i) => (
                  <motion.div
                    key={username}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{
                      background: "oklch(0.12 0.005 300)",
                      border: "1px solid oklch(0.18 0.01 300)",
                    }}
                    data-ocid={`admin.user.item.${i + 1}`}
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarFallback
                        style={{
                          background: "oklch(0.65 0.28 350 / 0.3)",
                          color: "oklch(0.65 0.28 350)",
                        }}
                        className="text-sm font-bold"
                      >
                        {username.slice(1, 3).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">
                        {username}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Active user · {Math.floor(Math.random() * 50 + 5)}{" "}
                        videos
                      </p>
                    </div>
                    <Button
                      data-ocid={`admin.delete_button.${i + 1}`}
                      variant="ghost"
                      size="sm"
                      className="text-xs text-destructive hover:bg-destructive/20 h-8"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Remove
                    </Button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {displayUsers.map((user, i) => (
                  <motion.div
                    key={user.username}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{
                      background: "oklch(0.12 0.005 300)",
                      border: "1px solid oklch(0.18 0.01 300)",
                    }}
                    data-ocid={`admin.user.item.${i + 1}`}
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarFallback
                        style={{
                          background: "oklch(0.65 0.28 350 / 0.3)",
                          color: "oklch(0.65 0.28 350)",
                        }}
                        className="text-sm font-bold"
                      >
                        {user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">
                        @{user.username}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatCount(Number(user.followers))} followers ·{" "}
                        {formatCount(Number(user.following))} following
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
