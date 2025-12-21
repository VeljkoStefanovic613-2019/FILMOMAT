// src/api/api.js

// 🎬 All available movie/TV streaming sources (main + backups)
export const STREAMING_APIS = [
  {
    name: "VidSrc (Primary)",
    url: (id, type = "movie", season = null, episode = null) => {
      if (type === "tv" && season && episode) {
        return `https://vidsrc-embed.ru/embed/tv/${id}/${season}-${episode}`;
      }
      return `https://vidsrc-embed.ru/embed/${type}/${id}`;
    },
  },
  {
    name: "VidSrc XYZ",
    url: (id, type = "movie", season = null, episode = null) => {
      if (type === "tv" && season && episode) {
        return `https://vidsrc.xyz/embed/tv/${id}/${season}-${episode}`;
      }
      return `https://vidsrc.xyz/embed/${type}/${id}`;
    },
  },
  {
    name: "VidSrc TO",
    url: (id, type = "movie", season = null, episode = null) => {
      if (type === "tv" && season && episode) {
        return `https://vidsrc.to/embed/tv/${id}/${season}-${episode}`;
      }
      return `https://vidsrc.to/embed/${type}/${id}`;
    },
  },
  {
    name: "2Embed",
    url: (id, type = "movie", season = null, episode = null) => {
      if (type === "tv" && season && episode) {
        return `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`;
      }
      return `https://www.2embed.cc/embed/${id}`;
    },
  },
  {
    name: "SuperEmbed",
    url: (id, type = "movie", season = null, episode = null) => {
      if (type === "tv" && season && episode) {
        return `https://multiembed.mov/?video_id=${id}&s=${season}&e=${episode}&tmdb=1`;
      }
      return `https://multiembed.mov/?video_id=${id}&tmdb=1`;
    },
  },
];

// 🔧 Helper to generate full streaming source list for a movie or show
export const fetchStreamingSources = (id, type = "movie", season = null, episode = null) => {
  if (!id) return [];

  return STREAMING_APIS.map(api => ({
    name: api.name,
    url: api.url(id, type, season, episode),
    type: "embed",
    quality: "HD",
  }));
};