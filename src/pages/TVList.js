import { TVCard } from "../components/TVCard";
import { useFetch } from "../hooks/useFetch";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useState } from "react";

export const TVList = ({ apiPath, title }) => {
  const { data: tvShows } = useFetch(apiPath);
  const { data: genres } = useFetch("genre/tv/list");
  const [selectedGenre, setSelectedGenre] = useState(null);

  useDocumentTitle(title);

  const excludedGenres = ["Documentary", "Talk", "News", "War", "Western"];

  const filteredGenres = genres.filter(
    (genre) => !excludedGenres.includes(genre.name)
  );

  const filteredTVShows = selectedGenre
    ? tvShows.filter((show) => show.genre_ids?.includes(selectedGenre))
    : tvShows;

  return (
    <main>
      <section className="max-w-7xl mx-auto py-7">
        {/* Genre filter – SAME as MovieList */}
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
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* TV cards grid */}
        <div className="flex justify-start flex-wrap other:justify-evenly">
          {filteredTVShows.map((show) => (
            <TVCard key={show.id} show={show} />
          ))}
        </div>
      </section>
    </main>
  );
};
 