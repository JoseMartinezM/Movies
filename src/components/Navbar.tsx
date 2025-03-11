import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FavoritesContext } from "../context/FavoritesContext";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const favoritesContext = useContext(FavoritesContext);
  const location = useLocation();
  
  // Obtener el contador de favoritos
  const favoriteCount = favoritesContext?.favorites.size || 0;

  // Verificar si una ruta está activa
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Estilo para los enlaces activos
  const activeLinkClass = "text-blue-400 border-b-2 border-blue-400";
  
  // Estilo base para los enlaces
  const baseLinkClass = "px-4 py-2 font-medium hover:text-blue-400 transition-colors duration-200";

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y enlaces principales */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
                JoseMovies
              </span>
            </Link>
            
            {/* Enlaces de navegación - Desktop */}
            <div className="hidden md:ml-10 md:flex md:space-x-4">
              <Link 
                to="/" 
                className={`${baseLinkClass} ${isActive('/') ? activeLinkClass : ''}`}
              >
                Inicio
              </Link>
              <Link 
                to="/search" 
                className={`${baseLinkClass} ${isActive('/search') ? activeLinkClass : ''}`}
              >
                Buscar
              </Link>
              <Link 
                to="/favorites" 
                className={`${baseLinkClass} ${isActive('/favorites') ? activeLinkClass : ''}`}
              >
                Favoritos 
                <span className="ml-1 px-2 py-0.5 bg-blue-600 text-xs rounded-full">
                  {favoriteCount}
                </span>
              </Link>
            </div>
          </div>

          {/* Sección de usuario */}
          <div className="flex items-center">
            {user ? (
              <div className="hidden md:flex items-center">
                <Link 
                  to="/dashboard" 
                  className={`${baseLinkClass} ${isActive('/dashboard') ? activeLinkClass : ''}`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className={`${baseLinkClass} ${isActive('/profile') ? activeLinkClass : ''}`}
                >
                  Perfil
                </Link>
                <div className="mx-2 h-4 w-px bg-gray-600"></div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                  </div>
                  <button 
                    onClick={logout}
                    className="ml-4 px-4 py-1.5 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="px-4 py-1.5 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-colors duration-200"
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg transition-colors duration-200"
                >
                  Registrarse
                </Link>
              </div>
            )}

            {/* Botón de menú móvil */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg pb-3 pt-2">
          <div className="px-2 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/search"
              className="block px-3 py-2 rounded-md hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Buscar
            </Link>
            <Link
              to="/favorites"
              className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Favoritos</span>
              <span className="px-2 py-0.5 bg-blue-600 text-xs rounded-full">
                {favoriteCount}
              </span>
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md hover:bg-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md hover:bg-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Perfil
                </Link>
                <div className="border-t border-gray-700 my-2"></div>
                <div className="px-3 py-2 flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                    {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="text-sm text-gray-300 truncate max-w-[150px]">
                    {user.email || "Usuario"}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full mt-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-gray-700 my-2"></div>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-center bg-transparent border border-blue-500 text-blue-500 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/signup"
                  className="block mt-2 px-3 py-2 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}