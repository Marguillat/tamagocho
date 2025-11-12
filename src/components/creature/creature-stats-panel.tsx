import { memo, useMemo } from 'react'
import { getStateLabel } from '@/lib/utils'
import { XpProgressBar } from './xp-progress-bar'

/**
 * Props pour le composant StatItem
 */
interface StatItemProps {
  /** Label de la statistique */
  label: string
  /** Valeur de la statistique */
  value: string
  /** Emoji associé */
  emoji: string
  /** Couleur du gradient */
  colorBG: string

  colorText?: string
}

/**
 * Élément de statistique (ligne label/valeur) - Version Jeu Vidéo Fun
 *
 * Responsabilité unique : afficher une paire label/valeur
 * dans un format de ligne de statistique coloré et fun.
 *
 * Optimisé avec React.memo.
 *
 * @param {StatItemProps} props - Props du composant
 * @returns {React.ReactNode} Ligne de statistique
 */
export const StatItem = memo(function StatItem ({ label, value, emoji, colorBG, colorText = 'text-black' }: StatItemProps): React.ReactNode {
  return (
    <div className={`flex justify-between items-center py-4 px-6 rounded-2xl ${colorBG} shadow-lg ring-2 ring-white/50 transform hover:scale-105 transition-all duration-300`}>
      <div className='flex items-center gap-3'>
        <span className='text-3xl'>{emoji}</span>
        <span className={`${colorText} font-bold text-lg`}>{label}</span>
      </div>
      <span className={` ${colorText} font-black text-xl`}>{value}</span>
    </div>
  )
})

/**
 * Props pour le composant CreatureStatsPanel
 */
interface CreatureStatsPanelProps {
  /** Niveau du monstre */
  level: number
  /** XP actuel du monstre */
  xp: number
  /** XP maximum pour le niveau actuel */
  maxXp: number
  /** État du monstre */
  state: string
  /** Date de création (timestamp ou string) */
  createdAt: string | Date
  /** Date de dernière mise à jour (timestamp ou string) */
  updatedAt: string | Date
  /** Si true, affiche l'animation de gain d'XP */
  showXpGain?: boolean
  /** Montant d'XP gagné (pour l'animation) */
  xpGained?: number
}

/**
 * Panneau d'affichage des statistiques du monstre - Version Jeu Vidéo Fun
 *
 * Responsabilité unique : afficher toutes les statistiques
 * du monstre dans un panneau formaté super coloré.
 *
 * Nouveau design :
 * - Cartes colorées individuelles
 * - Émojis partout
 * - Animations hover
 *
 * Optimisé avec React.memo et useMemo pour les calculs de dates.
 *
 * @param {CreatureStatsPanelProps} props - Props du composant
 * @returns {React.ReactNode} Panneau de statistiques
 */
export const CreatureStatsPanel = memo(function CreatureStatsPanel ({
  level,
  xp,
  maxXp,
  state,
  createdAt,
  updatedAt,
  showXpGain = false,
  xpGained = 0
}: CreatureStatsPanelProps): React.ReactNode {
  // Optimisation : mémoriser les calculs de dates et labels pour éviter les recalculs
  const stateLabel = useMemo(() => getStateLabel(state), [state])
  const createdAtFormatted = useMemo(() => new Date(createdAt).toLocaleDateString('fr-FR'), [createdAt])
  const updatedAtFormatted = useMemo(() => new Date(updatedAt).toLocaleDateString('fr-FR'), [updatedAt])

  return (
    <div className='relative overflow-hidden rounded-[2rem]  bg-gradient-to-br from-white via-pink-50 to-purple-100 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)] ring-8 ring-white/80'>
      <div className='relative'>
        {/* Titre du panneau */}
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-900 flex items-center justify-center gap-2'>
            Statistiques
          </h2>
        </div>

        {/* Barre d'XP avec animations */}
        <div className='mb-8'>
          <XpProgressBar
            currentXp={xp}
            maxXp={maxXp}
            level={level}
            showXpGain={showXpGain}
            xpGained={xpGained}
          />
        </div>

        {/* Statistiques en cartes colorées */}
        <div className='space-y-4'>
          <StatItem
            label='Niveau'
            value={level.toString()}
            emoji='⭐'
            colorBG='bg-orange-100'
            colorText='text-orange-700'
          />
          <StatItem
            label='État'
            value={stateLabel}
            emoji='💖'
            colorBG='bg-rose-100'
            colorText='text-rose-700'
          />
          <StatItem
            label='Adopté le'
            value={createdAtFormatted}
            emoji='📅'
            colorBG='bg-cyan-100'
            colorText='text-cyan-700'
          />
          <StatItem
            label='Dernière activité'
            value={updatedAtFormatted}
            emoji='🔄'
            colorBG='bg-indigo-100'
            colorText='text-indigo-700'
          />
        </div>
      </div>

      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
      `}
      </style>
    </div>
  )
})
