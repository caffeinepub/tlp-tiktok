import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, TrendingUp, UserPlus } from "lucide-react";
import { motion } from "motion/react";

const NOTIFICATIONS = [
  {
    id: "n1",
    type: "like",
    icon: Heart,
    color: "oklch(0.65 0.28 350)",
    user: "@funnycat23",
    action: "liked your video",
    detail: '"Big Buck Bunny Adventures"',
    time: "2m",
  },
  {
    id: "n2",
    type: "follow",
    icon: UserPlus,
    color: "oklch(0.72 0.18 195)",
    user: "@trendlover",
    action: "started following you",
    detail: "",
    time: "15m",
  },
  {
    id: "n3",
    type: "comment",
    icon: MessageCircle,
    color: "oklch(0.82 0.22 120)",
    user: "@dance.queen",
    action: "commented:",
    detail: '"This is fire!! 🔥🔥"',
    time: "1h",
  },
  {
    id: "n4",
    type: "like",
    icon: Heart,
    color: "oklch(0.65 0.28 350)",
    user: "@viral.clips",
    action: "liked your video",
    detail: '"Forest Journey"',
    time: "2h",
  },
  {
    id: "n5",
    type: "trend",
    icon: TrendingUp,
    color: "oklch(0.75 0.25 60)",
    user: "tlp TikTok",
    action: "Your video is trending! 🚀",
    detail: '"Sunset Dreams" is on the Discover page',
    time: "3h",
  },
  {
    id: "n6",
    type: "follow",
    icon: UserPlus,
    color: "oklch(0.72 0.18 195)",
    user: "@happy.vibes",
    action: "started following you",
    detail: "",
    time: "5h",
  },
];

export function NotificationsPage() {
  return (
    <div
      className="min-h-dvh pb-20 pt-14"
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
          Activity
        </h1>
      </div>

      <div className="px-4 pt-2">
        <div className="space-y-1">
          {NOTIFICATIONS.map((notif, i) => {
            const Icon = notif.icon;
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                data-ocid={`notifications.item.${i + 1}`}
              >
                <div className="relative flex-shrink-0">
                  <Avatar className="w-11 h-11">
                    <AvatarFallback
                      className="text-sm font-bold"
                      style={{
                        background: `${notif.color.replace(")", " / 0.2)")}`,
                        color: notif.color,
                      }}
                    >
                      {notif.user.slice(1, 3).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: notif.color }}
                  >
                    <Icon className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-bold">{notif.user}</span>{" "}
                    <span className="text-muted-foreground">
                      {notif.action}
                    </span>
                    {notif.detail && (
                      <span className="text-foreground"> {notif.detail}</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {notif.time} ago
                  </p>
                </div>

                {(notif.type === "like" || notif.type === "comment") && (
                  <div className="w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                    <video
                      src="https://www.w3schools.com/html/mov_bbb.mp4"
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      preload="metadata"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
