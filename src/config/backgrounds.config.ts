import type { BackgroundConfig } from '@/types/background'

export type { BackgroundConfig }

/**
 * Catalogue des backgrounds disponibles pour les monstres
 *
 * Principe de configuration centralisée :
 * - Configuration des backgrounds en un seul endroit
 * - Facilite l'ajout de nouveaux backgrounds
 * - Facilite la modification des prix et descriptions
 *
 * Organisation :
 * - Les backgrounds sont basés sur les fichiers dans /public/backgrounds
 * - Chaque background a un prix, une description et une catégorie
 */

export const backgroundsCatalog: BackgroundConfig[] = [
  {
    id: 'cosy-tamagocho',
    name: 'Maison Cosy',
    description: 'Un intérieur chaleureux et confortable pour votre créature',
    url: '/backgrounds/cosy-tamagocho.png',
    price: 100,
    emoji: '🏠',
    category: 'cosy',
    popular: true
  },
  {
    id: 'fantasy-tamagocho',
    name: 'Royaume Fantastique',
    description: 'Un monde magique plein de mystères et d\'aventures',
    url: '/backgrounds/fantasy-tamagocho.png',
    price: 200,
    emoji: '🏰',
    category: 'fantasy',
    popular: true
  },
  {
    id: 'scify-tamagocho',
    name: 'Station Spatiale',
    description: 'L\'espace infini et les technologies futuristes',
    url: '/backgrounds/scify-tamagocho.png',
    price: 250,
    emoji: '🚀',
    category: 'scifi'
  },
  {
    id: 'steam-punk-tamagocho',
    name: 'Ville Steampunk',
    description: 'Un univers rétro-futuriste à vapeur et engrenages',
    url: '/backgrounds/steam-punk-tamagocho.png',
    price: 300,
    emoji: '⚙️',
    category: 'steampunk',
    popular: true
  },
  {
    id: 'gloomy-forest-tamagocho',
    name: 'Forêt Sombre',
    description: 'Une forêt mystérieuse et envoûtante',
    url: '/backgrounds/gloomy-forest-tamagocho.png',
    price: 150,
    emoji: '🌲',
    category: 'nature'
  }
]

/**
 * Trouve un background par son ID
 * @param {string} id - ID du background
 * @returns {BackgroundConfig | undefined} Configuration du background ou undefined
 */
export function findBackgroundById (id: string): BackgroundConfig | undefined {
  return backgroundsCatalog.find(bg => bg.id === id)
}

/**
 * Filtre les backgrounds par catégorie
 * @param {string} category - Catégorie des backgrounds
 * @returns {BackgroundConfig[]} Liste des backgrounds de la catégorie
 */
export function filterBackgroundsByCategory (
  category: 'cosy' | 'fantasy' | 'scifi' | 'steampunk' | 'nature' | 'all'
): BackgroundConfig[] {
  if (category === 'all') {
    return backgroundsCatalog
  }
  return backgroundsCatalog.filter(bg => bg.category === category)
}
