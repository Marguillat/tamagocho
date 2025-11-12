'use client'

import type React from 'react'
import { type DBWallet } from '@/actions/wallet.actions'
import { useState } from 'react'
import { usePaymentModal } from '@/hooks/wallet/usePaymentModal'
import { useWalletPayment } from '@/hooks/wallet/useWalletPayment'
import { walletPackages } from '@/config/wallet-packages'
import { DecorativeBackground } from './ui/decorative-background'
import { WalletBalance } from './wallet-balance'
import { KoinPackageCard } from './koin-package-card'
import { PaymentFeatures } from './payment-features'
import PaymentModal from './payment-modal'
import { AnimatedEmoji } from './ui/animated-emoji'

interface WalletClientProps {
  initialWallet: DBWallet
}

/**
 * Composant client pour afficher et gérer le wallet de l'utilisateur
 * Refactorisé selon les principes SOLID
 *
 * Principe SRP: Responsabilité unique de coordination de la page wallet
 * Principe OCP: Ouvert à l'extension via composants modulaires
 * Principe DIP: Dépend d'abstractions (hooks et composants)
 *
 * @param {WalletClientProps} props - Les propriétés du composant
 * @param {DBWallet} props.initialWallet - Le wallet initial de l'utilisateur
 */
export default function WalletClient ({ initialWallet }: WalletClientProps): React.ReactElement {
  const [wallet] = useState<DBWallet>(initialWallet)
  const { isPurchasing, error, handlePurchase } = useWalletPayment()
  const { showModal, modalType, closeModal } = usePaymentModal()

  return (
    <div className='min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-200 p-8'>
      {/* Fond décoratif */}
      <DecorativeBackground />

      <div className='relative max-w-6xl mx-auto'>
        {/* En-tête */}
        <div className='text-center mb-12'>
          <div className='inline-flex items-center gap-3 mb-4'>
            <span className='text-4xl'>💰</span>
            <h1 className='text-4xl font-bold text-gray-900'>
              Boutique de Koins
            </h1>
            <span className='text-4xl'>🪙</span>
          </div>
          <p className='text-lg font-medium text-gray-700 flex items-center justify-center gap-2'>
            <span>✨</span>
            Achète des Koins pour ton aventure !
            <span>✨</span>
          </p>
        </div>

        {/* Solde du wallet */}
        <WalletBalance balance={wallet.balance} />

        {/* Message d'erreur */}
        {error !== null && (
          <div className='bg-red-100 border-2 border-red-300 text-red-700 px-6 py-4 rounded-lg mb-8 text-center text-base font-semibold'>
            <span className='text-2xl mr-2'>⚠️</span>
            {error}
          </div>
        )}

        {/* Titre de la boutique */}
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Choisis ton Pack de Koins ! 🎁
          </h2>
          <p className='text-base text-gray-700 font-medium'>
            Paiement sécurisé par Stripe 🔒
          </p>
        </div>

        {/* Grille des packages */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
          {walletPackages.map((pkg) => (
            <KoinPackageCard
              key={pkg.amount}
              package={pkg}
              isPurchasing={isPurchasing}
              onPurchase={(amount) => { void handlePurchase(amount) }}
            />
          ))}
        </div>

        {/* Informations supplémentaires */}
        <PaymentFeatures />
      </div>

      {/* Modal de confirmation/erreur de paiement */}
      {showModal && (
        <PaymentModal
          type={modalType}
          onClose={closeModal}
        />
      )}
    </div>
  )
}
