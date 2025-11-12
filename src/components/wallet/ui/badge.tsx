import type React from 'react'

interface BadgeProps {
  text: string
  gradient: string
  isPopular?: boolean
}

/**
 * Composant badge réutilisable
 * Principe SRP: Responsabilité unique d'affichage d'un badge
 * Principe LSP: Peut être remplacé par n'importe quelle variante de badge
 */
export function Badge ({ text, gradient, isPopular = false }: BadgeProps): React.ReactElement {
  // Convertir le gradient en couleur solide
  const bgColor = isPopular ? 'bg-moccaccino-500' : 'bg-lochinvar-500'

  if (isPopular) {
    return (
      <div className='absolute -top-6 -right-6 z-20'>
        <div className={`${bgColor} text-white font-bold text-sm px-6 py-2 rounded-lg shadow-lg border-2 border-white transform rotate-12`}>
          ⭐ {text} ⭐
        </div>
      </div>
    )
  }

  return (
    <div className='absolute top-4 right-4 z-10'>
      <div className={`${bgColor} text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-sm`}>
        {text}
      </div>
    </div>
  )
}
