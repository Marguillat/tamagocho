# Guide d'Intégration : Accessoires sur le Canvas du Monstre

## 🎯 Objectif

Afficher les accessoires équipés directement sur le canvas du monstre, en pixel art, avec le bon z-ordering (ordre de superposition).

## 📋 Prérequis

- [x] Service `accessory-generator.service.ts` créé
- [x] Fonction `drawAccessoryOnMonster()` disponible
- [x] Fonction `getAccessoryPositionOffset()` disponible
- [x] Types d'accessoires définis (hat, sunglasses, shoes)

## 🔧 Étapes d'Implémentation

### Étape 1 : Modifier les Types

**Fichier** : `src/types/monster.ts`

Ajouter les accessoires équipés dans l'interface du monstre :

```typescript
import type { AccessoryType } from '@/config/accessories.config'

export interface DBMonster {
  // ...existing fields
  accessories?: string[] // IDs des accessoires équipés
  accessoriesData?: Array<{  // Données complètes pour le rendu
    type: AccessoryType
    mainColor: string
  }>
}
```

### Étape 2 : Modifier PixelMonster

**Fichier** : `src/components/monsters/pixel-monster.tsx`

#### 2.1 Importer le Service

```typescript
import { 
  drawAccessoryOnMonster, 
  getAccessoryPositionOffset 
} from '@/services/accessories/accessory-generator.service'
import type { AccessoryType } from '@/config/accessories.config'
```

#### 2.2 Ajouter les Props

```typescript
interface PixelMonsterProps {
  state: MonsterState
  traits?: MonsterTraits
  level?: number
  currentAction?: MonsterAction
  // NOUVEAU : Accessoires équipés
  equippedAccessories?: Array<{
    type: AccessoryType
    mainColor: string
  }>
}
```

#### 2.3 Passer les Accessoires à drawMonster

```typescript
export function PixelMonster ({
  state,
  traits = defaultTraits,
  level = 1,
  currentAction = null,
  equippedAccessories = [] // NOUVEAU
}: PixelMonsterProps): React.ReactNode {
  // ...existing code

  const animate = (): void => {
    frameRef.current += 1
    // ...
    drawMonster(
      ctx, 
      state, 
      frameRef.current, 
      traits, 
      level, 
      currentActionRef.current, 
      actionFrameRef.current, 
      particlesRef.current,
      equippedAccessories // NOUVEAU
    )
    // ...
  }
}
```

### Étape 3 : Modifier la Fonction drawMonster

**Fichier** : `src/components/monsters/pixel-monster.tsx`

#### 3.1 Ajouter le Paramètre

```typescript
function drawMonster (
  ctx: CanvasRenderingContext2D,
  state: MonsterState,
  frame: number,
  traits: MonsterTraits,
  level: number,
  currentAction: MonsterAction,
  actionFrame: number,
  particles: Particle[],
  equippedAccessories: Array<{ type: AccessoryType, mainColor: string }> = [] // NOUVEAU
): void {
  // ...existing code
}
```

#### 3.2 Réorganiser l'Ordre de Dessin avec Z-Ordering

```typescript
function drawMonster (
  ctx: CanvasRenderingContext2D,
  state: MonsterState,
  frame: number,
  traits: MonsterTraits,
  level: number,
  currentAction: MonsterAction,
  actionFrame: number,
  particles: Particle[],
  equippedAccessories: Array<{ type: AccessoryType, mainColor: string }> = []
): void {
  const pixelSize = 6
  const bounce = Math.sin(frame * 0.05) * 3
  // ...existing animation code

  ctx.clearRect(0, 0, 160, 160)

  // Variables de transformation
  ctx.save()
  ctx.translate(80, 80)
  ctx.rotate(rotation)
  ctx.scale(scale, scale)
  ctx.translate(-80 + offsetX, -80 + offsetY)

  // ...existing color adjustments

  const bodyY = 55 + bounce + extraBounce

  // ============ ORDRE DE DESSIN (Z-INDEX) ============
  
  // 1. ARRIÈRE-PLAN : Chaussures (derrière le corps)
  const shoesAccessory = equippedAccessories.find(acc => acc.type === 'shoes')
  if (shoesAccessory) {
    const offset = getAccessoryPositionOffset('shoes')
    drawAccessoryOnMonster(
      ctx,
      { type: 'shoes', mainColor: shoesAccessory.mainColor },
      80,
      80,
      bodyY,
      pixelSize
    )
  }

  // 2. CORPS DU MONSTRE
  drawBody(ctx, traits.bodyStyle, bodyColor, accentColor, bodyY, pixelSize)

  // 3. BRAS ET JAMBES
  const armWave = Math.sin(frame * 0.1) * 5
  ctx.fillStyle = bodyColor
  // Bras gauche
  ctx.fillRect(33, bodyY + 30 + armWave, pixelSize, pixelSize * 3)
  ctx.fillRect(27, bodyY + 33 + armWave, pixelSize, pixelSize * 2)
  // Bras droit
  ctx.fillRect(123, bodyY + 30 - armWave, pixelSize, pixelSize * 3)
  ctx.fillRect(129, bodyY + 33 - armWave, pixelSize, pixelSize * 2)
  // Jambes
  ctx.fillRect(57, bodyY + 54, pixelSize * 3, pixelSize * 2)
  ctx.fillRect(105, bodyY + 54, pixelSize * 3, pixelSize * 2)

  // 4. VISAGE (yeux, bouche)
  drawEyes(ctx, traits.eyeStyle, traits.eyeColor, state, bodyY, pixelSize, frame)
  drawMouth(ctx, state, traits.eyeColor, traits.cheekColor, bodyY, pixelSize, frame)

  // 5. LUNETTES (par-dessus le visage)
  const sunglassesAccessory = equippedAccessories.find(acc => acc.type === 'sunglasses')
  if (sunglassesAccessory) {
    const offset = getAccessoryPositionOffset('sunglasses')
    drawAccessoryOnMonster(
      ctx,
      { type: 'sunglasses', mainColor: sunglassesAccessory.mainColor },
      80,
      80,
      bodyY,
      pixelSize
    )
  }

  // 6. ANTENNES
  drawAntenna(ctx, traits.antennaStyle, traits.antennaColor, traits.bobbleColor, bodyY, pixelSize, frame)

  // 7. ACCESSOIRE DU TRAIT (existant - si différent des équipés)
  drawAccessory(ctx, traits.accessory, traits.accentColor, bodyY, pixelSize, frame)

  // 8. CHAPEAU (tout au-dessus)
  const hatAccessory = equippedAccessories.find(acc => acc.type === 'hat')
  if (hatAccessory) {
    const offset = getAccessoryPositionOffset('hat')
    drawAccessoryOnMonster(
      ctx,
      { type: 'hat', mainColor: hatAccessory.mainColor },
      80,
      80,
      bodyY,
      pixelSize
    )
  }

  // 9. EFFETS D'ÉTAT (devant tout)
  drawStateEffects(ctx, state, bodyY, pixelSize, frame)

  ctx.restore()

  // 10. PARTICULES (encore plus devant)
  if (currentAction !== null && particles.length > 0) {
    drawParticles(ctx, particles, actionFrame)
  }

  // 11. FOND LUMINEUX D'ACTION
  if (currentAction !== null && actionFrame < 150) {
    drawActionBackground(ctx, currentAction, actionFrame)
  }
}
```

### Étape 4 : Récupérer les Données d'Accessoires

**Fichier** : Composant parent utilisant PixelMonster

#### 4.1 Dans CreatureMonsterDisplay ou similaire

```typescript
'use client'

import { useState, useEffect } from 'react'
import { PixelMonster } from '@/components/monsters/pixel-monster'
import { getAccessoriesForMonster } from '@/actions/accessories.actions'
import { accessoriesCatalog } from '@/config/accessories.config'
import type { AccessoryType } from '@/config/accessories.config'
import type { DBMonster } from '@/types/monster'

export function CreatureMonsterDisplay ({ monster }: { monster: DBMonster }) {
  const [equippedAccessories, setEquippedAccessories] = useState<Array<{
    type: AccessoryType
    mainColor: string
  }>>([])

  useEffect(() => {
    const loadAccessories = async () => {
      try {
        // Récupérer les accessoires du monstre
        const accessories = await getAccessoriesForMonster(monster._id)
        
        // Filtrer uniquement les équipés
        const equipped = accessories.filter(acc => 
          monster.accessories?.includes(acc._id)
        )

        // Convertir en format pour le rendu
        const accessoriesData = equipped.map(acc => {
          const config = accessoriesCatalog.find(c => c.type === acc.type)
          return {
            type: acc.type as AccessoryType,
            mainColor: acc.mainColor ?? config?.mainColor ?? '#CCC'
          }
        })

        setEquippedAccessories(accessoriesData)
      } catch (error) {
        console.error('Erreur lors du chargement des accessoires:', error)
      }
    }

    void loadAccessories()
  }, [monster._id, monster.accessories])

  return (
    <PixelMonster
      state={monster.state}
      traits={parseMonsterTraits(monster.traits)}
      level={monster.level}
      equippedAccessories={equippedAccessories}
    />
  )
}
```

### Étape 5 : Gérer les Positions Dynamiques

Pour des positions qui s'adaptent aux animations du monstre :

```typescript
// Dans drawMonster, après calcul du bodyY

// Position de base
const baseX = 80
const baseY = 80

// Ajustement selon l'animation
const adjustedY = baseY + bounce + extraBounce

// Dessiner avec position ajustée
if (hatAccessory) {
  drawAccessoryOnMonster(
    ctx,
    { type: 'hat', mainColor: hatAccessory.mainColor },
    baseX,
    adjustedY, // Position ajustée avec l'animation
    bodyY,
    pixelSize
  )
}
```

## 🎨 Considérations de Design

### Z-Ordering (Ordre de Superposition)

**Règle générale** : Du plus loin au plus proche

```
Arrière-plan
    ↓
Chaussures (sol)
    ↓
Corps
    ↓
Bras/Jambes
    ↓
Visage
    ↓
Lunettes (sur le visage)
    ↓
Antennes
    ↓
Chapeau (au-dessus de tout)
    ↓
Effets/Particules
```

### Gestion des Conflits

**Problème** : Trait `accessory` vs accessoires équipés

**Solution** : Priorité aux accessoires équipés
```typescript
// Option 1 : Ignorer le trait si accessoire équipé
if (!equippedAccessories.some(acc => acc.type === 'hat')) {
  drawAccessory(ctx, traits.accessory, traits.accentColor, bodyY, pixelSize, frame)
}

// Option 2 : Dessiner les deux (peut créer un style unique)
drawAccessory(ctx, traits.accessory, traits.accentColor, bodyY, pixelSize, frame)
// puis les équipés par-dessus
```

### Animation Synchronisée

Les accessoires doivent suivre l'animation du monstre :

```typescript
// Bounce du corps
const bodyY = 55 + bounce + extraBounce

// Position des accessoires suit le bounce
drawAccessoryOnMonster(ctx, config, 80, 80, bodyY, pixelSize)
// La fonction getAccessoryPositionOffset() est appelée à l'intérieur
// et utilise bodyY pour calculer la position relative
```

## 🧪 Tests

### Checklist de Validation

- [ ] Les accessoires apparaissent au bon endroit
- [ ] Le z-ordering est correct (chapeau au-dessus, chaussures dessous)
- [ ] Les accessoires suivent l'animation du monstre
- [ ] Pas de décalage ou de coupure
- [ ] Les couleurs sont correctes
- [ ] Performance maintenue (60 FPS)
- [ ] Fonctionne sur tous les états (happy, sad, hungry, etc.)
- [ ] Fonctionne avec toutes les actions (feed, comfort, hug, wake)

### Test Visuel

1. **Équiper un chapeau** → Doit apparaître au-dessus de la tête
2. **Équiper des lunettes** → Doivent être sur le visage
3. **Équiper des chaussures** → Doivent être aux pieds
4. **Équiper les 3** → Tous doivent être visibles et bien positionnés
5. **Changer l'état** → Les accessoires suivent les animations

### Test de Performance

```javascript
// Dans la console
// Vérifier que le FPS reste à 60 avec 3 accessoires
performance.now() // avant
// ...attendre plusieurs frames
performance.now() // après
// Delta devrait être ~16ms par frame (60 FPS)
```

## 🐛 Résolution de Problèmes

### Accessoire mal positionné

**Cause** : Offset incorrect
**Solution** : Ajuster dans `getAccessoryPositionOffset()`

### Accessoire coupé

**Cause** : Dessin hors du canvas après transformation
**Solution** : Vérifier les `ctx.save()` / `ctx.restore()`

### Z-ordering incorrect

**Cause** : Ordre de dessin inversé
**Solution** : Réordonner les appels de dessin dans `drawMonster()`

### Performance dégradée

**Cause** : Trop de redessins ou calculs complexes
**Solution** : Profiler et optimiser les calculs répétitifs

## 📝 Exemple Complet

Voir le code complet dans :
- `src/components/monsters/pixel-monster.tsx` (après modification)
- `src/components/creature/creature-monster-display.tsx` (exemple d'usage)

## 🎉 Résultat Attendu

Après implémentation :
- ✅ Accessoires visibles sur le monstre
- ✅ Style pixel art cohérent
- ✅ Animation fluide et synchronisée
- ✅ Z-ordering correct
- ✅ Performance maintenue
- ✅ Expérience utilisateur améliorée

## 🔄 Prochaines Étapes

Après l'intégration de base :
1. Accessoires animés (mouvements propres)
2. Effets spéciaux (brillance, particules)
3. Optimisation de la performance
4. Tests utilisateur
5. Ajout de nouveaux types d'accessoires

