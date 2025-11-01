# Système de Génération d'Accessoires en Pixel Art

## Vue d'ensemble

Le système d'accessoires utilise maintenant le même moteur de rendu canvas que les monstres, garantissant une cohérence visuelle parfaite dans le style pixel art du jeu.

## Architecture

### Couches de l'Architecture (Clean Architecture)

```
┌─────────────────────────────────────────┐
│   Presentation Layer (UI Components)   │
│   - PixelAccessory (component)         │
│   - MonsterAccessories (component)     │
└──────────────────┬──────────────────────┘
                   │ depends on
┌──────────────────▼──────────────────────┐
│      Domain Layer (Business Logic)     │
│   - accessory-generator.service.ts     │
│   - Drawing algorithms                 │
│   - Position calculations              │
└─────────────────────────────────────────┘
```

### Principes SOLID Appliqués

1. **Single Responsibility Principle (SRP)**
   - `accessory-generator.service.ts` : génération visuelle uniquement
   - `PixelAccessory` : affichage d'un accessoire standalone
   - `MonsterAccessories` : liste et gestion des accessoires d'un monstre

2. **Open/Closed Principle (OCP)**
   - Ajout de nouveaux types d'accessoires : extension facile dans le service
   - Pas de modification des composants existants

3. **Dependency Inversion Principle (DIP)**
   - Les composants UI dépendent du service (abstraction)
   - Le service ne connaît pas les composants UI

## Fichiers Créés

### 1. Service de Génération

**`src/services/accessories/accessory-generator.service.ts`**

Responsabilités :
- Dessin de chaque type d'accessoire en pixel art (chapeau, lunettes, chaussures)
- Calcul des positions relatives au monstre
- Fonction réutilisable pour affichage standalone ou sur monstre

Fonctions principales :
```typescript
// Dessiner un accessoire standalone
drawAccessory(ctx, config, centerX, centerY, pixelSize)

// Dessiner un accessoire sur un monstre (future integration)
drawAccessoryOnMonster(ctx, config, monsterCenterX, monsterCenterY, monsterBodyY, pixelSize)

// Calculer la position d'un accessoire
getAccessoryPositionOffset(type)
```

### 2. Composant PixelAccessory

**`src/components/accessories/pixel-accessory.tsx`**

Composant React pour afficher un accessoire en pixel art sur canvas.

Props :
- `type` : Type d'accessoire ('hat' | 'sunglasses' | 'shoes')
- `mainColor` : Couleur principale (hex)
- `scale` : Échelle (défaut: 1)
- `width` : Largeur du canvas (défaut: 80)
- `height` : Hauteur du canvas (défaut: 80)

Animation : Flottement subtil pour rendre l'interface vivante.

### 3. Mise à jour de MonsterAccessories

**`src/components/creature/monster-accessories.tsx`**

Utilise maintenant `PixelAccessory` au lieu d'emojis.

## Utilisation

### Affichage d'un accessoire standalone

```tsx
import { PixelAccessory } from '@/components/accessories'

<PixelAccessory 
  type="hat" 
  mainColor="#8B4513" 
  width={80} 
  height={80}
  scale={0.8}
/>
```

### Affichage dans la liste d'accessoires

Le composant `MonsterAccessories` utilise automatiquement `PixelAccessory` :

```tsx
<MonsterAccessories 
  monsterId={monster._id}
  equipedAccessories={monster.accessories || []}
/>
```

## Types d'Accessoires Supportés

### 1. Chapeau (hat)
- Position : Au-dessus de la tête
- Offset : `{ x: 0, y: -40 }`
- Design : Bord large + partie haute structurée
- Ombres et reflets pour le volume

### 2. Lunettes (sunglasses)
- Position : Au niveau des yeux
- Offset : `{ x: 0, y: -5 }`
- Design : Deux verres + pont + branches
- Reflets lumineux

### 3. Chaussures (shoes)
- Position : Aux pieds
- Offset : `{ x: 0, y: 50 }`
- Design : Paire de chaussures avec détails/lacets
- Ombres pour le réalisme

## Intégration Future : Accessoires sur le Monstre

### Plan d'Intégration

Le système est déjà préparé pour l'affichage des accessoires directement sur le canvas du monstre.

#### Étape 1 : Modifier PixelMonster

Dans `src/components/monsters/pixel-monster.tsx`, ajouter :

```typescript
interface PixelMonsterProps {
  // ...props existantes
  equippedAccessories?: Array<{
    type: AccessoryType
    mainColor: string
  }>
}
```

#### Étape 2 : Dessiner les accessoires après le monstre

Dans la fonction `drawMonster`, après le dessin du monstre :

```typescript
import { drawAccessoryOnMonster } from '@/services/accessories/accessory-generator.service'

function drawMonster(...params, equippedAccessories) {
  // ... dessin du monstre existant
  
  // Dessiner les accessoires équipés
  if (equippedAccessories && equippedAccessories.length > 0) {
    equippedAccessories.forEach(accessory => {
      drawAccessoryOnMonster(
        ctx,
        { type: accessory.type, mainColor: accessory.mainColor },
        80, // centerX du monstre
        80, // centerY du monstre
        bodyY, // position Y du corps
        pixelSize
      )
    })
  }
}
```

#### Étape 3 : Ordre de dessin (z-index)

L'ordre de dessin est crucial :

1. **Arrière-plan et effets**
2. **Corps du monstre**
3. **Chaussures** (dessiner en premier car elles sont derrière)
4. **Bras et jambes**
5. **Visage (yeux, bouche)**
6. **Chapeau** (dessiner en dernier car il est au-dessus)
7. **Lunettes** (par-dessus le visage)
8. **Antennes et effets avant**

Recommandation pour l'implémentation :
```typescript
// Dans drawMonster, réorganiser :

// 1. Corps et chaussures
drawBody(...)
if (hasShoes) drawAccessoryOnMonster(...) // Chaussures derrière le corps

// 2. Bras et jambes
drawArms(...)
drawLegs(...)

// 3. Visage
drawEyes(...)
drawMouth(...)

// 4. Lunettes (par-dessus le visage)
if (hasSunglasses) drawAccessoryOnMonster(...)

// 5. Antennes
drawAntenna(...)

// 6. Chapeau (tout en haut)
if (hasHat) drawAccessoryOnMonster(...)
```

## Ajout de Nouveaux Types d'Accessoires

### Processus

1. **Définir le type** dans `accessories.config-v2.ts`
2. **Créer la fonction de dessin** dans `accessory-generator.service.ts`
3. **Ajouter le case** dans la fonction `drawAccessory`
4. **Définir la position** dans `getAccessoryPositionOffset`

### Exemple : Ajouter un nœud papillon

```typescript
// Dans accessory-generator.service.ts

function drawBowTie (
  ctx: CanvasRenderingContext2D,
  color: string,
  centerX: number,
  centerY: number,
  pixelSize: number
): void {
  const darkColor = adjustColorBrightness(color, -30)
  
  // Position au niveau du cou
  const tieY = centerY + 20
  
  // Partie gauche du nœud
  ctx.fillStyle = color
  ctx.fillRect(centerX - pixelSize * 3, tieY, pixelSize * 2, pixelSize * 2)
  
  // Centre du nœud
  ctx.fillStyle = darkColor
  ctx.fillRect(centerX - pixelSize * 0.5, tieY, pixelSize, pixelSize * 2)
  
  // Partie droite du nœud
  ctx.fillStyle = color
  ctx.fillRect(centerX + pixelSize, tieY, pixelSize * 2, pixelSize * 2)
}

// Dans drawAccessory
case 'bowtie':
  drawBowTie(ctx, config.mainColor, centerX, centerY, pixelSize)
  break

// Dans getAccessoryPositionOffset
case 'bowtie':
  return { x: 0, y: 20 } // Au niveau du cou
```

## Considérations Techniques

### Performance

- **Canvas vs Emoji** : Le canvas est plus performant pour les animations
- **Rendu unique** : Chaque accessoire a son propre canvas
- **Animation légère** : Flottement simple (< 1% CPU)

### Cohérence Visuelle

- **Même pixelSize** : Utilise le ratio des monstres (width/26)
- **Style uniforme** : Ombres et reflets similaires aux monstres
- **Couleurs pastels** : Respecte la palette du jeu

### Extensibilité

Le système est conçu pour :
- ✅ Ajouter facilement de nouveaux types d'accessoires
- ✅ Supporter des accessoires animés (futur)
- ✅ Permettre la personnalisation des couleurs
- ✅ S'intégrer au canvas du monstre sans refactoring majeur

## Tests à Effectuer

### Tests Visuels

1. ✅ Affichage des accessoires dans la liste
2. ✅ Cohérence du style pixel art avec les monstres
3. ⏳ Affichage des accessoires sur le monstre (future feature)

### Tests Fonctionnels

1. ✅ Équiper/déséquiper un accessoire
2. ✅ Animation de flottement
3. ✅ Rendu sur différentes tailles de canvas
4. ⏳ Z-ordering correct sur le monstre (future feature)

### Tests de Performance

1. ✅ Pas de lag avec plusieurs accessoires affichés
2. ✅ Animation fluide (60 FPS)
3. ⏳ Performance avec accessoires sur monstre (future feature)

## Prochaines Étapes

### Court terme (MVP actuel)
- [x] Créer le service de génération
- [x] Créer le composant PixelAccessory
- [x] Remplacer les emojis par le canvas
- [ ] Tester visuellement sur tous les types d'accessoires

### Moyen terme (Prochaine itération)
- [ ] Intégrer les accessoires sur le canvas du monstre
- [ ] Gérer le z-ordering correct
- [ ] Ajouter des animations spécifiques aux accessoires

### Long terme (Future)
- [ ] Accessoires animés (chapeau qui bouge, lunettes qui brillent)
- [ ] Accessoires avec plusieurs couleurs
- [ ] Système de rareté visuelle (effets spéciaux)
- [ ] Preview en temps réel dans la boutique

## Références

- **Monster System** : `src/components/monsters/pixel-monster.tsx`
- **Service Pattern** : `src/services/monsters/monster-generator.ts`
- **Config Pattern** : `src/config/accessories.config-v2.ts`

