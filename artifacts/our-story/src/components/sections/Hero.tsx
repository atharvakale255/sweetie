import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

// CUSTOMIZE: Set initials, names, and the subtitle
const INITIALS_LEFT = "Y";
const INITIALS_RIGHT = "M";
const SUBTITLE = "From strangers on the internet, to something I never expected.";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-12 px-6 w-full max-w-4xl mx-auto">
        {/* Avatars */}
        <motion.div
          className="flex items-center gap-8 md:gap-16 lg:gap-24"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="flex h-28 w-28 md:h-40 md:w-40 lg:h-48 lg:w-48 items-center justify-center rounded-full border-2 border-primary/30 bg-card shadow-[0_0_50px_rgba(233,105,142,0.2)]">
            <span className="font-serif text-4xl md:text-6xl lg:text-7xl text-primary">
              {INITIALS_LEFT}
            </span>
          </div>

          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-serif text-3xl md:text-5xl lg:text-6xl text-secondary">
              &
            </span>
          </motion.div>

          <div className="flex h-28 w-28 md:h-40 md:w-40 lg:h-48 lg:w-48 items-center justify-center rounded-full border-2 border-secondary/30 bg-card shadow-[0_0_50px_rgba(242,166,90,0.2)]">
            <span className="font-serif text-4xl md:text-6xl lg:text-7xl text-secondary">
              {INITIALS_RIGHT}
            </span>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-wide mb-6">
            Our Story
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl font-light italic leading-relaxed">
            {SUBTITLE}
          </p>
        </motion.div>
      </div>

      {/* Scroll Down */}
      <motion.div
        className="absolute bottom-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-8 w-8 text-primary/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
