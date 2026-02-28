import Home from "../../pages/home";
import Movies from "../../pages/movies";
import MovieDetail from "../../pages/movie-detail";
import Favorites from "../../pages/favorites";
import About from "../../pages/about";
import type { TRoute } from "./type";

export const routes: TRoute[] = [
  {
    path: "/",
    element: Home,
    id: 1,
  },
  {
    path: "/movies",
    element: Movies,
    id: 2,
  },
  {
    path: "/movie/:id",
    element: MovieDetail,
    id: 3,
  },
  {
    path: "/favorites",
    element: Favorites,
    id: 4,
  },
  {
    path: "/about",
    element: About,
    id: 5,
  },
];