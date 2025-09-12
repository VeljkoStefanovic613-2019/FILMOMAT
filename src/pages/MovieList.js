import { Card } from "../components";
import { useFetch } from "../hooks/useFetch";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useState } from "react";

export const MovieList = ({ apiPath, title }) => {
  const { data: movies } = useFetch(apiPath);
  const { data: genres } = useFetch("genre/movie/list");
  const [selectedGenre, setSelectedGenre] = useState(null);
  useDocumentTitle(title);

  const excludedGenres = ["Documentary", "History", "TV Movie", "War", "Western"];

  const filteredGenres = genres.filter(
    (genre) => !excludedGenres.includes(genre.name)
  );

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre_ids?.includes(selectedGenre))
    : movies;

  return (
    <main>
      <section className="max-w-7xl mx-auto py-7">
        <div className="flex justify-center md:justify-start mb-4">
          <div className="relative w-full md:w-48">
            <select
              value={selectedGenre || ""}
              onChange={(e) =>
                setSelectedGenre(e.target.value ? Number(e.target.value) : null)
              }
              className="w-full pl-10 pr-8 py-1.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none mx-auto md:mx-0"
            >
              <option value="">All Genres</option>
              {filteredGenres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex justify-start flex-wrap other:justify-evenly">
          {filteredMovies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  );
};
