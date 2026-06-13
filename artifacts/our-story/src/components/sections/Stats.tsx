import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Smile, Moon, Star, Heart, Repeat2 } from "lucide-react";

// CUSTOMIZE: Change labels and display values to match your story.
// - set animate: true + target: N  →  counts up from 0 to N
// - set animate: false             →  displays the value as-is (text, symbols, %)
const STATS = [
  {
    id: "boring",
    display: "0",
    label: "Times I've been bored talking to you",
    animate: true,
    target: 0,
    icon: Smile,
  },
  {
    id: "days",
    display: "490",
    label: "Days and still not enough",
    animate: true,
    target: 490,
    icon: Clock,
  },
  {
    id: "timezone",
    display: "3 AM",
    label: "Our unofficial timezone",
    animate: false,
    target: 0,
    icon: Moon,
  },
  {
    id: "infinity",
    display: "∞",
    label: "Reasons I keep coming back",
    animate: false,
    target: 0,
    icon: Star,
  },
  {
    id: "one",
    display: "1",
    label: "Person who gets me like this",
    animate: true,
    target: 1,
    icon: Heart,
  },
  {
    id: "hundred",
    display: "100%",
    label: "Chance I'd choose you again",
    animate: false,
    target: 0,
    icon: Repeat2,
  },
];

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    if (target === 0) { setCount(0); return; }
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, isInView]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-serif text-secondary">
      {count.toLocaleString()}
    </span>
  );
}

function StaticDisplay({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="text-4xl md:text-5xl lg:text-6xl font-serif text-secondary"
    >
      {value}
    </motion.span>
  );
}

export function Stats() {
  return (
    <section
      id="stats"
      className="py-24 px-6 md:px-12 bg-card/30 border-y border-white/5 my-12"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary mb-4">
            By The Numbers
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-14">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="p-4 rounded-full bg-secondary/10 text-secondary mb-1">
                  <Icon className="w-6 h-6 md:w-7 md:h-7" />
                </div>

                {stat.animate
                  ? <AnimatedCounter target={stat.target} />
                  : <StaticDisplay value={stat.display} />
                }

                <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest leading-relaxed">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
