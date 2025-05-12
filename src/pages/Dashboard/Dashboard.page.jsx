import React, { useEffect, useState, useContext } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout.component";
import { MovieContext } from "../../context/MovieContext.context";
import Input from "../../components/Inputs/Input.component";
import Select from "../../components/Inputs/Select.component";

const Dashboard = () => {
  const { topCharts, fetchTopCharts } = useContext(MovieContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  useEffect(() => {
    fetchTopCharts();
  }, [fetchTopCharts]);

  useEffect(() => {
    let filtered = topCharts;
    if (searchTerm) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedYear) {
      filtered = filtered.filter(
        (movie) =>
          new Date(movie.release_date).getFullYear().toString() === selectedYear
      );
    }
    if (selectedGenre) {
      filtered = filtered.filter((movie) =>
        movie.genre_ids.includes(parseInt(selectedGenre))
      );
    }
    if (selectedRating) {
      filtered = filtered.filter(
        (movie) => movie.vote_average >= parseFloat(selectedRating)
      );
    }
    setFilteredMovies(filtered);
  }, [topCharts, searchTerm, selectedYear, selectedGenre, selectedRating]);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="px-0 md:px-5 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-5">
          <Input
            placeholder="Search movie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="grid grid-cols-3 gap-4">
            <Select
              value={selectedYear}
              onChange={(year) => setSelectedYear(year)}
              placeholder="All Years"
              options={[
                { value: "", label: "All Years" },
                ...Array.from(
                  new Set(
                    topCharts.map((movie) =>
                      new Date(movie.release_date).getFullYear()
                    )
                  )
                )
                  .sort()
                  .map((year) => ({
                    value: year.toString(),
                    label: year.toString(),
                  })),
              ]}
            />
            <Select
              value={selectedGenre}
              onChange={(genre) => setSelectedGenre(genre)}
              placeholder="All Genres"
              options={[
                { value: "", label: "All Genres" },
                { value: "28", label: "Action" },
                { value: "35", label: "Comedy" },
                { value: "18", label: "Drama" },
              ]}
            />
            <Select
              value={selectedRating}
              onChange={(rating) => setSelectedRating(rating)}
              placeholder="All Ratings"
              options={[
                { value: "", label: "All Ratings" },
                ...Array.from({ length: 10 }, (_, i) => ({
                  value: (i + 1).toString(),
                  label: `${i + 1}+`,
                })),
              ]}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="group bg-[#1C1C1C] text-white p-4 rounded-lg shadow-md shadow-white/10 border border-transparent hover:shadow-accent/10 hover:border-primary cursor-pointer"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded-lg transition-transform duration-500 transform group-hover:scale-105 mb-4"
              />
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-amber-400">Rating: {movie.vote_average}</p>
              <p className="text-white/80">
                Release Year: {new Date(movie.release_date).getFullYear()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
