import { useSearchParams } from "react-router-dom";
import { Card, TVCard } from "../components";
import { useFetch } from "../hooks/useFetch";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useState } from "react";

export const Search = () => {
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("q");

  const { data: movies } = useFetch("search/movie", queryTerm);
  const { data: tvShows } = useFetch("search/tv", queryTerm);

  const [filter, setFilter] = useState("all"); // all | movies | tv

  useDocumentTitle(`Search results for ${queryTerm}`);

  const hasResults = movies.length > 0 || tvShows.length > 0;

  return (
    <main>
      {/* Title + Filter */}
      <section className="py-7 max-w-7xl mx-auto px-4">
        <p className="text-3xl text-gray-700 dark:text-white mb-4">
          {hasResults
            ? `Results for '${queryTerm}'`
            : `No results found for '${queryTerm}'`}
        </p>

        {/* FILTER BUTTONS */}
        {hasResults && (
          <div className="flex gap-3">
            {["all", "movies", "tv"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {type === "all"
                  ? "All"
                  : type === "movies"
                  ? "Movies"
                  : "TV Shows"}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto py-7">
        {/* MOVIES */}
        {(filter === "all" || filter === "movies") && movies.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Movies
            </h2>
            <div className="flex justify-start flex-wrap">
              {movies.map((movie) => (
                <Card key={`movie-${movie.id}`} movie={movie} />
              ))}
            </div>
          </>
        )}

        {/* TV SHOWS */}
        {(filter === "all" || filter === "tv") && tvShows.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-10 mb-4">
              TV Shows
            </h2>
            <div className="flex justify-start flex-wrap">
              {tvShows.map((show) => (
                <TVCard key={`tv-${show.id}`} show={show} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
};
