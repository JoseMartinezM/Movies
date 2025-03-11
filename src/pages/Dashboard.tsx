import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FavoritesContext } from "../context/FavoritesContext";
import { Link } from "react-router-dom";

// Componente de tarjeta de estadísticas
const StatsCard = ({ title, value, icon }: { title: string; value: string | number; icon: string }) => (
  <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-lg shadow-lg p-6 flex items-center text-white">
    <div className="text-5xl mr-6">{icon}</div>
    <div>
      <h3 className="text-blue-100 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </div>
);

// Componente de perfil de usuario
const UserProfile = ({ email }: { email: string | null | undefined }) => (
  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg p-6 text-white">
    <div className="flex items-center mb-6">
      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl mr-5 shadow-md">
        {email ? email.charAt(0).toUpperCase() : "U"}
      </div>
      <div>
        <h2 className="text-xl font-bold mb-1">{email || "Usuario"}</h2>
        <p className="text-gray-300">Miembro desde enero 2023</p>
      </div>
    </div>
    <Link to="/profile" className="inline-block px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-center font-medium shadow-md">
      Editar perfil
    </Link>
  </div>
);

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const favoritesContext = useContext(FavoritesContext);
  
  const favoriteCount = favoritesContext?.favorites.size || 0;
  
  return (
    <div className="w-full p-6 text-gray-200">
      <h1 className="text-3xl font-bold mb-8">Panel de Control</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Perfil de usuario (1/3 ancho en desktop) */}
        <div className="lg:col-span-2">
          <UserProfile email={user?.email} />
        </div>
        
        {/* Tarjeta de favoritos (2/3 ancho en desktop) */}
        <div>
          <StatsCard title="Películas Favoritas" value={favoriteCount} icon="⭐" />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6 text-white">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link to="/search" className="bg-gradient-to-br from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 p-5 rounded-lg text-center shadow-md transition-all duration-200 transform hover:-translate-y-1 text-white">
            <div className="text-3xl mb-3">🔍</div>
            <div className="font-semibold">Buscar Películas</div>
          </Link>
          <Link to="/favorites" className="bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 p-5 rounded-lg text-center shadow-md transition-all duration-200 transform hover:-translate-y-1 text-white">
            <div className="text-3xl mb-3">⭐</div>
            <div className="font-semibold">Mis Favoritos</div>
          </Link>
          <Link to="/" className="bg-gradient-to-br from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 p-5 rounded-lg text-center shadow-md transition-all duration-200 transform hover:-translate-y-1 text-white">
            <div className="text-3xl mb-3">🎬</div>
            <div className="font-semibold">Novedades</div>
          </Link>
        </div>
      </div>
    </div>
  );
}