import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../context/MovieContext.context";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

const TopCharts = ({ onClick }) => {
  const { topCharts, fetchTopCharts } = useContext(MovieContext);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const isMediumOrLarger = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();

  useEffect(() => {
    const loadTopCharts = async () => {
      try {
        await fetchTopCharts();
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top charts:", error);
        setLoading(false);
      }
    };
    loadTopCharts();
  }, [fetchTopCharts]);

  const handleCardClick = (movie) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      toast.error("Please login first to view more");
      return;
    }

    const path = `/film/${movie.title.replace(/\s+/g, "-").toLowerCase()}`;
    navigate(path, { state: { movie } });
  };

  useEffect(() => {
    if (!isMediumOrLarger || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current;
    observer.observe(currentRef);

    return () => observer.unobserve(currentRef);
  }, [isMediumOrLarger]);

  if (loading) {
    return <p className="text-white text-center">Loading top charts...</p>;
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[95vh] w-full py-25 px-5 md:px-0 flex flex-col justify-center items-center"
      id="top-charts"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-10 w-full">
        <motion.h2
          className="text-white text-4xl md:text-5xl lg:text-6xl text-center md:text-start font-bold"
          initial={isMediumOrLarger ? { opacity: 0, x: -100 } : {}}
          animate={isMediumOrLarger && inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Movies You Just Can't <span className="text-primary">Missed</span>
        </motion.h2>
        <div className="flex justify-center md:justify-end">
          <motion.button
            type="button"
            className="flex items-center gap-2 bg-transparent text-white hover:text-accent rounded-md group transition-all duration-300 cursor-pointer"
            onClick={onClick}
            initial={isMediumOrLarger ? { opacity: 0, x: 90 } : {}}
            animate={isMediumOrLarger && inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            See More
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {topCharts.slice(0, 8).map((movie) => (
          <motion.div
            key={movie.id}
            onClick={() => handleCardClick(movie)}
            className="bg-card p-5 flex flex-col rounded-lg shadow-md shadow-white/10 hover:shadow-sm hover:shadow-accent transition-shadow duration-300 cursor-pointer group"
            initial={isMediumOrLarger ? { opacity: 0, y: 20 } : {}}
            animate={isMediumOrLarger && inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-lg mb-5">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto transition-transform duration-500 transform group-hover:scale-105"
              />
            </div>
            <div className="flex flex-row justify-between gap-5 items-center mb-2">
              <h3 className="text-white font-semibold">{movie.title}</h3>
              <p className="text-amber-400">{movie.vote_average}</p>
            </div>
            <p className="text-white/85 text-sm">
              {new Date(movie.release_date).getFullYear()}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopCharts;
