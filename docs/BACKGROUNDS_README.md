# 🖼️ Système de Backgrounds - README

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [API](#api)
- [Configuration](#configuration)
- [Documentation](#documentation)

## Vue d'ensemble

Le système de backgrounds permet aux utilisateurs d'acheter et d'équiper des arrière-plans personnalisés pour leurs monstres Tamagotchi. Cette fonctionnalité est intégrée dans la boutique existante et suit les mêmes conventions que le système d'accessoires.

### Fonctionnalités

- ✅ Achat de backgrounds via la boutique
- ✅ 5 backgrounds disponibles (cosy, fantasy, sci-fi, steampunk, nature)
- ✅ Filtrage par catégorie
- ✅ Prévisualisation des backgrounds
- ✅ Gestion automatique du wallet
- ✅ Prévention des doublons
- ⏳ Équipement des backgrounds (à implémenter dans l'UI)
- ⏳ Affichage visuel sur le monstre (à implémenter)

## Installation

Le système est déjà installé et intégré. Aucune configuration supplémentaire n'est nécessaire.

### Fichiers du système

```
src/
├── types/background.ts                    # Types TypeScript
├── config/backgrounds.config.ts           # Catalogue des backgrounds
├── actions/backgrounds.actions.ts         # Server actions
└── components/
    └── shop/
        └── backgrounds-shop.tsx           # Composant boutique
```

## Utilisation

### 1. Accéder à la boutique

1. Ouvrir la page d'un monstre
2. Cliquer sur le bouton "Boutique"
3. Sélectionner l'onglet "🖼️ Backgrounds"

### 2. Acheter un background

```typescript
// Le système est déjà intégré dans l'UI
// L'utilisateur clique simplement sur "Acheter"

// Ou utiliser directement la server action :
import { createBackgroundForMonster } from '@/actions/backgrounds.actions'

await createBackgroundForMonster(monsterId, {
  url: '/backgrounds/cosy-tamagocho.png',
  description: 'Un intérieur chaleureux',
  price: 100
})
```

### 3. Équiper un background

```typescript
import { equipBackgroundToMonster } from '@/actions/backgrounds.actions'

await equipBackgroundToMonster(monsterId, backgroundId)
```

### 4. Retirer un background

```typescript
import { unequipBackgroundFromMonster } from '@/actions/backgrounds.actions'

await unequipBackgroundFromMonster(monsterId)
```

### 5. Récupérer les backgrounds

```typescript
import { 
  getBackgroundsForMonster, 
  getEquippedBackground 
} from '@/actions/backgrounds.actions'

// Tous les backgrounds achetés
const backgrounds = await getBackgroundsForMonster(monsterId)

// Background actuellement équipé
const equipped = await getEquippedBackground(monsterId)
```

## API

### Types

#### `DBBackground`

```typescript
interface DBBackground {
  _id: string
  monsterId: string
  url: string
  description: string
  createdAt: Date
  updatedAt: Date
}
```

#### `BackgroundData`

```typescript
interface BackgroundData {
  url: string
  description: string
  price: number
}
```

#### `BackgroundConfig`

```typescript
interface BackgroundConfig {
  id: string
  name: string
  description: string
  url: string
  price: number
  emoji: string
  popular?: boolean
  category: 'cosy' | 'fantasy' | 'scifi' | 'steampunk' | 'nature'
}
```

### Server Actions

#### `createBackgroundForMonster(monsterId, backgroundData)`

Achète un background pour un monstre.

**Paramètres :**
- `monsterId: string` - ID du monstre
- `backgroundData: BackgroundData` - Données du background

**Retour :** `Promise<void>`

**Erreurs :**
- `User not authenticated` - Utilisateur non connecté
- `Monster not found or not owned by user` - Monstre introuvable
- `Background already owned` - Background déjà acheté
- `Insufficient funds` - Solde insuffisant (géré par `subtractKoins`)

#### `equipBackgroundToMonster(monsterId, backgroundId)`

Équipe un background sur un monstre.

**Paramètres :**
- `monsterId: string` - ID du monstre
- `backgroundId: string` - ID du background

**Retour :** `Promise<void>`

#### `unequipBackgroundFromMonster(monsterId)`

Retire le background actuel d'un monstre.

**Paramètres :**
- `monsterId: string` - ID du monstre

**Retour :** `Promise<void>`

#### `getBackgroundsForMonster(monsterId)`

Récupère tous les backgrounds achetés pour un monstre.

**Paramètres :**
- `monsterId: string` - ID du monstre

**Retour :** `Promise<DBBackground[] | void>`

#### `getEquippedBackground(monsterId)`

Récupère le background actuellement équipé.

**Paramètres :**
- `monsterId: string` - ID du monstre

**Retour :** `Promise<DBBackground | null>`

### Composant

#### `<BackgroundsShop>`

```typescript
interface BackgroundsShopProps {
  monsterId: string
  currentBalance: number
  onPurchaseSuccess?: () => void
}

<BackgroundsShop 
  monsterId="123abc"
  currentBalance={500}
  onPurchaseSuccess={() => {
    // Rafraîchir les données
  }}
/>
```

## Configuration

### Ajouter un nouveau background

1. **Ajouter l'image** dans `/public/backgrounds/`

2. **Mettre à jour le catalogue** dans `/src/config/backgrounds.config.ts` :

```typescript
{
  id: 'mon-background',
  name: 'Mon Background',
  description: 'Description du background',
  url: '/backgrounds/mon-background.png',
  price: 150,
  emoji: '🎨',
  category: 'cosy', // ou 'fantasy', 'scifi', 'steampunk', 'nature'
  popular: false
}
```

3. **C'est tout !** Le background apparaîtra automatiquement dans la boutique.

### Backgrounds disponibles

| ID | Nom | Prix | Catégorie | Fichier |
|----|-----|------|-----------|---------|
| `cosy-tamagocho` | Maison Cosy | 100 🪙 | cosy | `cosy-tamagocho.png` |
| `fantasy-tamagocho` | Royaume Fantastique | 200 🪙 | fantasy | `fantasy-tamagocho.png` |
| `scify-tamagocho` | Station Spatiale | 250 🪙 | scifi | `scify-tamagocho.png` |
| `steam-punk-tamagocho` | Ville Steampunk | 300 🪙 | steampunk | `steam-punk-tamagocho.png` |
| `gloomy-forest-tamagocho` | Forêt Sombre | 150 🪙 | nature | `gloomy-forest-tamagocho.png` |

## Documentation

### Guides disponibles

- **[BACKGROUNDS_QUICKSTART.md](./BACKGROUNDS_QUICKSTART.md)** - Guide de démarrage rapide
- **[BACKGROUNDS_SYSTEM.md](./BACKGROUNDS_SYSTEM.md)** - Documentation technique complète
- **[BACKGROUNDS_IMPLEMENTATION_SUMMARY.md](./BACKGROUNDS_IMPLEMENTATION_SUMMARY.md)** - Résumé de l'implémentation

### Documentation inline

Tous les fichiers contiennent des commentaires JSDoc détaillés. Consultez directement le code source pour plus d'informations.

## Exemples d'utilisation

### Exemple 1 : Afficher le background sur un monstre

```typescript
'use client'

import { useEffect, useState } from 'react'
import { getEquippedBackground } from '@/actions/backgrounds.actions'
import type { DBBackground } from '@/types/background'

export function MonsterDisplay({ monsterId }: { monsterId: string }) {
  const [background, setBackground] = useState<DBBackground | null>(null)

  useEffect(() => {
    async function loadBackground() {
      const bg = await getEquippedBackground(monsterId)
      setBackground(bg)
    }
    loadBackground()
  }, [monsterId])

  return (
    <div 
      className="relative w-full h-96 rounded-lg overflow-hidden"
      style={{
        backgroundImage: background ? `url(${background.url})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Votre composant monstre ici */}
    </div>
  )
}
```

### Exemple 2 : Inventaire des backgrounds

```typescript
'use client'

import { useEffect, useState } from 'react'
import { getBackgroundsForMonster, equipBackgroundToMonster } from '@/actions/backgrounds.actions'
import type { DBBackground } from '@/types/background'

export function BackgroundInventory({ monsterId }: { monsterId: string }) {
  const [backgrounds, setBackgrounds] = useState<DBBackground[]>([])

  useEffect(() => {
    async function loadBackgrounds() {
      const bgs = await getBackgroundsForMonster(monsterId)
      if (bgs) setBackgrounds(bgs)
    }
    loadBackgrounds()
  }, [monsterId])

  const handleEquip = async (backgroundId: string) => {
    await equipBackgroundToMonster(monsterId, backgroundId)
    // Rafraîchir l'affichage
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {backgrounds.map((bg) => (
        <div key={bg._id} className="relative">
          <img src={bg.url} alt={bg.description} />
          <button onClick={() => handleEquip(bg._id)}>
            Équiper
          </button>
        </div>
      ))}
    </div>
  )
}
```

### Exemple 3 : Utiliser le composant dans une page

```typescript
import { BackgroundsShop } from '@/components/shop/backgrounds-shop'
import { getWallet } from '@/actions/wallet.actions'

export default async function ShopPage({ params }: { params: { monsterId: string } }) {
  const wallet = await getWallet()

  return (
    <div>
      <h1>Boutique de Backgrounds</h1>
      <BackgroundsShop 
        monsterId={params.monsterId}
        currentBalance={wallet.balance}
        onPurchaseSuccess={async () => {
          'use server'
          // Revalidation ou autre action
        }}
      />
    </div>
  )
}
```

## Sécurité

Le système intègre plusieurs couches de sécurité :

- ✅ Vérification d'authentification sur toutes les actions
- ✅ Vérification de propriété du monstre
- ✅ Validation du solde avant achat
- ✅ Prévention des doublons
- ✅ Gestion des erreurs avec messages user-friendly

## Performance

- ✅ Revalidation automatique du cache Next.js
- ✅ Images optimisées (PNG)
- ✅ Chargement lazy des backgrounds
- ✅ Animations CSS légères

## Support

Pour toute question ou problème :

1. Consultez la documentation dans `/docs/`
2. Vérifiez les commentaires dans le code source
3. Consultez les exemples ci-dessus

## Licence

Ce code fait partie du projet Tamagotcho (My Digital School).

---

**Version :** 1.0.0  
**Dernière mise à jour :** 2 novembre 2025

