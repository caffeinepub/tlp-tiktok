import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase("hold"), 800);
    const outTimer = setTimeout(() => setPhase("out"), 2400);
    const doneTimer = setTimeout(() => onComplete(), 3000);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(outTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "out" ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-tlp-dark overflow-hidden"
        >
          {/* Background particle effects */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }, (_, i) => i).map((i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background:
                    i % 2 === 0
                      ? "oklch(0.65 0.28 350)"
                      : "oklch(0.72 0.18 195)",
                  left: `${(i * 37 + 5) % 100}%`,
                  top: `${(i * 53 + 10) % 100}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Radial glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.65 0.28 350) 0%, transparent 70%)",
              }}
            />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            {/* Main logo image */}
            <motion.img
              src="/assets/generated/tlp-tiktok-logo-transparent.dim_600x300.png"
              alt="tlp TikTok"
              className="w-72 md:w-96 object-contain"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Fallback text logo */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-baseline gap-1">
                <span
                  className="font-display text-5xl md:text-7xl font-black tracking-tight"
                  style={{
                    color: "oklch(0.65 0.28 350)",
                    textShadow:
                      "-3px -3px 0 oklch(0.72 0.18 195 / 0.7), 3px 3px 0 oklch(0.65 0.28 350 / 0.7), 0 0 40px oklch(0.65 0.28 350 / 0.5)",
                  }}
                >
                  tlp
                </span>
                <span
                  className="font-display text-5xl md:text-7xl font-black tracking-tight text-white"
                  style={{
                    textShadow: "0 0 30px oklch(1 0 0 / 0.4)",
                  }}
                >
                  TikTok
                </span>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-sm text-muted-foreground tracking-widest uppercase font-medium"
              >
                Short Videos · Unlimited Fun
              </motion.p>
            </div>

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-2 mt-4"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ background: "oklch(0.65 0.28 350)" }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 0.8,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Bottom brand */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 text-xs text-muted-foreground"
          >
            © {new Date().getFullYear()} tlp TikTok
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
