import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Smile, MessageCircle, Moon, Phone, CalendarHeart } from "lucide-react";

// CUSTOMIZE: Change the target values for your stats
const STATS = [
  { id: "hours", label: "Hours Spent Talking", target: 847, icon: Clock },
  { id: "laughs", label: "Times We Laughed", target: 1203, icon: Smile },
  { id: "jokes", label: "Inside Jokes", target: 64, icon: MessageCircle },
  { id: "late", label: "Times Up Too Late", target: 112, icon: Moon },
  { id: "calls", label: "Voice Calls", target: 38, icon: Phone },
  { id: "days", label: "Days Since We Met", target: 365, icon: CalendarHeart }, // Or calculate dynamically
];

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps

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

  return <span ref={ref} className="text-3xl md:text-4xl font-serif text-secondary">{count.toLocaleString()}</span>;
}

export function Stats() {
  return (
    <section id="stats" className="py-24 px-4 md:px-8 bg-card/30 border-y border-white/5 my-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-primary mb-4">By The Numbers</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center space-y-3"
              >
                <div className="p-3 rounded-full bg-secondary/10 text-secondary mb-2">
                  <Icon className="w-6 h-6" />
                </div>
                <AnimatedCounter target={stat.target} />
                <span className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
