import { memo } from "react";
import type { UserDisplay } from "@/hooks/dashboard";

/**
 * Props pour le composant WelcomeHero
 */
interface WelcomeHeroProps {
  /** Informations d'affichage de l'utilisateur */
  userDisplay: UserDisplay;
  /** Callback pour créer un nouveau monstre */
  onCreateMonster: () => void;
}

/**
 * Section héro de bienvenue du dashboard - Version Jeu Vidéo Fun
 *
 * Responsabilité unique : afficher le message de bienvenue personnalisé
 * et l'action principale (créer un monstre).
 *
 * Nouveau design :
 * - Plus coloré et engageant
 * - Animation et effets visuels
 * - Style jeu vidéo kawaii
 *
 * Optimisé avec React.memo pour éviter les re-renders inutiles.
 *
 * @param {WelcomeHeroProps} props - Props du composant
 * @returns {React.ReactNode} Section de bienvenue
 */
export const WelcomeHero = memo(function WelcomeHero({
  userDisplay,
  onCreateMonster,
}: WelcomeHeroProps): React.ReactNode {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
      {/* Contenu textuel */}
      <div className="space-y-4 flex-1">
        {/* Badge de bienvenue super fun */}
        <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-200 to-purple-300 px-6 py-3 shadow-lg ring-4 ring-pink-200/50">
          <span className="text-white font-bold text-lg tracking-wide">
            Salut {userDisplay.displayName} !
          </span>
        </div>

        {/* Titre principal avec gradient */}
        <h1 className="text-4xl font-black text-transparent bg-gradient-to-r from-moccaccino-600 via-fuchsia-blue-700 via-20% to-lochinvar-500 to-60% bg-clip-text leading-tight sm:text-5xl">
          Bienvenue dans ta base de Tamagotcho !
        </h1>

        {/* Description fun */}
        <p className="text-lg text-gray-700 font-medium leading-relaxed">
          <span className="text-2xl mr-2">✨</span>
          Prends soin de tes créatures adorables et vis des aventures
          inoubliables
        </p>
      </div>

      {/* Bouton d'action principal - À droite sur desktop */}
      <div className="flex-shrink-0">
        <button
          onClick={onCreateMonster}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-moccaccino-600 to-fuchsia-blue-700 px-8 py-4 text-lg font-black text-white shadow-2xl ring-4 ring-moccaccino-200/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_50px_rgba(224,61,48,0.4)] hover:cursor-pointer active:scale-105 w-full lg:w-auto"
        >
          {/* Effet de brillance */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 group-hover:animate-shine" />
          <span className="relative flex items-center justify-center gap-3">
            <span>Créer une Créature</span>
          </span>
        </button>
      </div>

      {/* Styles pour les animations */}
      <style jsx>
        {`
          @keyframes wave {
            0%,
            100% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(20deg);
            }
            75% {
              transform: rotate(-20deg);
            }
          }

          @keyframes shine {
            0% {
              transform: translateX(-100%) skewX(-12deg);
            }
            100% {
              transform: translateX(200%) skewX(-12deg);
            }
          }

          .animate-wave {
            animation: wave 2s ease-in-out infinite;
          }

          .group:hover .animate-shine {
            animation: shine 1s ease-in-out;
          }
        `}
      </style>
    </div>
  );
});
