import { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [topCharts, setTopCharts] = useState([]);

  const fetchTopCharts = useCallback(async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          language: 'en-US',
          page: 1,
        },
      });
      setTopCharts(response.data.results);
    } catch (error) {
      console.error('Error fetching top charts:', error);
    }
  }, []);

  return (
    <MovieContext.Provider value={{ topCharts, fetchTopCharts }}>
      {children}
    </MovieContext.Provider>
  );
};