import { FavoritesContext } from "../context/FavoritesContext.tsx";
import MovieCard from "../components/MovieCard";
import { useContext } from "react";

export default function Favorites() {
    const favoritesContext = useContext(FavoritesContext);

    if (!favoritesContext) {
        throw new Error("FavoritesContext must be used within a FavoritesProvider");
    }

    const { favorites } = favoritesContext;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {Array.from(favorites.values()).map((movie) => (
                <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    rating={movie.vote_average}
                />
            ))}
        </div>
    );
}
