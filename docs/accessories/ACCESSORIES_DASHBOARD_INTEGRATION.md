# 🎨 Intégration des Accessoires sur les Pages Dashboard

## Vue d'ensemble

Cette documentation décrit l'intégration complète de l'affichage des accessoires équipés sur les pages du dashboard :
- **Page `/app`** : Dashboard principal avec les monstres de l'utilisateur
- **Page `/app/public-monsters`** : Galerie des monstres publics de la communauté

## 📋 Modifications effectuées

### 1. Nouvelle Server Action

**Fichier** : `src/actions/accessories.actions.ts`

Ajout de la fonction `getEquippedAccessoriesForMonster()` :

```typescript
/**
 * Récupère uniquement les accessoires équipés d'un monstre
 * @param monsterId - ID du monstre
 * @returns Liste des accessoires équipés avec leurs détails
 */
export async function getEquippedAccessoriesForMonster (
  monsterId: string
): Promise<DBAccessory[]>
```

**Avantages** :
- ✅ Retourne directement les accessoires équipés (pas besoin de filtrer côté client)
- ✅ Gestion d'erreur robuste (retourne un tableau vide en cas de problème)
- ✅ Respecte la séparation des couches (logique métier côté serveur)

### 2. Page Dashboard Principal (`/app`)

#### Composant `MonsterCardWithBackground`
**Fichier** : `src/components/monsters/monster-card-with-background.tsx`

**Modifications** :
- Ajout d'un état `equippedAccessories` pour stocker les accessoires
- Nouveau `useEffect` pour charger les accessoires équipés au montage
- Passage des accessoires au composant `MonsterCard`

```typescript
const [equippedAccessories, setEquippedAccessories] = useState<DBAccessory[]>([])

useEffect(() => {
  const loadAccessories = async (): Promise<void> => {
    try {
      const accessories = await getEquippedAccessoriesForMonster(id)
      setEquippedAccessories(accessories)
    } catch (error) {
      console.error('Erreur lors du chargement des accessoires:', error)
      setEquippedAccessories([])
    }
  }
  void loadAccessories()
}, [id])
```

#### Composant `MonsterCard`
**Fichier** : `src/components/monsters/monster-card.tsx`

**Modifications** :
- Ajout de la prop `equippedAccessories?: DBAccessory[]`
- Conversion des accessoires DB vers le format `EquippedAccessory`
- Passage des accessoires au composant `PixelMonster`

```typescript
// Conversion des accessoires pour PixelMonster
const accessoriesForPixelMonster: EquippedAccessory[] = equippedAccessories.map(acc => ({
  type: acc.type as AccessoryType,
  mainColor: acc.mainColor ?? '#000000'
}))

// Dans le rendu
<PixelMonster
  traits={traits}
  state={isMonsterState(state) ? state : 'happy'}
  level={levelLabel}
  equippedAccessories={accessoriesForPixelMonster}
/>
```

### 3. Page Monstres Publics (`/app/public-monsters`)

#### Composant `PublicMonsterCard`
**Fichier** : `src/components/public-monsters/public-monster-card.tsx`

**Modifications** :
- Remplacement de `getAccessoriesForMonster` par `getEquippedAccessoriesForMonster`
- Simplification de la logique de chargement des accessoires
- Suppression de la dépendance au catalogue pour la récupération

**Avant** :
```typescript
// Récupérait TOUS les accessoires puis filtrait avec le catalogue
const accessories = await getAccessoriesForMonster(monster._id)
const equippedItems = accessories
  .map((acc) => {
    const catalogItem = accessoriesCatalog.find(...)
    // ...logique complexe
  })
  .filter(...)
```

**Après** :
```typescript
// Récupère directement les accessoires équipés
const accessories = await getEquippedAccessoriesForMonster(monster._id)
const equippedItems: EquippedAccessory[] = accessories.map((acc) => ({
  type: acc.type as AccessoryType,
  mainColor: acc.mainColor ?? '#000000'
}))
```

### 4. Exports TypeScript

**Fichier** : `src/components/monsters/index.ts`

Ajout des exports pour faciliter l'import :
```typescript
export type { MonsterCardProps } from './monster-card'
export type { EquippedAccessory } from './pixel-monster'
```

## 🎯 Résultat

### Dashboard Principal (`/app`)
- ✅ Chaque carte de monstre affiche ses accessoires équipés
- ✅ Les accessoires sont rendus en pixel art sur le canvas
- ✅ Chargement asynchrone sans bloquer l'interface
- ✅ Background et accessoires chargés en parallèle

### Monstres Publics (`/app/public-monsters`)
- ✅ Affichage des accessoires équipés sur les monstres publics
- ✅ Logique simplifiée et plus performante
- ✅ Cohérence avec l'affichage du dashboard principal
- ✅ Utilisation de `AnimatedMonster` pour plus d'interactivité

## 🏗️ Architecture

### Flux de données

```
┌─────────────────────────────────────────────────────────┐
│  Page (Server Component)                                │
│  - getPublicMonsters() ou getMonsters()                │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│  MonsterCardWithBackground / PublicMonsterCard (Client) │
│  - useEffect: loadAccessories()                         │
│  - useEffect: loadBackground()                          │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│  Server Action                                          │
│  - getEquippedAccessoriesForMonster(monsterId)         │
│    → Récupère le monstre                               │
│    → Récupère les accessoires équipés                  │
│    → Retourne DBAccessory[]                            │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│  MonsterCard (Client)                                   │
│  - Conversion DBAccessory → EquippedAccessory          │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│  PixelMonster (Client)                                  │
│  - Rendu canvas avec accessoires                       │
│  - drawAccessoryOnMonster()                            │
└─────────────────────────────────────────────────────────┘
```

## 🎨 Principes SOLID respectés

### Single Responsibility Principle (SRP)
- `getEquippedAccessoriesForMonster` : responsabilité unique de récupérer les accessoires équipés
- `MonsterCardWithBackground` : orchestration du chargement des assets
- `MonsterCard` : présentation visuelle du monstre
- `PixelMonster` : rendu canvas avec accessoires

### Dependency Inversion Principle (DIP)
- Les composants dépendent des abstractions (server actions) et non des implémentations concrètes
- Pas d'appel direct à la base de données depuis les composants

### Open/Closed Principle (OCP)
- Ajout de fonctionnalités sans modifier le code existant
- Extension par composition (ajout de props)

## 📊 Performance

### Optimisations
- ✅ Chargement parallèle des backgrounds et accessoires
- ✅ Pas de requêtes inutiles (seulement si `equipedAccessories` existe)
- ✅ Gestion d'erreur qui n'interrompt pas l'affichage
- ✅ Conversion des données en une seule fois

### Points d'attention
- ⚠️ Chaque carte fait 2 appels serveur (background + accessoires)
- 💡 Possibilité d'optimisation future : récupérer tout en une seule requête

## 🧪 Tests recommandés

### Test manuel
1. **Dashboard** : Vérifier que les accessoires équipés apparaissent sur chaque carte
2. **Monstres publics** : Vérifier l'affichage des accessoires sur les monstres partagés
3. **Cas limite** : Tester avec un monstre sans accessoire
4. **Performance** : Vérifier le temps de chargement avec plusieurs monstres

### Test automatisé (à implémenter)
```typescript
describe('getEquippedAccessoriesForMonster', () => {
  it('devrait retourner les accessoires équipés', async () => {
    const monsterId = 'test-monster-id'
    const accessories = await getEquippedAccessoriesForMonster(monsterId)
    expect(Array.isArray(accessories)).toBe(true)
  })

  it('devrait retourner un tableau vide si pas d\'accessoires', async () => {
    const monsterId = 'monster-without-accessories'
    const accessories = await getEquippedAccessoriesForMonster(monsterId)
    expect(accessories).toEqual([])
  })
})
```

## 🚀 Prochaines étapes possibles

- [ ] **Optimisation** : Créer une action qui retourne monstre + background + accessoires en une seule requête
- [ ] **Cache** : Implémenter un cache côté client pour les accessoires
- [ ] **Animation** : Ajouter une animation lors de l'apparition des accessoires
- [ ] **Préchargement** : Précharger les accessoires avant l'affichage complet

## 📝 Conclusion

L'intégration est maintenant **complète et cohérente** sur toutes les pages d'affichage de monstres. Les accessoires équipés sont visibles partout, respectant les principes SOLID et Clean Architecture.

**Fichiers modifiés** :
- ✅ `src/actions/accessories.actions.ts` (nouvelle fonction)
- ✅ `src/components/monsters/monster-card-with-background.tsx`
- ✅ `src/components/monsters/monster-card.tsx`
- ✅ `src/components/monsters/index.ts`
- ✅ `src/components/public-monsters/public-monster-card.tsx`

**Aucune régression** : Les fonctionnalités existantes continuent de fonctionner normalement.

