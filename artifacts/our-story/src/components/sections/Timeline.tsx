import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import firstTalkImg from "@assets/1st_talk_on_discord_1781349073697.PNG";
import firstVcImg from "@assets/1st_vc_1781349073696.PNG";
import whenIRealisedImg from "@assets/when_i_realised_1781349073696.PNG";
import firstGameImg from "@assets/our_first_game_1781349073696.PNG";
import rightNowImg from "@assets/already_couples_1781349045574.PNG";

// CUSTOMIZE: Edit dates, titles, and descriptions here
const TIMELINE_EVENTS = [
  {
    id: 1,
    date: "08 Feb 2026",
    title: "The First Message",
    description: "It started with me making a bad joke..and somehow that was enough to break the ice forever.",
    imageSrc: firstTalkImg,
  },
  {
    id: 2,
    date: "26 May 2026",
    title: "The First VC",
    description: "One hour. Just one hour.. but it felt like we'd known each other for years.",
    imageSrc: firstVcImg,
  },
  {
    id: 3,
    date: "26–29 May 2026",
    title: "When I Realized",
    description: "Every morning started with 'Hello cutie' and every night ended with you checking in. That's when I knew.",
    imageSrc: whenIRealisedImg,
  },
  {
    id: 4,
    date: "08 Jun 2026",
    title: "Our First Game Together",
    description: "\"Boring to play alone\" — and just like that, we had our first shared adventure.",
    imageSrc: firstGameImg,
  },
  {
    id: 5,
    date: "Today",
    title: "Right Now",
    description: "we were couples before we knew it",
    imageSrc: rightNowImg,
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
              <div className="hidden md:block md:w-[46%]">
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

      {/* Image */}
      {event.imageSrc ? (
        <div className="w-full rounded-xl overflow-hidden border border-white/5">
          <img
            src={event.imageSrc}
            alt={event.title}
            className="w-full h-auto object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-44 lg:h-52 rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-muted-foreground/40 bg-black/20 hover:border-primary/20 transition-colors">
          <Camera className="w-8 h-8 mb-2 opacity-50" />
          <span className="text-xs">Add your screenshot here</span>
        </div>
      )}
    </div>
  );
}
