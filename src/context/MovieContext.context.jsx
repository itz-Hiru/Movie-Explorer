import { createContext, useState, useCallback } from "react";
import axios from "axios";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [topCharts, setTopCharts] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTopCharts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular`,
        {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            language: "en-US",
            page: 1,
          },
        }
      );
      setTopCharts(response.data.results);
      setError(null);
    } catch (error) {
      console.error("Error fetching top charts:", error);
      setError(error.message || "Failed to fetch top charts");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllMovies = useCallback(
    async ({
      search = "",
      genre = "",
      year = "",
      rating = "",
      page = 1,
    } = {}) => {
      try {
        setLoading(true);
        const params = {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          language: "en-US",
          page,
          ...(search && { query: search }),
          ...(genre && { with_genres: genre }),
          ...(year && { primary_release_year: year }),
          ...(rating && { "vote_average.gte": rating }),
        };

        const endpoint = search ? "/search/movie" : "/discover/movie";
        const response = await axios.get(
          `https://api.themoviedb.org/3${endpoint}`,
          { params }
        );
        setAllMovies(response.data.results);
        setError(null);
      } catch (error) {
        console.error("Error fetching all movies:", error);
        setError(error.message || "Failed to fetch all movies");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <MovieContext.Provider
      value={{
        topCharts,
        allMovies,
        fetchTopCharts,
        fetchAllMovies,
        loading,
        error,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
