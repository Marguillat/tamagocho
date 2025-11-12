/**
 * Props pour le composant CreatureHeader
 */
interface CreatureHeaderProps {
  /** Nom du monstre */
  name: string
  /** Niveau du monstre */
  level: number
}

/**
 * En-tête de la page de détail d'une créature - Version Jeu Vidéo Fun
 *
 * Responsabilité unique : afficher le nom et le niveau du monstre
 * dans un format visuellement ultra attrayant.
 *
 * Nouveau design :
 * - Titre énorme avec gradient
 * - Badge de niveau imposant
 * - Emojis et animations
 *
 * @param {CreatureHeaderProps} props - Props du composant
 * @returns {React.ReactNode} En-tête avec nom et niveau
 */
export function CreatureHeader ({ name, level }: CreatureHeaderProps): React.ReactNode {
  return (
    <div className='text-center mb-8'>
      <div className='flex items-center justify-center gap-3 mb-3'>
        <h1 className='text-4xl font-bold text-gray-900'>
          {name}
        </h1>
        <div className='flex items-center gap-1.5 bg-moccaccino-500 text-white font-semibold px-3 py-1.5 rounded-lg text-sm'>
          <span>⭐</span>
          <span>Niv. {level}</span>
        </div>
      </div>
    </div>
  )
}
