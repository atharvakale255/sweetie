import { motion } from "framer-motion";

// CUSTOMIZE: Write your actual letter here
const LETTER_CONTENT = `Dear Tanuu,

I wanted to make something special for you. Something that could hold all these little moments and feelings that we've shared.

When we first started talking, I had no idea how important you would become to me. You turned ordinary days into something I look forward to. You listen to me when I'm rambling, you handle my depression and weird humor, and you make the distance between us feel so much smaller.

This page is just a small token to say thank you. Thank you for being you. Thank you for being in my life.

I don't know what the future holds, but I'm really glad that you're in my present.

Yours,
Cutie/Sweetie/Bhondu/Hun`;

export function Letter() {
  return (
    <section id="letter" className="py-32 px-6 md:px-12 relative overflow-hidden">
      {/* Soft glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-card/50 backdrop-blur-md p-8 md:p-14 lg:p-16 rounded-3xl border border-white/5 shadow-2xl relative"
        >
          {/* Corner accents */}
          <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-primary/30 rounded-tl-xl" />
          <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-primary/30 rounded-br-xl" />

          <h2 className="text-center font-serif text-3xl md:text-4xl text-primary mb-10 tracking-wider">
            For You
          </h2>

          <div className="font-serif text-lg md:text-xl lg:text-2xl text-foreground/90 leading-[1.9] whitespace-pre-wrap font-light">
            {LETTER_CONTENT}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
