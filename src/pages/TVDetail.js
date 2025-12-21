import { useState, useEffect, useCallback } from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useParams } from "react-router-dom";
import Backup from "../assets/images/backup.png";
import { fetchStreamingSources } from "../api/api";

export const TVDetail = () => {
  const { id } = useParams();

  const [show, setShow] = useState({});
  const [seasons, setSeasons] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [isTVOpen, setIsTVOpen] = useState(false);
  const [streamingSources, setStreamingSources] = useState([]);
  const [selectedSource, setSelectedSource] = useState(0);
  const [loading, setLoading] = useState(true);

  useDocumentTitle(show.name);

  const image = show.poster_path
    ? `https://image.tmdb.org/t/p/w500/${show.poster_path}`
    : Backup;

  /* ---------------- FETCH EPISODES ---------------- */
  const fetchEpisodes = useCallback(
    async (seasonNumber) => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        const json = await res.json();
        setEpisodes(json.episodes || []);
      } catch (err) {
        console.error("Failed to fetch episodes:", err);
      }
    },
    [id]
  );

  /* ---------------- FETCH TV SHOW ---------------- */
  useEffect(() => {
    async function fetchTV() {
      try {
        setLoading(true);

        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        const json = await res.json();

        setShow(json);
        setSeasons(json.seasons || []);

        if (json.seasons?.length > 0) {
          fetchEpisodes(json.seasons[0].season_number);
        }

        const sources = fetchStreamingSources(json.id, "tv");
        setStreamingSources(sources);
      } catch (err) {
        console.error("Failed to fetch TV show:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTV();
  }, [id, fetchEpisodes]);

  /* ---------------- SEASON CHANGE ---------------- */
  useEffect(() => {
    if (selectedSeason) {
      fetchEpisodes(selectedSeason);
      setSelectedEpisode(1);
    }
  }, [selectedSeason, fetchEpisodes]);

  /* ---------------- MODAL CONTROLS ---------------- */
  const watchTV = () => setIsTVOpen(true);

  const closeTVModal = () => {
    setIsTVOpen(false);
    const tvVideo = document.getElementById("tvVideo");
    if (tvVideo) tvVideo.src = "";
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <main className="text-gray-800 dark:text-white">
        <section className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg">Loading TV show...</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="text-gray-800 dark:text-white">
      <section className="flex justify-around flex-wrap py-5">
        {/* Poster */}
        <div className="max-w-sm">
          <img className="rounded shadow-lg" src={image} alt={show.name} />
        </div>

        {/* Info */}
        <div className="max-w-2xl text-lg px-4">
          <h1 className="text-4xl font-bold my-3 text-center lg:text-left">
            {show.name}
          </h1>

          <p className="my-4 text-gray-600 dark:text-gray-300">
            {show.overview}
          </p>

          {show.genres && (
            <div className="my-6 flex flex-wrap gap-2">
              {show.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <p className="my-2">
            <span className="font-semibold">First Air Date:</span>{" "}
            {show.first_air_date}
          </p>
          <p className="my-2">
            <span className="font-semibold">Seasons:</span>{" "}
            {show.number_of_seasons}
          </p>
          <p className="my-2">
            <span className="font-semibold">Episodes:</span>{" "}
            {show.number_of_episodes}
          </p>

          {/* Episode selection */}
          <div className="mt-6 space-y-4">
            <div className="flex gap-4 flex-col sm:flex-row">
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(Number(e.target.value))}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2"
              >
                {seasons.map((season) => (
                  <option
                    key={season.season_number}
                    value={season.season_number}
                  >
                    Season {season.season_number}
                  </option>
                ))}
              </select>

              <select
                value={selectedEpisode}
                onChange={(e) => setSelectedEpisode(Number(e.target.value))}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2"
              >
                {episodes.map((ep) => (
                  <option key={ep.episode_number} value={ep.episode_number}>
                    Episode {ep.episode_number}: {ep.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={watchTV}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-md transition"
            >
              Watch S{selectedSeason} · E{selectedEpisode}
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- MODAL ---------------- */}
      {isTVOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 backdrop-blur-sm"
          onClick={closeTVModal}
        >
          <div
            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-2xl relative w-11/12 max-w-4xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeTVModal}
              className="absolute top-3 right-4 text-3xl font-bold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
            >
              &times;
            </button>

            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-5 border-b border-gray-200 dark:border-gray-700 pb-4">
              <h2 className="text-2xl font-semibold">
                {show.name} — S{selectedSeason}E{selectedEpisode}
              </h2>

              <select
                className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm"
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

            <div className="aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <iframe
                id="tvVideo"
                className="w-full h-full"
                src={`${streamingSources[selectedSource]?.url}/${selectedSeason}-${selectedEpisode}`}
                frameBorder="0"
                allowFullScreen
                title={`${show.name} S${selectedSeason}E${selectedEpisode}`}
              />
            </div>

            <div className="flex justify-center mt-5">
              <a
                href={`${streamingSources[selectedSource]?.url}/${selectedSeason}-${selectedEpisode}`}
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
