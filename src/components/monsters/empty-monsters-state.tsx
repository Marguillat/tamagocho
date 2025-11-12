import { mergeClasses } from '@/lib/utils'

/**
 * Props pour le composant EmptyMonstersState
 */
interface EmptyMonstersStateProps {
  /** Classe CSS optionnelle */
  className?: string
}

/**
 * État vide affiché quand l'utilisateur n'a pas encore de monstres
 *
 * Responsabilité unique : afficher un message d'encouragement
 * quand la liste des monstres est vide.
 *
 * @param {EmptyMonstersStateProps} props - Props du composant
 * @returns {React.ReactNode} État vide stylisé
 *
 * @example
 * <EmptyMonstersState className="mt-10" />
 */
export function EmptyMonstersState ({ className }: EmptyMonstersStateProps): React.ReactNode {
  return (
    <div
      className={mergeClasses(
        'mt-10 w-full rounded-lg bg-white p-8 text-center shadow-sm border-2 border-gray-200',
        className
      )}
    >
      <h2 className='text-xl font-semibold text-slate-900'>
        Tu n&apos;as pas encore de compagnon
      </h2>
      <p className='mt-2 text-sm text-slate-600'>
        Clique sur &quot;Créer une créature&quot; pour lancer ta première adoption magique.
      </p>
    </div>
  )
}
