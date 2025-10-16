// src/api/api.js

// 🎬 All available movie streaming sources (main + backups)
export const STREAMING_APIS = [
  {
    name: "Original VidSrc (Default)",
    url: (id, type = "movie") => `https://vidsrc.in/embed/${type}/${id}`, // your original link
  },
  {
    name: "VidSrc XYZ",
    url: (id, type = "movie") => `https://vidsrc.xyz/embed/${type}/${id}`,
  },
  {
    name: "VidSrc TO",
    url: (id, type = "movie") => `https://vidsrc.to/embed/${type}/${id}`,
  },
  {
    name: "2Embed",
    url: (id, type = "movie") => `https://www.2embed.cc/embed/${id}`,
  },
  {
    name: "SuperEmbed",
    url: (id, type = "movie") => `https://multiembed.mov/?video_id=${id}&tmdb=1`,
  },
];

// 🔧 Helper to generate full streaming source list for a movie or show
export const fetchStreamingSources = (id, type = "movie") => {
  if (!id) return [];

  return STREAMING_APIS.map(api => ({
    name: api.name,
    url: api.url(id, type),
    type: "embed",
    quality: "HD",
  }));
};
