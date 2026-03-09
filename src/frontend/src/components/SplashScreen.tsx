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
            {/* TLP uploaded image */}
            <motion.div
              className="relative"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-50 blur-xl"
                style={{ background: "oklch(0.55 0.22 145)" }}
              />
              <img
                src="/assets/uploads/tlp-tehreek-e-labbaik-pakistan-260nw-2418832045-3-1.jpg"
                alt="TLP Tehreek-e-Labbaik Pakistan"
                className="relative w-64 md:w-80 object-contain rounded-2xl shadow-2xl"
                style={{
                  border: "3px solid oklch(0.55 0.22 145 / 0.8)",
                  boxShadow:
                    "0 0 40px oklch(0.55 0.22 145 / 0.5), 0 20px 60px oklch(0 0 0 / 0.6)",
                }}
              />
            </motion.div>

            {/* TLP TikTok text in capital letters */}
            <div className="flex flex-col items-center gap-2">
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span
                  className="font-black tracking-widest uppercase"
                  style={{
                    fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                    color: "oklch(0.55 0.22 145)",
                    textShadow:
                      "0 0 30px oklch(0.55 0.22 145 / 0.6), 2px 2px 0 oklch(0 0 0 / 0.5)",
                    letterSpacing: "0.15em",
                  }}
                >
                  TLP
                </span>
                <span
                  className="font-black tracking-wider uppercase text-white"
                  style={{
                    fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                    textShadow:
                      "0 0 30px oklch(1 0 0 / 0.4), 2px 2px 0 oklch(0 0 0 / 0.5)",
                    letterSpacing: "0.1em",
                  }}
                >
                  TIKTOK
                </span>
              </motion.div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="h-0.5 w-48 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.55 0.22 145), oklch(1 0 0 / 0.6), transparent)",
                }}
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-sm tracking-widest uppercase font-medium"
                style={{ color: "oklch(0.75 0.1 145)" }}
              >
                لبیک یا رسول اللہ ﷺ
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
