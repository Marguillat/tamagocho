# 🚀 Guide de Démarrage Rapide - Système de Backgrounds

## Aperçu en 30 secondes

Le système de backgrounds est maintenant intégré dans la boutique ! Les utilisateurs peuvent acheter et équiper des arrière-plans pour personnaliser l'environnement de leurs monstres.

## 📦 Fichiers créés

```
✅ src/types/background.ts
✅ src/config/backgrounds.config.ts
✅ src/actions/backgrounds.actions.ts
✅ src/components/shop/backgrounds-shop.tsx
✅ docs/BACKGROUNDS_SYSTEM.md (cette documentation)
```

## 📝 Fichiers modifiés

```
✅ src/components/creature/shop-modal.tsx (ajout onglet backgrounds)
```

## 🎮 Utilisation immédiate

### 1. Accéder à la boutique

Les backgrounds sont disponibles dans la boutique du monstre via l'onglet **🖼️ Backgrounds**.

### 2. Acheter un background

```typescript
// Déjà intégré dans BackgroundsShop component
// L'utilisateur clique simplement sur "Acheter"
```

### 3. Équiper un background (à implémenter)

```typescript
import { equipBackgroundToMonster } from '@/actions/backgrounds.actions'

// Équiper un background
await equipBackgroundToMonster(monsterId, backgroundId)
```

### 4. Afficher le background équipé (à implémenter)

```typescript
import { getEquippedBackground } from '@/actions/backgrounds.actions'

// Dans votre composant de visualisation du monstre
const background = await getEquippedBackground(monsterId)

if (background) {
  // Afficher l'image de fond
  <div style={{ backgroundImage: `url(${background.url})` }}>
    {/* Votre monstre ici */}
  </div>
}
```

## 🏪 Backgrounds disponibles

| Nom | Prix | Emoji | Fichier |
|-----|------|-------|---------|
| Maison Cosy | 100 🪙 | 🏠 | `cosy-tamagocho.png` |
| Royaume Fantastique | 200 🪙 | 🏰 | `fantasy-tamagocho.png` |
| Station Spatiale | 250 🪙 | 🚀 | `scify-tamagocho.png` |
| Ville Steampunk | 300 🪙 | ⚙️ | `steam-punk-tamagocho.png` |
| Forêt Sombre | 150 🪙 | 🌲 | `gloomy-forest-tamagocho.png` |

## 🔧 Ajouter un nouveau background

1. **Ajouter l'image** dans `/public/backgrounds/`
2. **Mettre à jour** `/src/config/backgrounds.config.ts` :

```typescript
{
  id: 'mon-nouveau-background',
  name: 'Mon Background',
  description: 'Description cool',
  url: '/backgrounds/mon-background.png',
  price: 150,
  emoji: '🎨',
  category: 'cosy',
  popular: false
}
```

C'est tout ! Le nouveau background apparaîtra automatiquement dans la boutique.

## 🎯 Server Actions disponibles

```typescript
// Acheter un background (déjà intégré dans la boutique)
await createBackgroundForMonster(monsterId, {
  url: '/backgrounds/cosy-tamagocho.png',
  description: 'Un intérieur chaleureux',
  price: 100
})

// Équiper un background
await equipBackgroundToMonster(monsterId, backgroundId)

// Retirer un background
await unequipBackgroundFromMonster(monsterId)

// Lister les backgrounds d'un monstre
const backgrounds = await getBackgroundsForMonster(monsterId)

// Récupérer le background équipé
const equipped = await getEquippedBackground(monsterId)
```

## ⚠️ Sécurité automatique

Le système vérifie automatiquement :
- ✅ Authentification de l'utilisateur
- ✅ Propriété du monstre
- ✅ Solde suffisant dans le wallet
- ✅ Pas de doublons (même background déjà acheté)
- ✅ Existence du background avant équipement

## 🎨 Intégration UI (à faire)

Pour afficher le background sur un monstre existant :

```typescript
'use client'

import { useEffect, useState } from 'react'
import { getEquippedBackground } from '@/actions/backgrounds.actions'

export function MonsterDisplay({ monsterId }) {
  const [bgUrl, setBgUrl] = useState<string | null>(null)

  useEffect(() => {
    async function loadBackground() {
      const bg = await getEquippedBackground(monsterId)
      if (bg) setBgUrl(bg.url)
    }
    loadBackground()
  }, [monsterId])

  return (
    <div 
      className="monster-container"
      style={{
        backgroundImage: bgUrl ? `url(${bgUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Votre composant monstre */}
    </div>
  )
}
```

## 🐛 Gestion d'erreurs

Le système gère automatiquement les erreurs courantes :

| Erreur | Message affiché |
|--------|----------------|
| Pas assez de Koins | "Pas assez de Koins !" |
| Background déjà acheté | "Background already owned" |
| Monstre introuvable | "Monster not found" |
| Non authentifié | "User not authenticated" |

## 📊 Base de données

Le système utilise le modèle existant `/src/db/models/background.model.ts` :

```typescript
{
  monsterId: ObjectId,     // Référence au monstre
  url: string,             // Chemin de l'image
  description: string,     // Description
  createdAt: Date,
  updatedAt: Date
}
```

Le monstre stocke l'ID du background équipé :

```typescript
{
  equipedBackground: ObjectId | ""  // Background actif
}
```

## 🔄 Workflow complet

```
1. User ouvre la boutique
2. User clique sur l'onglet "Backgrounds"
3. User choisit un background
4. User clique "Acheter"
5. ✅ Vérification du solde
6. ✅ Débit automatique du wallet
7. ✅ Création du background en DB
8. ✅ Rafraîchissement du solde
9. ✅ Message de confirmation
10. [À implémenter] User équipe le background
11. [À implémenter] Background s'affiche sur le monstre
```

## 📱 Interface

L'interface de la boutique de backgrounds suit le même design que les accessoires :
- 🎨 Grille responsive
- 🏷️ Filtres par catégorie
- ⭐ Badges "Populaire"
- 💰 Affichage du prix en Koins
- 🖼️ Prévisualisation de l'image
- ✨ Animations fluides

## ✅ Tests rapides

Pour tester le système :

1. **Démarrer l'app** : `npm run dev`
2. **Se connecter** avec un utilisateur
3. **Créer un monstre** (ou utiliser un existant)
4. **Ouvrir la boutique** du monstre
5. **Cliquer** sur l'onglet "🖼️ Backgrounds"
6. **Acheter** un background
7. **Vérifier** que le solde a été débité

## 🚧 Prochaines étapes

1. **Implémenter l'affichage** du background sur le monstre
2. **Créer une page d'inventaire** pour gérer les backgrounds
3. **Ajouter des boutons** équiper/déséquiper dans l'UI
4. **Animation de transition** lors du changement de background
5. **Tests automatisés** pour les server actions

## 📚 Documentation complète

Pour plus de détails, consultez `/docs/BACKGROUNDS_SYSTEM.md`

## 💡 Tips

- Les backgrounds sont en PNG pour supporter la transparence
- Le prix augmente avec la complexité/rareté du background
- Le système empêche l'achat de doublons automatiquement
- Les backgrounds "Populaires" sont marqués avec ⭐

---

**Questions ?** Consultez la documentation complète ou les commentaires dans le code source.

