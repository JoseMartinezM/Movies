import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Movie } from './Home';
import { FavoritesContext } from "../context/FavoritesContext.tsx"; // Importa el contexto, no el provider

const TMDB_API_KEY = '521b418e6b0c0227a624515e80c9288a';
const TMDB_API_URL = 'https://api.themoviedb.org/3/movie';

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie>();
    const favoritesContext = useContext(FavoritesContext);

    if (!favoritesContext) {
        throw new Error("FavoritesContext must be used within a FavoritesProvider");
    }

    const { favorites, setFavorite } = favoritesContext;

    useEffect(() => {
        axios.get(`${TMDB_API_URL}/${id}?api_key=${TMDB_API_KEY}`)
            .then((res) => setMovie(res.data))
            .catch((error) => console.error('Error fetching movie:', error));
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    const favButtonLabel = favorites.has(movie.id) ? "Remove from Favorites" : "Add to Favorites";

    return (
        <div className="p-4">
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="w-64 rounded"
                alt={movie.title}
            />
            <h1 className="text-2xl font-bold">{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>Rating: {movie.vote_average}/10</p>
            <button
                onClick={() => setFavorite(movie)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {favButtonLabel}
            </button>
        </div>
    );
}
