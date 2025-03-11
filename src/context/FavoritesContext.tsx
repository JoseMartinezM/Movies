import { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { Movie } from '../pages/Home';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { AuthContext } from "./AuthContext.tsx";

interface ContextProps {
    favorites: Map<number, Movie>;
    setFavorite: (movie: Movie) => void;
}

export const FavoritesContext = createContext<ContextProps | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState(new Map<number, Movie>());
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            loadFavorites(user.uid);
        }
    }, [user]);

    async function loadFavorites(userId: string) {
        const userRef = doc(db, "users", userId);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            const favoritesObject = docSnap.data()?.favorites || {};
            setFavorites(new Map<number, Movie>(Object.entries(favoritesObject).map(([id, movie]) => [Number(id), movie as Movie])));
        }
    }

    async function saveFavorites(userId: string, updatedFavorites: Map<number, Movie>) {
        const favoritesObject = Object.fromEntries(updatedFavorites);
        const userRef = doc(db, "users", userId);
        try {
            await setDoc(userRef, { favorites: favoritesObject }, { merge: true });
        } catch (error) {
            console.error("Error saving favorites:", error);
        }
    }

    function setFavorite(movie: Movie) {
        if (!user) return;
        setFavorites(prevState => {
            const newFavorites = new Map(prevState);
            if (newFavorites.has(movie.id)) {
                newFavorites.delete(movie.id);
            } else {
                newFavorites.set(movie.id, movie);
            }
            saveFavorites(user.uid, newFavorites);
            return newFavorites;
        });
    }

    return (
        <FavoritesContext.Provider value={{ favorites, setFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}