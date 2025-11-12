'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { useState } from 'react'

interface AppHeaderProps {
  /** Solde du wallet de l'utilisateur */
  walletBalance: number
}

/**
 * Header de l'application pour desktop - Version Jeu Vidéo Fun
 *
 * Affiche la navigation principale en haut de l'écran sur les écrans desktop.
 * Design coloré et engageant style jeu vidéo kawaii.
 *
 * Responsabilité unique : Gérer la navigation desktop de l'application
 */
export default function AppHeader ({ walletBalance }: AppHeaderProps): React.ReactNode {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async (): Promise<void> => {
    if (isLoggingOut) return // Éviter les double-clics

    try {
      setIsLoggingOut(true)

      // Déconnexion via Better Auth
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            // Redirection après succès
            router.push('/sign-in')
            router.refresh() // Force le rafraîchissement pour nettoyer la session
          },
          onError: (ctx) => {
            console.error('Erreur lors de la déconnexion:', ctx.error)
            // Redirection même en cas d'erreur pour éviter un état bloqué
            router.push('/sign-in')
            router.refresh()
          }
        }
      })
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
      // Fallback : redirection forcée
      window.location.href = '/sign-in'
    } finally {
      setIsLoggingOut(false)
    }
  }

  const isActive = (path: string): boolean => {
    return pathname === path
  }

  const navItems = [
    { href: '/app', label: 'Dashboard', icon: '🏠', color: 'from-purple-400 to-pink-500' },
    { href: '/app/public-monsters', label: 'Monstres Publics', icon: '🌍', color: 'from-blue-400 to-indigo-500' }
  ]

  return (
    <header className='hidden md:block bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 border-b-4 border-purple-300 sticky top-0 z-50 shadow-lg'>
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-20'>
          {/* Logo */}
          <Link href='/app' className='flex-shrink-0'>
            <div className='flex items-center space-x-2'>
              <Image
                src='/logo_comp.webp'
                alt='Tamagotcho Logo'
                width={40}
                height={40}
                className='w-10 h-10 rounded-lg'
                priority
              />
              <span className='text-xl font-bold text-moccaccino-600'>
                Tamagotcho
              </span>
            </div>
          </Link>

          {/* Navigation + Wallet + Actions */}
          <div className='flex items-center space-x-2'>
            {/* Navigation principale */}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-moccaccino-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Wallet */}
            <Link
              href='/app/wallet'
              className='flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-lochinvar-100 text-lochinvar-700 hover:bg-lochinvar-200'
            >
              <span>🪙</span>
              <span>{walletBalance.toLocaleString()}</span>
            </Link>

            {/* Bouton de déconnexion */}
            <button
              onClick={() => { void handleLogout() }}
              disabled={isLoggingOut}
              className='group relative overflow-hidden flex items-center gap-3 px-6 py-3 rounded-2xl text-lg font-black bg-gradient-to-r from-red-400 to-rose-500 text-white hover:from-red-500 hover:to-rose-600 transition-all duration-300 transform hover:scale-110 active:scale-105 shadow-xl ring-4 ring-red-200/50 hover:shadow-[0_10px_30px_rgba(239,68,68,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 group-hover:animate-shine' />
              {isLoggingOut
                ? (
                  <>
                    <span className='text-2xl relative z-10 animate-spin'>⏳</span>
                    <span className='relative z-10'>Déconnexion...</span>
                  </>
                  )
                : (
                  <>
                    <span className='text-2xl relative z-10 group-hover:scale-125 transition-transform duration-300'>🚪</span>
                    <span className='relative z-10'>Quitter</span>
                  </>
                  )}
            </button>
          </div>
        </div>
      </nav>

    </header>
  )
}
