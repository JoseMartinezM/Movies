import { createContext, useState, ReactNode } from "react";
import { Movie } from '../pages/Home';

interface ContextProps {
    favorites: Map<number, Movie>;
    setFavorite: (movie: Movie) => void;
}

export const FavoritesContext = createContext<ContextProps | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState(new Map<number, Movie>());

    function setFavorite(movie: Movie) {
        setFavorites(prevState => {
            const newFavorites = new Map(prevState);
            if (!newFavorites.has(movie.id)) {
                newFavorites.set(movie.id, movie);
            } else {
                newFavorites.delete(movie.id);
            }
            return newFavorites;
        });
    }

    return (
        <FavoritesContext.Provider value={{ favorites, setFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}
