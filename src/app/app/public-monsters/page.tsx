import { getPublicMonsters } from "@/actions/monsters.actions";
import { PublicMonsterCard } from "@/components/public-monsters";

/**
 * Page serveur affichant tous les monstres publics
 *
 * Cette page server-side récupère tous les monstres marqués comme publics
 * et les affiche dans une grille responsive avec leurs backgrounds et accessoires.
 *
 * Responsabilité unique : récupérer les monstres publics et orchestrer leur affichage.
 *
 * La protection de la route est gérée par le layout parent (src/app/app/layout.tsx).
 *
 * @async
 * @returns {Promise<React.ReactNode>} Page avec grille de monstres publics
 *
 * @example
 * // Accès direct à la route
 * // GET /app/public-monsters
 */
export default async function PublicMonstersPage(): Promise<React.ReactNode> {
  // Récupération des monstres publics depuis la base de données
  const monsters = await getPublicMonsters();

  return (
    <div className="min-h-screen bg-gray-100 py-8 relative overflow-hidden">
      {/* Bulles décoratives animées */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-blue-300/30 to-purple-400/30 blur-3xl animate-pulse" />
        <div
          className="absolute -left-32 bottom-20 h-96 w-96 rounded-full bg-gradient-to-br from-pink-300/30 to-orange-400/30 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        {/* En-tête de la page */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            🌍 Monstres Publics
          </h1>
          <p className="text-xl text-gray-700 font-medium">
            Découvrez les créatures partagées par la communauté !
          </p>
        </div>

        {/* Grille de monstres */}
        {monsters.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">😢</div>
            <h2 className="text-3xl font-black text-gray-600 mb-4">
              Aucun monstre public pour le moment
            </h2>
            <p className="text-xl text-gray-500">
              Soyez le premier à partager votre créature avec la communauté !
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {monsters.map((monster) => (
              <PublicMonsterCard key={monster._id} monster={monster} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
