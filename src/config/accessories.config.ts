/**
 * Configuration du catalogue d'accessoires pour la boutique
 *
 * Ce fichier définit tous les accessoires disponibles à l'achat
 * avec leurs propriétés (type, prix, couleur, emoji).
 *
 * Principes SOLID :
 * - SRP : Responsabilité unique de configuration des accessoires
 * - OCP : Facile à étendre avec de nouveaux accessoires
 */

export type AccessoryType = 'hat' | 'shoes' | 'sunglasses'

export interface AccessoryConfig {
  id: string
  name: string
  type: AccessoryType
  price: number
  mainColor: string
  emoji: string
  description: string
  popular?: boolean
}

/**
 * Catalogue complet des accessoires disponibles dans la boutique
 */
export const accessoriesCatalog: AccessoryConfig[] = [
  // ========== CHAPEAUX (Hats) ==========
  {
    id: 'hat-cowboy',
    name: 'Chapeau de Cowboy',
    type: 'hat',
    price: 25,
    mainColor: '#8B4513',
    emoji: '🤠',
    description: 'Yeehaw ! Pour les créatures aventurières',
    popular: false
  },
  {
    id: 'hat-crown',
    name: 'Couronne Royale',
    type: 'hat',
    price: 100,
    mainColor: '#FFD700',
    emoji: '👑',
    description: 'Pour les créatures de sang royal',
    popular: true
  },
  {
    id: 'hat-cap',
    name: 'Casquette',
    type: 'hat',
    price: 15,
    mainColor: '#FF0000',
    emoji: '🧢',
    description: 'Style décontracté garanti',
    popular: false
  },
  {
    id: 'hat-wizard',
    name: 'Chapeau de Magicien',
    type: 'hat',
    price: 75,
    mainColor: '#800080',
    emoji: '🎩',
    description: 'Pour les créatures magiques',
    popular: false
  },
  {
    id: 'hat-party',
    name: 'Chapeau de Fête',
    type: 'hat',
    price: 20,
    mainColor: '#FF69B4',
    emoji: '🎉',
    description: 'Célèbre chaque instant',
    popular: false
  },

  // ========== LUNETTES (Sunglasses) ==========
  {
    id: 'glasses-sunglasses',
    name: 'Lunettes de Soleil',
    type: 'sunglasses',
    price: 20,
    mainColor: '#000000',
    emoji: '😎',
    description: 'Cool à toute heure',
    popular: true
  },
  {
    id: 'glasses-nerd',
    name: 'Lunettes de Geek',
    type: 'sunglasses',
    price: 18,
    mainColor: '#4169E1',
    emoji: '🤓',
    description: '+10 en intelligence',
    popular: false
  },
  {
    id: 'glasses-heart',
    name: 'Lunettes Cœur',
    type: 'sunglasses',
    price: 22,
    mainColor: '#FF1493',
    emoji: '😍',
    description: 'Love is in the air',
    popular: false
  },
  {
    id: 'glasses-star',
    name: 'Lunettes Étoile',
    type: 'sunglasses',
    price: 30,
    mainColor: '#FFD700',
    emoji: '🌟',
    description: 'Brille comme une star',
    popular: false
  },
  {
    id: 'glasses-3d',
    name: 'Lunettes 3D',
    type: 'sunglasses',
    price: 25,
    mainColor: '#FF0000',
    emoji: '🎬',
    description: 'Pour voir le monde différemment',
    popular: false
  },

  // ========== CHAUSSURES (Shoes) ==========
  {
    id: 'shoes-sneakers',
    name: 'Baskets',
    type: 'shoes',
    price: 20,
    mainColor: '#FFFFFF',
    emoji: '👟',
    description: 'Confortables et stylées',
    popular: true
  },
  {
    id: 'shoes-boots',
    name: 'Bottes de Cowboy',
    type: 'shoes',
    price: 35,
    mainColor: '#8B4513',
    emoji: '🥾',
    description: 'Parfaites pour l\'aventure',
    popular: false
  },
  {
    id: 'shoes-ballet',
    name: 'Chaussons de Danse',
    type: 'shoes',
    price: 28,
    mainColor: '#FFB6C1',
    emoji: '🩰',
    description: 'Pour danser avec grâce',
    popular: false
  },
  {
    id: 'shoes-roller',
    name: 'Patins à Roulettes',
    type: 'shoes',
    price: 45,
    mainColor: '#FF6347',
    emoji: '🛼',
    description: 'Vitesse maximale !',
    popular: false
  },
  {
    id: 'shoes-rocket',
    name: 'Bottes Spatiales',
    type: 'shoes',
    price: 80,
    mainColor: '#4169E1',
    emoji: '🚀',
    description: 'Vers l\'infini et au-delà',
    popular: false
  }
]

/**
 * Obtenir tous les accessoires d'un type spécifique
 */
export function getAccessoriesByType (type: AccessoryType): AccessoryConfig[] {
  return accessoriesCatalog.filter(acc => acc.type === type)
}

/**
 * Obtenir un accessoire par son ID
 */
export function getAccessoryById (id: string): AccessoryConfig | undefined {
  return accessoriesCatalog.find(acc => acc.id === id)
}

/**
 * Obtenir tous les accessoires populaires
 */
export function getPopularAccessories (): AccessoryConfig[] {
  return accessoriesCatalog.filter(acc => acc.popular === true)
}