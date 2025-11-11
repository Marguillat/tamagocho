# 💻 Exemples de Code - Implémentation Concrète

Guide d'implémentation des optimisations avec code prêt à utiliser.

---

## 1️⃣ Pattern useMemo - Exemples Prêts à Copier

### Exemple 1: Dashboard Content Stats

**Fichier**: `src/components/dashboard/dashboard-content.tsx`

```typescript
'use client'

import { useEffect, useState, useMemo } from 'react' // ← Ajouter useMemo
import { useUserDisplay, useMonsterStats, useLatestAdoptionLabel, useFavoriteMoodMessage } from '@/hooks/dashboard'

function DashboardContent ({ session, monsters }) {
  // ... autres states ...

  // ✅ AVANT (à remplacer)
  // const userDisplay = useUserDisplay(session)
  // const stats = useMonsterStats(monsters)
  // const latestAdoptionLabel = useLatestAdoptionLabel(stats.latestAdoption)
  // const favoriteMoodMessage = useFavoriteMoodMessage(stats.favoriteMood, stats.totalMonsters)

  // ✅ APRÈS
  const userDisplay = useMemo(() => useUserDisplay(session), [session])
  const stats = useMemo(() => useMonsterStats(monsters), [monsters])
  const latestAdoptionLabel = useMemo(() => 
    useLatestAdoptionLabel(stats.latestAdoption), 
    [stats.latestAdoption]
  )
  const favoriteMoodMessage = useMemo(() => 
    useFavoriteMoodMessage(stats.favoriteMood, stats.totalMonsters), 
    [stats.favoriteMood, stats.totalMonsters]
  )

  // ... rest of component ...
}
```

**Gain**: Évite 3-4 recalculs à chaque rendu du parent
**Temps**: 5 minutes d'intégration

---

### Exemple 2: Shop Filtered Accessories

**Fichier**: `src/components/shop/accessories-shop.tsx`

```typescript
'use client'

import { useState, useMemo } from 'react' // ← Ajouter useMemo
import { accessoriesCatalog } from '@/config/accessories.config'

export function AccessoriesShop ({ monsterId, currentBalance, onPurchaseSuccess }) {
  const [selectedType, setSelectedType] = useState('all')
  // ... other state ...

  // ✅ AVANT
  // const filteredAccessories = selectedType === 'all'
  //   ? accessoriesCatalog
  //   : accessoriesCatalog.filter(acc => acc.type === selectedType)

  // ✅ APRÈS
  const filteredAccessories = useMemo(() => 
    selectedType === 'all'
      ? accessoriesCatalog
      : accessoriesCatalog.filter(acc => acc.type === selectedType),
    [selectedType]
  )

  return (
    <div>
      {/* ... filtrage UI ... */}
      <div className='grid gap-4'>
        {filteredAccessories.map(accessory => (
          <AccessoryCard key={accessory.id} accessory={accessory} />
        ))}
      </div>
    </div>
  )
}
```

**Gain**: Évite le filtrage répété sur chaque rendu
**Temps**: 5 minutes d'intégration

---

### Exemple 3: Monsters List Mapping

**Fichier**: `src/components/monsters/monsters-list.tsx`

```typescript
import { useMemo } from 'react' // ← Ajouter
import type { DBMonster } from '@/types/monster'

function MonstersList ({ monsters, className }) {
  // ✅ AVANT
  // return (
  //   <div className='grid gap-8'>
  //     {monsters.map((monster) => {
  //       const cardKey = monster._id
  //       return (
  //         <MonsterCardWithBackground
  //           key={cardKey}
  //           id={cardKey}
  //           name={monster.name}
  //           // ... props ...
  //         />
  //       )
  //     })}
  //   </div>
  // )

  // ✅ APRÈS - Memoizer les props pour chaque carte
  const monstrosCards = useMemo(() => 
    monsters.map((monster) => ({
      key: monster._id,
      id: monster._id,
      name: monster.name,
      traits: monster.traits,
      state: monster.state,
      level: monster.level,
      createdAt: String(monster.createdAt),
      updatedAt: String(monster.updatedAt),
      equipedBackgroundId: monster.equipedBackground ?? null
    })),
    [monsters]
  )

  return (
    <div className='grid gap-8'>
      {monstrosCards.map((card) => (
        <MonsterCardWithBackground
          key={card.key}
          {...card}
        />
      ))}
    </div>
  )
}
```

**Gain**: Évite les recalculs de props à chaque rendu parent
**Temps**: 8 minutes d'intégration

---

### Exemple 4: Creature Traits Parsing

**Fichier**: `src/components/creature/creature-page-client.tsx`

```typescript
import { useEffect, useState, useRef, useMemo } from 'react' // ← Ajouter useMemo
import { parseMonsterTraits } from '@/lib/utils'

const defaultTraits = {
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

export function CreaturePageClient ({ monster }) {
  // ... other state ...

  // ✅ AVANT
  // const traits = parseMonsterTraits(monster.traits) ?? defaultTraits

  // ✅ APRÈS
  const traits = useMemo(() => 
    parseMonsterTraits(monster.traits) ?? defaultTraits,
    [monster.traits]
  )

  // ... rest of component ...
}
```

**Gain**: Évite le parsing JSON à chaque rendu
**Temps**: 3 minutes d'intégration

---

## 2️⃣ Pattern useCallback - Exemples Prêts à Copier

### Exemple 1: Dashboard Modal Handlers

**Fichier**: `src/components/dashboard/dashboard-content.tsx`

```typescript
'use client'

import { useState, useCallback } from 'react' // ← Ajouter useCallback
import { createMonster } from '@/actions/monsters.actions'

function DashboardContent ({ session, monsters }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [monsterList, setMonsterList] = useState(monsters)

  // ✅ AVANT
  // const handleCreateMonster = () => {
  //   setIsModalOpen(true)
  // }
  // const handleCloseModal = () => {
  //   setIsModalOpen(false)
  // }
  // const handleMonsterSubmit = (values) => {
  //   void createMonster(values).then(() => {
  //     window.location.reload()
  //   })
  // }

  // ✅ APRÈS - Fonctions stables et mémorisées
  const handleCreateMonster = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const handleMonsterSubmit = useCallback((values) => {
    void createMonster(values).then(() => {
      window.location.reload()
    })
  }, [])

  return (
    <div>
      <button onClick={handleCreateMonster}>Créer un monstre</button>
      {isModalOpen && (
        <CreateMonsterModal
          onClose={handleCloseModal}
          onSubmit={handleMonsterSubmit}
        />
      )}
    </div>
  )
}
```

**Gain**: Passe la même fonction aux enfants (évite les re-rendus)
**Temps**: 8 minutes d'intégration

---

### Exemple 2: Shop Purchase Handler

**Fichier**: `src/components/shop/accessories-shop.tsx`

```typescript
'use client'

import { useState, useCallback } from 'react' // ← Ajouter useCallback
import { createAccessoryForMonster } from '@/actions/accessories.actions'

export function AccessoriesShop ({ monsterId, currentBalance, onPurchaseSuccess }) {
  const [isPurchasing, setIsPurchasing] = useState(null)
  const [error, setError] = useState(null)
  const [ownedAccessories, setOwnedAccessories] = useState([])

  // ✅ AVANT
  // async function handlePurchase (accessory) {
  //   // ... logic ...
  // }

  // ✅ APRÈS - Callback mémorisé
  const handlePurchase = useCallback(async (accessory) => {
    if (currentBalance < accessory.price) {
      setError('Pas assez de Koins !')
      setTimeout(() => { setError(null) }, 3000)
      return
    }

    setIsPurchasing(accessory.id)
    setError(null)

    try {
      const accessoryData = {
        type: accessory.type,
        mainColor: accessory.mainColor,
        price: accessory.price
      }

      await createAccessoryForMonster(monsterId, accessoryData)
      // ... update UI ...
      
      if (onPurchaseSuccess) {
        onPurchaseSuccess()
      }
    } catch (err) {
      console.error('Erreur:', err)
      setError('Erreur lors de l\'achat')
    } finally {
      setIsPurchasing(null)
    }
  }, [monsterId, currentBalance, onPurchaseSuccess])

  return (
    <div>
      {/* Accesory cards avec onClick={handlePurchase} */}
    </div>
  )
}
```

**Gain**: Callback stable passé aux boutons d'achat
**Temps**: 10 minutes d'intégration

---

### Exemple 3: Creature Action Handler

**Fichier**: `src/components/creature/creature-page-client.tsx`

```typescript
'use client'

import { useCallback, useRef } from 'react'

export function CreaturePageClient ({ monster }) {
  const [currentAction, setCurrentAction] = useState(null)
  const actionTimerRef = useRef(null)

  // ✅ AVANT
  // const handleAction = (action) => {
  //   // ... logic ...
  // }

  // ✅ APRÈS - Callback stable avec nettoyage
  const handleAction = useCallback((action) => {
    // Nettoyer le timer précédent
    if (actionTimerRef.current !== null) {
      clearTimeout(actionTimerRef.current)
    }

    setCurrentAction(action)

    // Timer pour réinitialiser l'action après 1.5s
    actionTimerRef.current = setTimeout(() => {
      setCurrentAction(null)
      actionTimerRef.current = null
    }, 1500)
  }, [])

  return (
    <MonsterDisplay
      state={currentMonster.state}
      currentAction={currentAction}
      onAction={handleAction} // ← Fonction stable
    />
  )
}
```

**Gain**: Callback stable pour les actions du monstre
**Temps**: 8 minutes d'intégration

---

## 3️⃣ Pattern Lazy Loading - Exemples Prêts à Copier

### Exemple 1: Lazy Load Shop Modal

**Fichier**: `src/components/creature/creature-page-client.tsx`

```typescript
'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

// ✅ AVANT
// import { ShopModal } from './shop-modal'

// ✅ APRÈS - Lazy load avec Suspense
const ShopModal = dynamic(
  () => import('./shop-modal').then(mod => ({
    default: mod.ShopModal
  })),
  {
    loading: () => <div className='animate-pulse'>Chargement du magasin...</div>,
    ssr: false
  }
)

export function CreaturePageClient ({ monster }) {
  const [showShop, setShowShop] = useState(false)

  return (
    <div>
      <button onClick={() => setShowShop(true)}>
        🛍️ Ouvrir la boutique
      </button>

      {showShop && (
        <ShopModal
          monster={monster}
          onClose={() => setShowShop(false)}
        />
      )}
    </div>
  )
}
```

**Gain**: Shop modal chargé seulement au clic (économise ~40 KB)
**Temps**: 5 minutes d'intégration

---

### Exemple 2: Lazy Load Create Monster Modal

**Fichier**: `src/components/dashboard/dashboard-content.tsx`

```typescript
'use client'

import dynamic from 'next/dynamic'
import { useState, useCallback } from 'react'

// ✅ AVANT
// import { CreateMonsterModal } from './create-monster-modal'

// ✅ APRÈS - Lazy load
const CreateMonsterModal = dynamic(
  () => import('./create-monster-modal').then(mod => ({
    default: mod.CreateMonsterModal
  })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
)

function DashboardContent ({ session, monsters }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateMonster = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <div>
      <button onClick={handleCreateMonster}>
        + Créer un monstre
      </button>

      {isModalOpen && (
        <CreateMonsterModal
          onClose={handleCloseModal}
          onSuccess={() => {
            handleCloseModal()
            window.location.reload()
          }}
        />
      )}
    </div>
  )
}
```

**Gain**: Modal chargé seulement au clic (économise ~30 KB)
**Temps**: 5 minutes d'intégration

---

### Exemple 3: Lazy Load Confetti Library

**Fichier**: `src/components/creature/level-up-animation.tsx`

```typescript
'use client'

import dynamic from 'next/dynamic'
import { type ReactElement } from 'react'

// ✅ AVANT
// import confetti from 'canvas-confetti'

// ✅ APRÈS - Lazy load Confetti library
const Confetti = dynamic(
  () => import('canvas-confetti').then(mod => ({
    default: mod
  })),
  {
    ssr: false,
    loading: () => null
  }
)

export function LevelUpAnimation ({ level }): ReactElement {
  const handleCelebration = async (): Promise<void> => {
    const confetti = await import('canvas-confetti')
    confetti.default({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  return (
    <div>
      <div className='text-6xl animate-bounce'>🎉</div>
      <button onClick={() => void handleCelebration()}>
        Célébrer!
      </button>
    </div>
  )
}
```

**Gain**: Confetti library chargée seulement au level-up (économise ~50 KB)
**Temps**: 3 minutes d'intégration

---

## 4️⃣ Pattern React Query Caching

### Exemple 1: Setup React Query Provider

**Fichier**: `src/app/layout.tsx` (NOUVEAU - à ajouter)

```typescript
'use client'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactNode } from 'react'

// Instance globale React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,      // 10 secondes
      cacheTime: 60000,      // 1 minute
      refetchInterval: 30000, // 30 secondes
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})

export function ReactQueryProvider ({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

**Wrapping dans layout**:
```typescript
// src/app/layout.tsx
import { ReactQueryProvider } from '@/lib/react-query-provider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  )
}
```

**Temps**: 10 minutes d'intégration

---

### Exemple 2: Query Hook pour les Monstres

**Fichier**: `src/hooks/monsters/use-monsters-query.ts` (NOUVEAU)

```typescript
'use client'

import { useQuery } from 'react-query'
import type { DBMonster } from '@/types/monster'

export function useMonstersQuery() {
  return useQuery(
    'monsters',
    async () => {
      const response = await fetch('/api/monsters')
      if (!response.ok) throw new Error('Failed to fetch')
      return response.json() as Promise<DBMonster[]>
    },
    {
      staleTime: 10000,      // Frais pendant 10s
      cacheTime: 60000,      // Cache pendant 1 min
      refetchInterval: 30000, // Refetch toutes les 30s
      refetchOnWindowFocus: false,
      retry: 1
    }
  )
}
```

**Usage**:
```typescript
// src/components/dashboard/dashboard-content.tsx
import { useMonstersQuery } from '@/hooks/monsters/use-monsters-query'

function DashboardContent() {
  const { data: monsters = [], isLoading, error } = useMonstersQuery()
  
  if (isLoading) return <Spinner />
  if (error) return <Error />
  
  return <MonstersList monsters={monsters} />
}
```

**Gain**: Automatiquement mis en cache et refetchés intelligemment
**Temps**: 10 minutes d'intégration

---

## 5️⃣ Pattern LocalStorage Cache

### Exemple 1: Cache Wrapper Utilitaire

**Fichier**: `src/lib/cache/local-storage-cache.ts` (NOUVEAU)

```typescript
/**
 * Wrapper pour LocalStorage avec support TTL et serialization
 */
export class LocalStorageCache {
  private static PREFIX = 'tamagotcho_'

  /**
   * Stocker une valeur avec TTL optionnel
   */
  static set<T>(key: string, value: T, ttlMs?: number): void {
    const fullKey = this.PREFIX + key
    const data = {
      value,
      timestamp: Date.now(),
      expiry: ttlMs ? Date.now() + ttlMs : null
    }
    localStorage.setItem(fullKey, JSON.stringify(data))
  }

  /**
   * Récupérer une valeur (null si expirée)
   */
  static get<T>(key: string): T | null {
    const fullKey = this.PREFIX + key
    const stored = localStorage.getItem(fullKey)
    
    if (!stored) return null

    try {
      const { value, expiry } = JSON.parse(stored)
      
      // Vérifier expiration
      if (expiry && Date.now() > expiry) {
        this.remove(key)
        return null
      }
      
      return value as T
    } catch {
      this.remove(key)
      return null
    }
  }

  /**
   * Supprimer une valeur
   */
  static remove(key: string): void {
    const fullKey = this.PREFIX + key
    localStorage.removeItem(fullKey)
    localStorage.removeItem(`${fullKey}_expiry`)
  }

  /**
   * Effacer tout le cache
   */
  static clear(): void {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith(this.PREFIX)) {
        localStorage.removeItem(key)
      }
    })
  }
}
```

**Usage**:
```typescript
import { LocalStorageCache } from '@/lib/cache/local-storage-cache'

// Stocker avec TTL de 5 minutes
LocalStorageCache.set('accessories', accessoriesList, 5 * 60 * 1000)

// Récupérer
const accessories = LocalStorageCache.get('accessories')

// Effacer
LocalStorageCache.remove('accessories')
```

**Temps**: 15 minutes d'intégration

---

## 6️⃣ Config Next.js Optimisée

### Fichier: `next.config.ts` (À mettre à jour)

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // ✅ Compression
  compress: true,

  // ✅ Disable X-Powered-By header
  poweredByHeader: false,

  // ✅ Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 an
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },

  // ✅ Webpack optimizations
  webpack (config) {
    // Exclude documentation from build
    config.module.rules.push({
      test: /\.tsx?$/,
      include: /documentation/,
      use: 'null-loader'
    })

    return config
  },

  // ✅ Headers de cache
  async headers () {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, s-maxage=120'
          }
        ]
      }
    ]
  }
}

export default nextConfig
```

**Gain**: 20-30% réduction en taille et temps
**Temps**: 10 minutes

---

## ✅ Checklist d'Implémentation

### Phase 1 (Jour 1-2):
- [ ] Ajouter `useMemo` aux 4 composants (30 min)
- [ ] Ajouter `useCallback` aux 4 composants (40 min)
- [ ] Mettre à jour `next.config.ts` (10 min)
- [ ] Tester les performances (30 min)

### Phase 2 (Jour 3-4):
- [ ] Setup React Query (30 min)
- [ ] Créer `useMonstersQuery` hook (15 min)
- [ ] Créer `LocalStorageCache` wrapper (20 min)
- [ ] Tester le caching (30 min)

### Phase 3 (Jour 5-6):
- [ ] Lazy-load ShopModal (10 min)
- [ ] Lazy-load CreateMonsterModal (10 min)
- [ ] Lazy-load Confetti (5 min)
- [ ] Tests des modals en load/unload (30 min)

---

**Prêt à copier-coller et intégrer! 🚀**

