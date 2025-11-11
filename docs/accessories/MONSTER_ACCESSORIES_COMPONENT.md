# 👔 Composant MonsterAccessories - Documentation

## 📋 Vue d'ensemble

Le composant `MonsterAccessories` affiche tous les accessoires possédés par un monstre et permet de les équiper/déséquiper via des boutons de toggle.

## 🎯 Fonctionnalités

### Affichage
- ✅ Liste tous les accessoires possédés par le monstre
- ✅ Canvas visuel avec couleur de l'accessoire
- ✅ Emoji représentatif de chaque accessoire
- ✅ Badge de type (Chapeau/Lunettes/Chaussures)
- ✅ État équipé/non équipé bien visible
- ✅ Compteur d'accessoires possédés

### Interactions
- ✅ Bouton toggle pour équiper/déséquiper
- ✅ État de chargement pendant le toggle
- ✅ Animation au hover
- ✅ Feedback visuel immédiat

### États
- ✅ État de chargement initial
- ✅ État vide (aucun accessoire)
- ✅ État avec accessoires
- ✅ État de toggle en cours

## 📦 Emplacement

```
src/components/creature/monster-accessories.tsx
```

## 🔧 Utilisation

### Dans le Code

```tsx
import { MonsterAccessories } from '@/components/creature/monster-accessories'

<MonsterAccessories 
  monsterId={monster._id}
  equipedAccessories={monster.equipedAccessories ?? []}
/>
```

### Props

```typescript
interface MonsterAccessoriesProps {
  /** ID du monstre */
  monsterId: string
  /** IDs des accessoires équipés */
  equipedAccessories: string[]
}
```

## 🎨 Design

### États Visuels

#### 1. État de Chargement
```tsx
<div className="text-center">
  <div className="text-6xl mb-4 animate-bounce">👔</div>
  <p>Chargement des accessoires...</p>
</div>
```

#### 2. État Vide
```tsx
<div className="text-center py-8">
  <div className="text-7xl mb-4">🛍️</div>
  <p>Aucun accessoire pour l'instant</p>
  <p>Va faire un tour à la boutique !</p>
</div>
```

#### 3. Accessoire Équipé
- Fond : `bg-gradient-to-r from-green-400 to-emerald-500`
- Texte : Blanc
- Badge : "✓ Équipé"
- Bouton : "✓ Retirer" (fond blanc)
- Ring : `ring-green-300`

#### 4. Accessoire Non Équipé
- Fond : `bg-white`
- Texte : Gris foncé
- Bouton : "＋ Équiper" (gradient purple-pink)
- Ring : `ring-gray-200`

### Canvas de l'Accessoire

Chaque accessoire a un canvas visuel :
```tsx
<div 
  className="w-16 h-16 rounded-xl"
  style={{
    backgroundColor: `${mainColor}15`,  // 15% opacité
    border: `2px solid ${mainColor}40`  // 40% opacité
  }}
>
  <span className="text-3xl">{emoji}</span>
</div>
```

### Badges

#### Badge de Type
```tsx
<span className="text-xs font-bold px-2 py-1 rounded-full">
  {type === 'hat' && '🎩 Chapeau'}
  {type === 'sunglasses' && '😎 Lunettes'}
  {type === 'shoes' && '👟 Chaussures'}
</span>
```

## 🔄 Flux de Données

### 1. Chargement Initial
```
MonsterAccessories monte
  ↓
useEffect() déclenché
  ↓
getAccessoriesForMonster(monsterId)
  ↓
Server action récupère les accessoires
  ↓
setState avec les accessoires
  ↓
Affichage de la liste
```

### 2. Toggle d'un Accessoire
```
Utilisateur clique "Équiper" / "Retirer"
  ↓
handleToggle(accessoryId) appelé
  ↓
setTogglingId(accessoryId)  // État de chargement
  ↓
toggleAccessoryToMonster(monsterId, accessoryId)
  ↓
Server action met à jour la DB
  ↓
Mise à jour état local (equipedAccessories)
  ↓
setTogglingId(null)  // Fin du chargement
  ↓
Affichage mis à jour
```

## 🎭 Server Actions Utilisées

### getAccessoriesForMonster
```typescript
export async function getAccessoriesForMonster(
  monsterId: string
): Promise<DBAccessory[] | void>
```

**Utilisation** : Récupérer tous les accessoires d'un monstre au chargement

### toggleAccessoryToMonster
```typescript
export async function toggleAccessoryToMonster(
  monsterId: string, 
  accessoryId: string
): Promise<void>
```

**Utilisation** : Équiper ou déséquiper un accessoire

**Logique** :
- Si l'accessoire est déjà équipé → le retirer
- Si l'accessoire n'est pas équipé → l'équiper

## 📱 Responsive

Le composant s'adapte automatiquement :
- **Mobile** : Liste verticale compacte
- **Desktop** : Liste avec plus d'espace

## ✨ Animations

### Hover
```css
hover:scale-105 hover:shadow-xl
```
Effet de "lift" au survol de chaque carte

### Toggle Button
```css
active:scale-95
```
Effet de "press" lors du clic

### Loading Spinner
```tsx
<span className="animate-spin text-lg">⏳</span>
```
Animation de chargement pendant le toggle

### Pulse Background
```css
@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}
.animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
```

## 🐛 Gestion d'Erreurs

### Chargement des Accessoires
```typescript
try {
  const result = await getAccessoriesForMonster(monsterId)
  if (result !== undefined) {
    setAccessories(result)
  }
} catch (error) {
  console.error('Erreur lors du chargement des accessoires:', error)
} finally {
  setIsLoading(false)
}
```

### Toggle
```typescript
try {
  await toggleAccessoryToMonster(monsterId, accessoryId)
  // Mise à jour état local
} catch (error) {
  console.error('Erreur lors du toggle:', error)
  // L'état local n'est pas modifié en cas d'erreur
} finally {
  setTogglingId(null)
}
```

## 🎯 États du Composant

```typescript
const [accessories, setAccessories] = useState<DBAccessory[]>([])
const [equipedAccessories, setEquipedAccessories] = useState<string[]>(initialEquipedAccessories)
const [isLoading, setIsLoading] = useState(true)
const [togglingId, setTogglingId] = useState<string | null>(null)
```

| État | Type | Description |
|------|------|-------------|
| `accessories` | `DBAccessory[]` | Liste des accessoires possédés |
| `equipedAccessories` | `string[]` | IDs des accessoires équipés |
| `isLoading` | `boolean` | Chargement initial |
| `togglingId` | `string \| null` | ID de l'accessoire en cours de toggle |

## 🔗 Intégration

Le composant est intégré dans `creature-page-client.tsx` :

```tsx
{/* Colonne droite : Statistiques + Accessoires */}
<div className='space-y-6'>
  <CreatureStatsPanel {...statsProps} />
  
  {/* Accessoires du monstre */}
  <MonsterAccessories 
    monsterId={currentMonster._id}
    equipedAccessories={currentMonster.equipedAccessories ?? []}
  />
</div>
```

## 📊 Performance

### Optimisations
- ✅ Chargement unique au montage (`useEffect`)
- ✅ État local pour éviter re-fetch après toggle
- ✅ Désactivation du bouton pendant le toggle
- ✅ Pas de re-render inutile

### Taille Mémoire
- Petit : ~5-20 accessoires max par monstre
- Pas de virtualisation nécessaire

## 🧪 Tests Recommandés

### Test 1 : État Vide
- [ ] Monstre sans accessoires
- [ ] ✅ Message "Aucun accessoire" affiché
- [ ] ✅ Lien vers la boutique suggéré

### Test 2 : Chargement
- [ ] Simuler latence réseau
- [ ] ✅ Animation de chargement visible
- [ ] ✅ Pas de flash de contenu

### Test 3 : Toggle Équipement
- [ ] Cliquer sur "Équiper"
- [ ] ✅ Bouton devient "Retirer"
- [ ] ✅ Fond devient vert
- [ ] ✅ Badge "✓ Équipé" apparaît

### Test 4 : Toggle Déséquipement
- [ ] Cliquer sur "Retirer"
- [ ] ✅ Bouton devient "Équiper"
- [ ] ✅ Fond devient blanc
- [ ] ✅ Badge "✓ Équipé" disparaît

### Test 5 : Multiple Toggles
- [ ] Équiper plusieurs accessoires rapidement
- [ ] ✅ Chaque toggle fonctionne indépendamment
- [ ] ✅ Pas de conflit d'état

## 🚀 Améliorations Futures

1. **Drag & Drop** : Glisser-déposer pour équiper
2. **Aperçu** : Voir l'accessoire sur le monstre en temps réel
3. **Filtres** : Par type, par couleur, équipés/non équipés
4. **Tri** : Par date d'achat, par type, par nom
5. **Animations** : Transition fluide équipé ↔ non équipé
6. **Confirmation** : Modal avant de retirer un accessoire
7. **Statistiques** : Nombre d'accessoires par type
8. **Collection** : Pourcentage de collection complète

## 📝 Notes Techniques

### Couleur Principale
La couleur principale de l'accessoire est utilisée avec différentes opacités :
- `15` = Fond très léger
- `40` = Bordure visible

### Configuration Catalogue
Le composant récupère les infos complètes depuis `accessoriesCatalog` :
```typescript
const config = accessoriesCatalog.find(acc => acc.type === accessory.type)
```

Cela permet d'afficher l'emoji, le nom complet, etc.

---

**Date de création** : 2025-01-11  
**Version** : 1.0.0  
**Statut** : ✅ Production Ready

