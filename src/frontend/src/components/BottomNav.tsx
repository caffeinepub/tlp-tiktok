import { Bell, Home, Plus, Search, User } from "lucide-react";
import { motion } from "motion/react";

type Tab = "home" | "discover" | "upload" | "notifications" | "profile";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  isLoggedIn: boolean;
}

const tabs = [
  { id: "home" as Tab, icon: Home, label: "Home" },
  { id: "discover" as Tab, icon: Search, label: "Discover" },
  { id: "upload" as Tab, icon: Plus, label: "Upload", special: true },
  { id: "notifications" as Tab, icon: Bell, label: "Activity" },
  { id: "profile" as Tab, icon: User, label: "Profile" },
];

export function BottomNav({
  activeTab,
  onTabChange,
  isLoggedIn,
}: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bottom-nav">
      <div
        className="flex items-center justify-around px-2 pt-2 pb-1"
        style={{
          background: "oklch(0.08 0 0 / 0.95)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid oklch(0.25 0.02 300 / 0.5)",
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.special) {
            return (
              <button
                key={tab.id}
                type="button"
                data-ocid="nav.upload_tab"
                onClick={() => onTabChange(tab.id)}
                className="flex items-center justify-center relative -mt-4"
                aria-label="Upload video"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center fab-upload shadow-pink-glow"
                >
                  <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
                </motion.div>
              </button>
            );
          }

          const dataOcid =
            tab.id === "home"
              ? "nav.home_tab"
              : tab.id === "discover"
                ? "nav.discover_tab"
                : tab.id === "notifications"
                  ? "nav.notifications_tab"
                  : "nav.profile_tab";

          return (
            <button
              key={tab.id}
              type="button"
              data-ocid={dataOcid}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-0.5 py-1 px-3 min-w-[52px] relative"
              aria-label={tab.label}
            >
              <div className="relative">
                <Icon
                  className="w-6 h-6 transition-colors duration-200"
                  style={{
                    color: isActive
                      ? "oklch(0.65 0.28 350)"
                      : "oklch(0.60 0.02 300)",
                    strokeWidth: isActive ? 2.5 : 1.8,
                  }}
                />
                {tab.id === "notifications" && isLoggedIn && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-tlp-pink" />
                )}
              </div>
              <span
                className="text-[10px] font-medium transition-colors duration-200"
                style={{
                  color: isActive
                    ? "oklch(0.65 0.28 350)"
                    : "oklch(0.55 0.01 300)",
                }}
              >
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-tlp-pink"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
