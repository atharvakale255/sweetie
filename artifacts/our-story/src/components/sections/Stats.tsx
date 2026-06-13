import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// CUSTOMIZE: Change the label and percent (0–100) for each bar
const BARS = [
  { id: "vibe",    label: "Vibe Match",                     percent: 99 },
  { id: "chaos",   label: "Mutual Chaos Energy",             percent: 94 },
  { id: "comfort", label: "Comfort Level",                   percent: 100 },
  { id: "smile",   label: "Makes Me Smile Instantly",        percent: 100 },
  { id: "3am",     label: "3 AM Availability",               percent: 97 },
  { id: "trust",   label: "Trust Without Question",          percent: 100 },
  { id: "cringe",  label: "Tolerates My Unhinged Texts",     percent: 98 },
  { id: "stay",    label: "Chance I'm Keeping You Forever",  percent: 100 },
];

function Bar({ label, percent, index }: { label: string; percent: number; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-muted-foreground tracking-wide group-hover:text-foreground/80 transition-colors">
          {label}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.08 + 0.6 }}
          className="text-sm font-serif text-secondary tabular-nums"
        >
          {percent}%
        </motion.span>
      </div>

      {/* Track */}
      <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percent}%` } : {}}
          transition={{ delay: index * 0.08 + 0.2, duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="h-full rounded-full relative"
          style={{
            background: "linear-gradient(90deg, hsl(345 70% 65%), hsl(30 80% 60%))",
            boxShadow: "0 0 12px rgba(233,105,142,0.4)",
          }}
        >
          {/* Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Stats() {
  return (
    <section
      id="stats"
      className="py-24 px-6 md:px-12 bg-card/30 border-y border-white/5 my-12"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Official Results
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary mb-4">
            Tanu & Atharva
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Compatibility Report · Feb 2026 – Present
          </p>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="flex flex-col gap-6">
          {BARS.map((bar, i) => (
            <Bar key={bar.id} {...bar} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-muted-foreground/40 mt-10 italic"
        >
          * results may be biased. still accurate.
        </motion.p>
      </div>
    </section>
  );
}
