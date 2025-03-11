import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { Movie } from './Home';

const TMDB_API_KEY = "521b418e6b0c0227a624515e80c9288a";
const TMDB_API_URL = "https://api.themoviedb.org/3/search/movie";

export default function Search() {
    const location = useLocation();
    const navigate = useNavigate();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    
    // Obtener el query de la URL
    const query = new URLSearchParams(location.search).get("q") || "";
    
    // Al cargar, establecer el texto de búsqueda desde la URL
    useEffect(() => {
        if (query) {
            setSearchText(query);
            searchMovies(query);
        }
    }, [query]);
    
    // Función para buscar películas
    const searchMovies = async (searchQuery: string) => {
        if (!searchQuery.trim()) return;
        
        setIsLoading(true);
        setNoResults(false);
        
        try {
            const response = await axios.get(
                `${TMDB_API_URL}?api_key=${TMDB_API_KEY}&query=${searchQuery}&language=es-ES`
            );
            
            const results = response.data.results;
            setMovies(results);
            setNoResults(results.length === 0);
        } catch (error) {
            console.error("Error buscando películas:", error);
            setMovies([]);
            setNoResults(true);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchText.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchText.trim())}`);
        }
    };

    return (
        <div className="w-full p-4 md:p-6 text-gray-200">
            {/* Encabezado de búsqueda */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-6">Buscar Películas</h1>
                
                {/* Formulario de búsqueda */}
                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder="Buscar películas..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="w-full px-6 py-5 rounded-lg bg-gray-800 border-2 border-blue-600 focus:border-blue-400 text-white text-lg placeholder-gray-400 focus:outline-none transition duration-200"
                            />
                            {searchText && (
                                <button
                                    type="button"
                                    onClick={() => setSearchText("")}
                                    className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold rounded-lg shadow-lg transition duration-200 transform hover:-translate-y-1"
                        >
                            Buscar
                        </button>
                    </div>
                </form>
                
                {/* Estados de búsqueda */}
                {isLoading && (
                    <div className="text-center py-8">
                        <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-lg">Buscando películas...</p>
                    </div>
                )}
                
                {noResults && !isLoading && (
                    <div className="text-center py-8">
                        <p className="text-xl mb-2">No se encontraron resultados para "{query}"</p>
                        <p className="text-gray-400">Intenta con otro término de búsqueda</p>
                    </div>
                )}
                
                {/* Si hay un query y resultados, mostrar mensaje */}
                {query && movies.length > 0 && !isLoading && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold">
                            Resultados para "{query}" ({movies.length})
                        </h2>
                    </div>
                )}
            </div>
            
            {/* Grid de películas */}
            {movies.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            poster={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder-movie.png'}
                            rating={movie.vote_average}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}