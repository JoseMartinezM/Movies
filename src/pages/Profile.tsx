import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { FavoritesContext } from "../context/FavoritesContext";
import { db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const favoritesContext = useContext(FavoritesContext);
  const favoriteCount = favoritesContext?.favorites.size || 0;
  
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      if (user) {
        setIsLoading(true);
        try {
          const userRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            setUsername(docSnap.data().username || "");
            setBio(docSnap.data().bio || "");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchUserData();
  }, [user]);

  async function handleSave() {
    if (user) {
      setIsSaving(true);
      setSaveSuccess(false);
      try {
        await setDoc(doc(db, "users", user.uid), {
          username: username,
          bio: bio,
          email: user.email,
          updatedAt: new Date().toISOString()
        }, { merge: true });
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } catch (e) {
        console.error("Error updating profile:", e);
        alert((e as Error).message);
      } finally {
        setIsSaving(false);
      }
    }
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 text-gray-200">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-700 rounded w-1/4"></div>
          <div className="h-64 bg-gray-700 rounded"></div>
          <div className="h-10 bg-gray-700 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 text-gray-200">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tu Perfil</h1>
        <p className="text-gray-400">Personaliza tu información y cómo te ven otros usuarios</p>
      </div>

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg p-6 mb-8">
        {/* Avatar y correo electrónico */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl shadow-lg">
            {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1">{user?.email}</h2>
            <p className="text-gray-400 mb-4">Miembro desde enero 2023</p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-blue-900/30 rounded-full px-4 py-1 text-blue-300 text-sm">
                {favoriteCount} películas favoritas
              </div>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="¿Cómo quieres que te llamen?"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
              Biografía
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Comparte algo sobre ti y tus gustos cinematográficos..."
              rows={5}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 resize-none"
            />
          </div>

          {saveSuccess && (
            <div className="bg-green-900/30 border border-green-700 text-green-400 px-4 py-3 rounded-lg">
              ¡Perfil actualizado correctamente!
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg mr-4 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium rounded-lg shadow-lg transition-all duration-200 flex items-center ${
                isSaving ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </>
              ) : (
                "Guardar Cambios"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}