import type React from 'react'
import { AnimatedEmoji } from './ui/animated-emoji'
import { useCountUp } from '@/hooks/wallet/useCountUp'

interface WalletBalanceProps {
  balance: number
}

/**
 * Composant d'affichage du solde du wallet avec animation de compteur
 * Principe SRP: Responsabilité unique d'affichage du solde
 */
export function WalletBalance ({ balance }: WalletBalanceProps): React.ReactElement {
  // Animation du compteur de 0 au montant actuel
  const animatedBalance = useCountUp(balance, 2000)

  const getKoinLabel = (): string => {
    if (animatedBalance === 0 || animatedBalance === 1) return 'Koin'
    return 'Koins'
  }

  return (
    <div className='relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-white via-yellow-50 to-orange-100 p-12 mb-12 shadow-[0_30px_90px_rgba(0,0,0,0.25)] ring-8 ring-white/80'>
      <div className='absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-orange-200/30 to-red-200/30 animate-pulse-slow' />

      <div className='relative z-10'>
        <div className='text-center'>
          <p className='text-xl font-bold text-orange-600 uppercase tracking-widest mb-4 flex items-center justify-center gap-2'>
            <span className='text-2xl'>💎</span>
            Ton Trésor Actuel
            <span className='text-2xl'>💎</span>
          </p>
          <div className='flex items-center justify-center gap-4'>
            <span className='text-5xl'>🪙</span>
            <h2 className='text-6xl font-bold text-lochinvar-700 transition-all duration-300'>
              {animatedBalance.toLocaleString('fr-FR')}
            </h2>
            <span className='text-5xl'>🪙</span>
          </div>
          <p className='text-xl font-bold text-lochinvar-600 mt-4'>
            {getKoinLabel()}
          </p>
        </div>
      </div>
    </div>
  )
}
