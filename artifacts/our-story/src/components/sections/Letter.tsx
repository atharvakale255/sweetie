import { motion } from "framer-motion";

// CUSTOMIZE: Write your actual letter here
const LETTER_CONTENT = `Dear [Name],

I wanted to make something special for you. Something that could hold all these little moments and feelings that we've shared. 

When we first started talking, I had no idea how important you would become to me. You turned ordinary days into something I look forward to. You listen to me when I'm rambling, you stay up with me when neither of us can sleep, and you make the distance between us feel so much smaller.

This page is just a small token to say thank you. Thank you for being you. Thank you for being in my life.

I don't know what the future holds, but I'm really glad you're in my present.

Yours,
[Your Name]`;

export function Letter() {
  return (
    <section id="letter" className="py-32 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 pointer-events-none rounded-full blur-[120px] max-w-lg mx-auto opacity-50"></div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-card/50 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl relative"
        >
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-lg"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-lg"></div>
          
          <h2 className="text-center font-serif text-2xl md:text-3xl text-primary mb-8 tracking-wider">For You</h2>
          
          <div className="font-serif text-lg md:text-xl text-foreground/90 leading-relaxed whitespace-pre-wrap font-light">
            {LETTER_CONTENT}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
