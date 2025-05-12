import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { aboutCards } from "../utils/data";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query, matches]);

  return matches;
};

const About = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const isMediumOrLarger = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (!isMediumOrLarger) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isMediumOrLarger]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[95vh] w-full py-15 px-5 md:px-0 flex flex-col justify-center items-center"
      id="about"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 justify-center items-center mb-18">
        <motion.h2
          className="text-white text-4xl md:text-5xl lg:text-6xl text-center lg:text-start font-bold"
          initial={isMediumOrLarger ? { opacity: 0, x: -100 } : {}}
          animate={isMediumOrLarger && inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Best Features That Won't{" "}
          <span className="text-primary">Disappoint</span>
        </motion.h2>

        <motion.p
          className="hidden lg:block text-white/80 text-sm md:text-lg text-center md:text-start"
          initial={isMediumOrLarger ? { opacity: 0, x: 100 } : {}}
          animate={isMediumOrLarger && inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Crafted for true movie lovers – explore, discover, and dive deep into
          your next cinematic adventure.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {aboutCards.map((card, index) => (
          <motion.div
            key={index}
            className="bg-card p-5 flex flex-col md:flex-row gap-4 rounded-lg shadow-md shadow-white/10 hover:shadow-sm hover:shadow-accent transition-shadow duration-300"
            initial={isMediumOrLarger ? { opacity: 0, x: card.initialX } : {}}
            animate={isMediumOrLarger && inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: card.delay }}
          >
            {card.icon}
            <div className="flex flex-col gap-5">
              <h4 className="text-white text-xl font-semibold">{card.title}</h4>
              <p className="text-white/85">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
