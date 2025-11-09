'use client'

import { useEffect, useState } from 'react'
import { AnimatedMonster } from '@/components/monsters'
import type { DBMonster, MonsterTraits } from '@/types/monster'
import type { DBBackground } from '@/types/background'
import type { EquippedAccessory } from '@/components/monsters/pixel-monster'
import { parseMonsterTraits, getStateEmoji } from '@/lib/utils'
import { getEquippedBackground } from '@/actions/backgrounds.actions'
import { getEquippedAccessoriesForMonster } from '@/actions/accessories.actions'
import type { AccessoryType } from '@/config/accessories.config-v2'

/**
 * Props pour le composant PublicMonsterCard
 */
interface PublicMonsterCardProps {
  /** Données du monstre à afficher */
  monster: DBMonster
}

/**
 * Carte d'affichage d'un monstre public
 *
 * Ce composant affiche une carte présentant un monstre public avec :
 * - Son rendu visuel avec accessoires
 * - Son background équipé
 * - Ses informations de base (nom, niveau, état)
 *
 * Responsabilité unique : présenter visuellement un monstre public
 * de manière attractive et informative.
 *
 * @param {PublicMonsterCardProps} props - Props du composant
 * @returns {React.ReactNode} Carte du monstre public
 *
 * @example
 * <PublicMonsterCard monster={monsterData} />
 */
export function PublicMonsterCard ({ monster }: PublicMonsterCardProps): React.ReactNode {
  const [equippedBackground, setEquippedBackground] = useState<DBBackground | null>(null)
  const [equippedAccessories, setEquippedAccessories] = useState<EquippedAccessory[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Parse des traits depuis le JSON stocké en base
  const traits: MonsterTraits = parseMonsterTraits(monster.traits) ?? {
    bodyColor: '#FFB5E8',
    accentColor: '#FF9CEE',
    eyeColor: '#2C2C2C',
    antennaColor: '#FFE66D',
    bobbleColor: '#FFE66D',
    cheekColor: '#FFB5D5',
    bodyStyle: 'round',
    eyeStyle: 'big',
    antennaStyle: 'single',
    accessory: 'none'
  }

  // Charger le background et les accessoires équipés
  useEffect(() => {
    const loadMonsterAssets = async (): Promise<void> => {
      try {
        setIsLoading(true)

        // Charger le background équipé
        if (monster.equipedBackground !== null && monster.equipedBackground !== undefined) {
          const bg = await getEquippedBackground(monster._id)
          setEquippedBackground(bg)
        }

        // Charger les accessoires équipés
        if (monster.equipedAccessories !== null && monster.equipedAccessories !== undefined && monster.equipedAccessories.length > 0) {
          const accessories = await getEquippedAccessoriesForMonster(monster._id)

          if (accessories.length > 0) {
            const equippedItems: EquippedAccessory[] = accessories.map((acc) => ({
              type: acc.type as AccessoryType,
              mainColor: acc.mainColor ?? '#000000'
            }))

            setEquippedAccessories(equippedItems)
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement des assets du monstre:', error)
      } finally {
        setIsLoading(false)
      }
    }

    void loadMonsterAssets()
  }, [monster._id, monster.equipedBackground, monster.equipedAccessories])

  return (
    <div className='group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-4 border-purple-200 hover:border-purple-400 hover:scale-105'>
      {/* Background du monstre */}
      {equippedBackground !== null && equippedBackground !== undefined && (
        <div
          className='absolute inset-0 bg-cover bg-center opacity-40'
          style={{ backgroundImage: `url(${equippedBackground.url})` }}
        />
      )}

      {/* Contenu de la carte */}
      <div className='relative z-10 p-6'>
        {/* En-tête avec nom et niveau */}
        <div className='text-center mb-4'>
          <h3 className='text-2xl font-black text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-2'>
            {monster.name}
          </h3>
          <div className='flex items-center justify-center gap-2'>
            <span className='px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full shadow-md'>
              ⭐ Niveau {monster.level}
            </span>
            <span className='px-3 py-1 bg-gradient-to-r from-blue-400 to-purple-500 text-white text-sm font-bold rounded-full shadow-md'>
              {getStateEmoji(monster.state)} {monster.state}
            </span>
          </div>
        </div>

        {/* Zone du monstre */}
        <div className='relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 mb-4 min-h-[300px] flex items-center justify-center border-2 border-purple-200'>
          {isLoading
            ? (
              <div className='text-center'>
                <div className='text-6xl mb-4 animate-bounce'>⏳</div>
                <p className='text-gray-600 font-medium'>Chargement...</p>
              </div>
              )
            : (
              <AnimatedMonster
                state={monster.state}
                traits={traits}
                level={monster.level}
                equippedAccessories={equippedAccessories}
              />
              )}
        </div>

        {/* Badge public */}
        <div className='text-center'>
          <span className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-bold rounded-full shadow-md'>
            🌍 Public
          </span>
        </div>
      </div>

      {/* Effet de brillance au hover */}
      <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
    </div>
  )
}
