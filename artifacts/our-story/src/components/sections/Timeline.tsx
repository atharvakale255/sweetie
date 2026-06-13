import { motion } from "framer-motion";
import { Camera } from "lucide-react";

// CUSTOMIZE: Add your actual timeline events here
const TIMELINE_EVENTS = [
  {
    id: 1,
    date: "Month Year",
    title: "The First Message",
    description: "// TODO: Add your memory here about how you first talked.",
  },
  {
    id: 2,
    date: "Month Year",
    title: "The First VC",
    description: "// TODO: Describe how nervous or excited you were for the first voice call.",
  },
  {
    id: 3,
    date: "Month Year",
    title: "When I Realized",
    description: "// TODO: Add the moment you realized this was more than just a regular friendship.",
  },
  {
    id: 4,
    date: "Month Year",
    title: "Our First Game Together",
    description: "// TODO: Add a memory about a game you played or something you watched together.",
  },
  {
    id: 5,
    date: "Month Year",
    title: "Today",
    description: "// TODO: Add something sweet about where you are right now.",
  },
];

export function Timeline() {
  return (
    <section id="timeline" className="py-24 px-6 md:px-12 w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary mb-4">
          How We Got Here
        </h2>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto" />
      </motion.div>

      <div className="relative">
        {/* Center vertical line (desktop only) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-primary/20 -translate-x-1/2" />

        {/* Mobile left border */}
        <div className="md:hidden absolute left-3 top-0 bottom-0 w-px bg-primary/20" />

        {TIMELINE_EVENTS.map((event, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={event.id}
              className="mb-12 md:mb-20 relative md:flex md:items-center md:justify-between group"
            >
              {/* Center dot (desktop) */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-10 group-hover:bg-primary transition-colors duration-300" />

              {/* Mobile dot */}
              <div className="md:hidden absolute left-[5px] top-6 w-3 h-3 rounded-full bg-background border-2 border-primary z-10" />

              {/* LEFT SLOT — even: card, odd: empty */}
              <div className={`hidden md:block md:w-[46%] ${isEven ? "" : ""}`}>
                {isEven ? (
                  <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <EventCard event={event} align="right" />
                  </motion.div>
                ) : null}
              </div>

              {/* RIGHT SLOT — odd: card, even: empty */}
              <div className="hidden md:block md:w-[46%]">
                {!isEven ? (
                  <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <EventCard event={event} align="left" />
                  </motion.div>
                ) : null}
              </div>

              {/* Mobile card */}
              <motion.div
                className="md:hidden pl-10"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <EventCard event={event} align="left" />
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function EventCard({
  event,
  align,
}: {
  event: (typeof TIMELINE_EVENTS)[0];
  align: "left" | "right";
}) {
  return (
    <div
      className={`bg-card/50 backdrop-blur-sm p-6 lg:p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors shadow-lg ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      <span className="text-secondary text-xs font-medium tracking-widest uppercase mb-2 block">
        {event.date}
      </span>
      <h3 className="text-xl lg:text-2xl font-serif text-foreground mb-3">
        {event.title}
      </h3>
      <p className="text-muted-foreground font-light mb-5 leading-relaxed">
        {event.description}
      </p>
      {/* Image placeholder */}
      <div className="w-full h-44 lg:h-52 rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-muted-foreground/40 bg-black/20 hover:border-primary/20 transition-colors">
        <Camera className="w-8 h-8 mb-2 opacity-50" />
        <span className="text-xs">Add your screenshot here</span>
      </div>
    </div>
  );
}
