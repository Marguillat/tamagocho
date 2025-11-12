'use client'

import { useEffect, useState, useCallback } from 'react'
import { authClient } from '@/lib/auth-client'
import { createMonster } from '@/actions/monsters.actions'
import type { CreateMonsterFormValues } from '@/types/forms/create-monster-form'
import type { DBMonster } from '@/types/monster'
import {
  useUserDisplay,
  useMonsterStats,
  useLatestAdoptionLabel,
  useFavoriteMoodMessage
} from '@/hooks/dashboard'
import CreateMonsterModal from './create-monster-modal'
import { WelcomeHero } from './welcome-hero'
import { MoodTipSection } from './mood-tip-section'
import MonstersList from '../monsters/monsters-list'
import { DailyQuestsSection } from '@/components/quests'

type Session = typeof authClient.$Infer.Session

/**
 * Composant principal du contenu du dashboard - Version Jeu Vidéo Fun
 *
 * Responsabilité unique : orchestrer l'affichage des différentes sections
 * du dashboard (bienvenue, statistiques, quêtes, monstres, etc.).
 *
 * Nouveau design :
 * - Layout repensé pour mettre les monstres en avant
 * - Couleurs fun et engageantes
 * - Animations ludiques
 *
 * @param {Object} props - Props du composant
 * @param {Session} props.session - Session utilisateur Better Auth
 * @param {DBMonster[]} props.monsters - Liste des monstres de l'utilisateur
 * @returns {React.ReactNode} Contenu complet du dashboard
 */
function DashboardContent ({ session, monsters }: { session: Session, monsters: DBMonster[] }): React.ReactNode {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [monsterList, setMonsterList] = useState<DBMonster[]>(monsters)
  // Extraction des informations utilisateur
  const userDisplay = useUserDisplay(session)

  // Calcul des statistiques des monstres (déjà optimisés avec useMemo dans les hooks)
  const stats = useMonsterStats(monsterList)
  const latestAdoptionLabel = useLatestAdoptionLabel(stats.latestAdoption)
  const favoriteMoodMessage = useFavoriteMoodMessage(stats.favoriteMood, stats.totalMonsters)

  useEffect(() => {
    const fetchAndUpdateMonsters = async (): Promise<void> => {
      const response = await fetch('/api/monsters')
      const updatedMonsters = await response.json()
      setMonsterList(updatedMonsters)
    }

    const interval = setInterval(() => {
      void fetchAndUpdateMonsters()
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  /**
   * Ouvre le modal de création de monstre
   * Optimisé avec useCallback pour éviter les re-renders des composants enfants
   */
  const handleCreateMonster = useCallback((): void => {
    setIsModalOpen(true)
  }, [])

  /**
   * Ferme le modal de création de monstre
   * Optimisé avec useCallback pour stabilité de la référence
   */
  const handleCloseModal = useCallback((): void => {
    setIsModalOpen(false)
  }, [])

  /**
   * Soumet le formulaire de création de monstre
   * Optimisé avec useCallback - pas de dépendances externes
   * @param {CreateMonsterFormValues} values - Valeurs du formulaire
   */
  const handleMonsterSubmit = useCallback((values: CreateMonsterFormValues): void => {
    void createMonster(values).then(() => {
      window.location.reload()
    })
  }, [])

  return (
    <div className='min-h-screen bg-gray-50'>
      <main className='mx-auto w-full max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8'>
        {/* Section héro avec bienvenue */}
        <section className='rounded-lg bg-white px-6 py-8 shadow-sm border border-gray-200 mb-8'>
          <div className='space-y-6'>
            {/* Message de bienvenue */}
            <WelcomeHero
              userDisplay={userDisplay}
              onCreateMonster={handleCreateMonster}
            />

            {/* Statistiques en grille horizontale */}
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
              {/* Stat 1: Total Compagnons */}
              <div className='rounded-lg bg-moccaccino-50 border-2 border-moccaccino-200 p-5'>
                <div className='flex items-center justify-between'>
                  <div>
                    <div className='text-3xl font-bold text-moccaccino-700'>
                      {stats.totalMonsters}
                    </div>
                    <div className='mt-1 text-sm font-medium text-moccaccino-600'>
                      Compagnons
                    </div>
                  </div>
                  <div className='text-3xl opacity-40'>
                    🎮
                  </div>
                </div>
              </div>

              {/* Stat 2: Niveau Max */}
              <div className='rounded-lg bg-fuchsia-blue-50 border-2 border-fuchsia-blue-200 p-5'>
                <div className='flex items-center justify-between'>
                  <div>
                    <div className='text-3xl font-bold text-fuchsia-blue-700'>
                      {stats.highestLevel}
                    </div>
                    <div className='mt-1 text-sm font-medium text-fuchsia-blue-600'>
                      Niveau Max
                    </div>
                  </div>
                  <div className='text-3xl opacity-40'>
                    ⭐
                  </div>
                </div>
              </div>

              {/* Stat 3: Dernière Adoption */}
              <div className='rounded-lg bg-lochinvar-50 border-2 border-lochinvar-200 p-5'>
                <div className='flex items-center justify-between'>
                  <div>
                    <div className='text-xl font-bold text-lochinvar-700'>
                      {latestAdoptionLabel}
                    </div>
                    <div className='mt-1 text-sm font-medium text-lochinvar-600'>
                      Dernière Adoption
                    </div>
                  </div>
                  <div className='text-3xl opacity-40'>
                    🗓️
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section principale : monstres */}
        <div className='space-y-8'>
          {/* Liste des monstres */}
          <MonstersList monsters={monsterList} className='mt-0' />
        </div>

        {/* Quêtes journalières */}
        <div className='my-8'>
          <DailyQuestsSection />
        </div>

        {/* Conseils */}
        <div className='my-8'>
          <MoodTipSection message={favoriteMoodMessage} />
        </div>
      </main>

      {/* Modal de création de monstre */}
      <CreateMonsterModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleMonsterSubmit}
      />

    </div>
  )
}

export default DashboardContent
