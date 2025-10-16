import { useState, useEffect } from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useParams } from "react-router-dom"; 
import Backup from "../assets/images/backup.png";
import { fetchStreamingSources } from "../api/api";

export const MovieDetail = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [isMovieOpen, setIsMovieOpen] = useState(false);
  const [streamingSources, setStreamingSources] = useState([]);
  const [selectedSource, setSelectedSource] = useState(0);

  useDocumentTitle(movie.title);

  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : Backup;

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${params.id}?api_key=03ef7baef561f013e8bcbae1584f3fa5`
        );
        const json = await response.json();
        setMovie(json);

        // Prepare streaming links when movie is fetched
        const sources = fetchStreamingSources(json.id, "movie");
        setStreamingSources(sources);
      } catch (error) {
        console.error("Failed to fetch movie:", error);
      }
    }
    fetchMovie();
  }, [params.id]);

  // Open movie modal
  const watchMovie = () => {
    setIsMovieOpen(true);
  };

  // Close movie modal
  const closeMovieModal = () => {
    setIsMovieOpen(false);
    const movieVideo = document.getElementById("movieVideo");
    if (movieVideo) movieVideo.src = ""; // stop video
  };

  // Get currently selected movie URL
  const movieUrl =
    streamingSources[selectedSource]?.url ||
    `https://vidsrc.in/embed/movie/${movie.id}`;

  return (
    <main className="text-gray-800 dark:text-white">
      <section className="flex justify-around flex-wrap py-5">
        {/* Poster */}
        <div className="max-w-sm">
          <img className="rounded shadow-lg" src={image} alt={movie.title} />
        </div>

        {/* Movie Info */}
        <div className="max-w-2xl text-lg px-4">
          <h1 className="text-4xl font-bold my-3 text-center lg:text-left">
            {movie.title}
          </h1>
          <p className="my-4">{movie.overview}</p>

          {movie.genres && (
            <p className="my-7 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </p>
          )}

          <div className="flex items-center mb-2">
            <svg
              className="w-5 h-5 text-yellow-400 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="ml-2">{movie.vote_average}</p>
            <span className="w-1 h-1 mx-2 bg-gray-400 rounded-full"></span>
            <span>{movie.vote_count} reviews</span>
          </div>

          <p className="my-2">
            <span className="font-semibold">Runtime:</span> {movie.runtime} min
          </p>
          <p className="my-2">
            <span className="font-semibold">Budget:</span> ${movie.budget}
          </p>
          <p className="my-2">
            <span className="font-semibold">Revenue:</span> ${movie.revenue}
          </p>
          <p className="my-2">
            <span className="font-semibold">Release Date:</span>{" "}
            {movie.release_date}
          </p>
          <p className="my-2">
            <span className="font-semibold">IMDB:</span>{" "}
            <a
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline"
            >
              {movie.imdb_id}
            </a>
          </p>

          {/* Watch Movie Button */}
          <button
            onClick={watchMovie}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
          >
            Watch Movie
          </button>
        </div>
      </section>

      {/* --- MODAL --- */}
      {isMovieOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 backdrop-blur-sm"
          onClick={closeMovieModal}
        >
          <div
            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-2xl relative w-11/12 max-w-4xl shadow-2xl transition-colors duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeMovieModal}
              className="absolute top-3 right-4 text-3xl font-bold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
            >
              &times;
            </button>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-5 border-b border-gray-200 dark:border-gray-700 pb-4">
              <h2 className="text-2xl font-semibold">
                {movie.title || "Movie Player"}
              </h2>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="sourceSelect"
                  className="text-gray-700 dark:text-gray-300 text-sm whitespace-nowrap"
                >
                  Source:
                </label>
                <select
                  id="sourceSelect"
                  className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 dark:text-white"
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(Number(e.target.value))}
                >
                  {streamingSources.map((src, index) => (
                    <option key={src.name} value={index}>
                      {src.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Video Player */}
            <div className="aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <iframe
                id="movieVideo"
                className="w-full h-full"
                src={movieUrl}
                frameBorder="0"
                allowFullScreen
                title="Movie Player"
              ></iframe>
            </div>

            {/* Fullscreen Link */}
            <div className="flex justify-center mt-5">
              <a
                href={movieUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-lg text-sm font-medium"
              >
                Watch in Fullscreen
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
