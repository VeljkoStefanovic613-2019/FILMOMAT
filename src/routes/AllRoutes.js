import { Routes, Route } from "react-router-dom";
import { MovieList, MovieDetail, Search, PageNotFound } from  "../pages";
import { TVList } from "../pages/TVList";
import { TVDetail } from "../pages/TVDetail";

export const AllRoutes = () => {
  return (
    <div className="dark:bg-darkbg">
        <Routes>
            <Route path="" element={<MovieList apiPath="movie/now_playing" title="Home" />} />    
            <Route path="movie/:id" element={<MovieDetail />} />    
            <Route path="movies/popular" element={<MovieList apiPath="movie/popular" title="Popular Movies" />} />    
            <Route path="movies/top" element={<MovieList apiPath="movie/top_rated" title="Top Rated Movies" />} />    
            <Route path="movies/upcoming" element={<MovieList apiPath="movie/upcoming" title="Upcoming Movies" />} />    
            
            {/* TV Shows Routes */}
            <Route path="tv" element={<TVList apiPath="tv/airing_today" title="TV Shows Airing Today" />} />    
            <Route path="tv/popular" element={<TVList apiPath="tv/popular" title="Popular TV Shows" />} />    
            <Route path="tv/top" element={<TVList apiPath="tv/top_rated" title="Top Rated TV Shows" />} />    
            <Route path="tv/onair" element={<TVList apiPath="tv/on_the_air" title="Currently Airing" />} />    
            <Route path="tv/:id" element={<TVDetail />} />    
            
            <Route path="search" element={<Search />} />    
            <Route path="*" element={<PageNotFound  />} />    
        </Routes>  
    </div>
  )
}