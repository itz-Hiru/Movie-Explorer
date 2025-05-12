import { getAuth } from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaArrowUpRightFromSquare, FaHeart } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { db } from "../../utils/firebase";

const MovieDetail = () => {
  const location = useLocation();
  const [movie, setMovie] = useState(location.state?.movie || {});
  const [isFavorite, setIsFavorite] = useState(false);
  const [trailerId, setTrailerId] = useState("");

  const handleAddToFavorites = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      toast.error("You must be logged in to add to favorites.");
      return;
    }

    if (!movie.id) {
      toast.error("Movie data is missing.");
      return;
    }

    try {
      const movieDocRef = doc(
        db,
        `favorites/${user.uid}/movies`,
        movie.id.toString()
      );
      if (isFavorite) {
        await deleteDoc(movieDocRef);
        toast.success(`${movie.title} removed from favorites!`);
        setIsFavorite(false);
      } else {
        await setDoc(movieDocRef, movie);
        toast.success(`${movie.title} added to favorites!`);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
      toast.error(
        isFavorite
          ? "Failed to remove from favorites."
          : "Failed to add to favorites."
      );
    }
  };

  useEffect(() => {
    const checkIfFavorite = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user && movie.id) {
        const movieDocRef = doc(
          db,
          `favorites/${user.uid}/movies`,
          movie.id.toString()
        );
        const docSnapshot = await getDoc(movieDocRef);
        if (docSnapshot.exists()) {
          setIsFavorite(true);
        }
      }
    };

    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }&language=en-US`
        );
        const data = await response.json();
        const trailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) setTrailerId(trailer.key);
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    if (movie.id) fetchTrailer();
    checkIfFavorite();

    if (!movie.id) {
      toast.error("Movie data not found.");
    }
  }, [movie]);

  return (
    <div className="min-h-screen bg-bg-black px-5 md:px-0 py-10 md:py-0">
      {movie.id ? (
        <>
          <div
            className="hidden md:block relative w-full h-[400px] bg-cover bg-center rounded-lg -mb-48"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${
                movie.backdrop_path || movie.poster_path
              })`,
            }}
          >
            <div className="absolute inset-0 h-[400px] bg-[#000000CC] z-10 hidden md:block"></div>
          </div>
          <div className="container mx-auto flex flex-col md:flex-row gap-5 md:gap-8 overflow-hidden z-20 relative pb-0 md:pb-5">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-[500px] md:h-[auto] md:w-[400px] rounded-xl shadow-md shadow-white/10"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h1 className="text-[#FFFFFF] text-3xl md:text-4xl lg:text-6xl font-semibold font-montserrat">
                  {movie.title}
                </h1>
                <button
                  onClick={handleAddToFavorites}
                  className="text-4xl text-[#FFFFFF] cursor-pointer transition-colors duration-500"
                >
                  {isFavorite ? (
                    <FaHeart className="text-primary" />
                  ) : (
                    <FaHeart className="" />
                  )}
                </button>
              </div>
              <p className="text-[#FEFEFECC] font-medium md:text-lg mb-4">
                {movie.overview}
              </p>
              <div className="flex justify-between mb-5">
                <p className="text-amber-400">
                  Rating: {movie.vote_average} / 10
                </p>
                <p className="text-[#FEFEFECC]">
                  Released: {new Date(movie.release_date).getFullYear()}
                </p>
              </div>
              <a
                href={`https://www.youtube.com/results?search_query=${movie.title} trailer`}
                target="_blank"
                rel="noopener noreferrer"
                className="md:hidden flex gap-2 items-center text-primary hover:text-accent underline cursor-pointer transition-colors duration-500"
              >
                Watch Trailer
                <FaArrowUpRightFromSquare />
              </a>
              {trailerId && (
                <iframe
                  src={`https://www.youtube.com/embed/${trailerId}`}
                  allowFullScreen
                  className="hidden md:block w-full h-64 md:h-96 rounded-lg shadow-md shadow-white/10"
                  title="Trailer"
                ></iframe>
              )}
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-red-600">Movie data not found.</p>
      )}
    </div>
  );
};

export default MovieDetail;
