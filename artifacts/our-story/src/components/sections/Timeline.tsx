import { motion } from "framer-motion";
import { Camera } from "lucide-react";

// CUSTOMIZE: Add your actual timeline events here
const TIMELINE_EVENTS = [
  {
    id: 1,
    date: "Month Year",
    title: "The First Message",
    description: "// TODO: Add your memory here about how you first talked.",
    // imageSrc: "/path/to/image.jpg" // Uncomment and use real paths
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
    <section id="timeline" className="py-24 px-4 md:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-serif text-primary mb-4">How We Got Here</h2>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto"></div>
      </motion.div>

      <div className="relative border-l border-primary/20 md:border-none">
        {/* Center line for desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-primary/20 transform -translate-x-1/2"></div>

        {TIMELINE_EVENTS.map((event, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={event.id} className="mb-12 md:mb-24 relative flex items-center justify-between md:justify-normal w-full group">
              {/* Center Dot */}
              <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-10 group-hover:bg-primary transition-colors duration-300"></div>
              
              {/* Mobile Line connection (left) */}
              <div className="md:hidden absolute left-[-4px] top-6 w-3 h-3 rounded-full bg-background border-2 border-primary z-10"></div>

              {/* Desktop Empty Space (alternating) */}
              <div className={`hidden md:block w-[45%] ${isEven ? 'order-1' : 'order-2'}`}></div>

              {/* Card */}
              <motion.div 
                initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`w-full md:w-[45%] pl-8 md:pl-0 ${isEven ? 'md:pr-8 md:text-right md:order-1' : 'md:pl-8 md:text-left md:order-2'}`}
              >
                <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-colors shadow-lg">
                  <span className="text-secondary text-sm font-medium tracking-wider uppercase mb-2 block">{event.date}</span>
                  <h3 className="text-xl md:text-2xl font-serif text-foreground mb-3">{event.title}</h3>
                  <p className="text-muted-foreground font-light mb-4">{event.description}</p>
                  
                  {/* Image Placeholder */}
                  <div className="w-full h-40 rounded-lg border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-muted-foreground/50 bg-black/20 group-hover:border-primary/20 transition-colors">
                    <Camera className="w-8 h-8 mb-2 opacity-50" />
                    <span className="text-xs">Add your screenshot here</span>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
