'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { useState } from 'react'

interface BottomNavProps {
  /** Solde du wallet de l'utilisateur */
  walletBalance: number
}

/**
 * Barre de navigation en bas pour mobile et tablette - Version Jeu Vidéo Fun
 *
 * Affiche une navigation de type "app mobile" en bas de l'écran.
 * Design coloré et engageant style jeu vidéo kawaii.
 *
 * Responsabilité unique : Gérer la navigation mobile/tablette de l'application
 */
export default function BottomNav ({ walletBalance }: BottomNavProps): React.ReactNode {
  const pathname = usePathname()
  const router = useRouter()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async (): Promise<void> => {
    if (isLoggingOut) return

    try {
      setIsLoggingOut(true)
      setShowLogoutConfirm(false)

      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/sign-in')
            router.refresh()
          },
          onError: (ctx) => {
            console.error('Erreur lors de la déconnexion:', ctx.error)
            router.push('/sign-in')
            router.refresh()
          }
        }
      })
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
      window.location.href = '/sign-in'
    } finally {
      setIsLoggingOut(false)
    }
  }

  const isActive = (path: string): boolean => {
    return pathname === path
  }

  const navItems = [
    { href: '/app', label: 'Home', icon: '🏠', color: 'from-purple-400 to-pink-500' },
    { href: '/app/public-monsters', label: 'Public', icon: '🌍', color: 'from-blue-400 to-indigo-500' },
    { href: '/app/wallet', label: String(walletBalance.toLocaleString()), icon: '🪙', color: 'from-yellow-400 to-orange-500', isWallet: true },
    { href: '#logout', label: 'Quitter', icon: '🚪', action: 'logout', color: 'from-red-400 to-rose-500' }
  ]

  const handleNavClick = (item: typeof navItems[0]): void => {
    if (item.action === 'logout') {
      setShowLogoutConfirm(true)
    }
  }

  return (
    <>
      {/* Barre de navigation fixée en bas */}
      <nav className='md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-sm'>
        <div className='grid grid-cols-4 gap-1 px-3 py-2 safe-area-inset-bottom'>
          {navItems.map((item) => {
            if (item.action === 'logout') {
              return (
                <button
                  key={item.label}
                  onClick={() => { handleNavClick(item) }}
                  className='flex flex-col items-center justify-center gap-1 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                >
                  <span className='text-xl'>{item.icon}</span>
                  <span className='text-xs'>{item.label}</span>
                </button>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 py-2 rounded-lg font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-moccaccino-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className='text-xl'>
                  {item.icon}
                </span>
                <span className='text-xs uppercase'>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Modal de confirmation de déconnexion - Plus fun */}
      {showLogoutConfirm && (
        <div className='md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center p-4 animate-fade-in'>
          <div className='bg-gradient-to-br from-white via-pink-50 to-purple-100 rounded-[2rem] shadow-[0_30px_90px_rgba(0,0,0,0.4)] w-full max-w-sm mb-24 animate-slide-up ring-8 ring-white/50'>
            <div className='p-8'>
              <div className='text-center mb-8'>
                <div className='text-8xl mb-4 animate-wave'>👋</div>
                <h3 className='text-3xl font-black text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-3'>
                  Tu pars déjà ?
                </h3>
                <p className='text-xl font-bold text-gray-700'>
                  Tes créatures vont te manquer ! 😢
                </p>
              </div>

              <div className='flex flex-col gap-4'>
                <button
                  onClick={() => {
                    void handleLogout()
                  }}
                  className='group relative overflow-hidden w-full bg-gradient-to-r from-red-500 to-rose-600 text-white font-black text-xl py-5 px-6 rounded-2xl hover:from-red-600 hover:to-rose-700 transition-all duration-300 transform active:scale-95 shadow-2xl ring-4 ring-red-200/50'
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 group-hover:animate-shine' />
                  <span className='relative flex items-center justify-center gap-3'>
                    <span className='text-2xl'>🚪</span>
                    <span>Oui, me déconnecter</span>
                  </span>
                </button>
                <button
                  onClick={() => { setShowLogoutConfirm(false) }}
                  className='group relative overflow-hidden w-full bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 font-black text-xl py-5 px-6 rounded-2xl hover:from-gray-300 hover:to-gray-400 transition-all duration-300 transform active:scale-95 shadow-xl ring-4 ring-white/80'
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 group-hover:animate-shine' />
                  <span className='relative flex items-center justify-center gap-3'>
                    <span className='text-2xl'>💖</span>
                    <span>Rester</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles pour les animations */}
      <style jsx>
        {`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }


        .safe-area-inset-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}
      </style>
    </>
  )
}
