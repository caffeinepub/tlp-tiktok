import { Toaster } from "@/components/ui/sonner";
import { Shield } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { BottomNav } from "./components/BottomNav";
import { SplashScreen } from "./components/SplashScreen";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useIsAdmin } from "./hooks/useQueries";
import { AdminPage } from "./pages/AdminPage";
import { DiscoverPage } from "./pages/DiscoverPage";
import { HomePage } from "./pages/HomePage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { UploadPage } from "./pages/UploadPage";

type Tab = "home" | "discover" | "upload" | "notifications" | "profile";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [showAdmin, setShowAdmin] = useState(false);
  const { identity } = useInternetIdentity();
  const { data: isAdmin } = useIsAdmin();

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const renderPage = () => {
    if (showAdmin) return <AdminPage />;
    switch (activeTab) {
      case "home":
        return <HomePage />;
      case "discover":
        return <DiscoverPage />;
      case "upload":
        return <UploadPage />;
      case "notifications":
        return <NotificationsPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <>
      {/* Splash */}
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {/* Main App */}
      {!showSplash && (
        <div
          className="relative min-h-dvh"
          style={{ background: "oklch(0.08 0 0)" }}
        >
          {/* Admin button - visible only to admins */}
          {isAdmin && identity && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setShowAdmin((v) => !v)}
              className="fixed top-4 right-4 z-50 w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: showAdmin
                  ? "oklch(0.65 0.28 350)"
                  : "oklch(0.18 0.01 300)",
                border: "1px solid oklch(0.65 0.28 350 / 0.5)",
              }}
              aria-label="Toggle Admin Panel"
            >
              <Shield className="w-4 h-4 text-white" />
            </motion.button>
          )}

          {/* Page content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={showAdmin ? "admin" : activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>

          {/* Bottom Nav */}
          {!showAdmin && (
            <BottomNav
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                setShowAdmin(false);
              }}
              isLoggedIn={!!identity}
            />
          )}
        </div>
      )}

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "oklch(0.18 0.01 300)",
            border: "1px solid oklch(0.25 0.02 300)",
            color: "oklch(0.97 0 0)",
          },
        }}
      />
    </>
  );
}
