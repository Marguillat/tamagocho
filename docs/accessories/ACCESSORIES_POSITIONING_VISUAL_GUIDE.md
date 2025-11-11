# Guide Visuel : Comment les Accessoires Suivent le Monstre

## 🎯 Vue d'Ensemble

```
┌─────────────────────────────────────────────────────┐
│                   Canvas 160x160                     │
│                                                      │
│                                                      │
│              🎩 CHAPEAU (hat)                       │
│              ↑ bodyY - 25                           │
│                                                      │
│           ╔═══════════════╗                         │
│           ║   👁️  👁️     ║  ← 🕶️ LUNETTES          │
│           ║  🕶️SUNGLASSES ║    (bodyY + 20)         │
│           ║      😊        ║                         │
│           ║               ║                         │
│           ╚═══════════════╝  ← CORPS (bodyY)        │
│              💪    💪                                │
│              🦵    🦵                                │
│              👟    👟    ← 👟 CHAUSSURES           │
│                           (bodyY + 60)              │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## 🔄 Système de Coordonnées

### Avant le Fix ❌

```typescript
// Problème : 3 systèmes de coordonnées différents
drawAccessoryOnMonster(
  ctx, 
  config,
  80,              // ← Centre fixe X
  80,              // ← Centre fixe Y (INUTILISÉ!)
  bodyY,           // ← Position du corps (IGNORÉ!)
  pixelSize
)

// Les accessoires étaient dessinés à :
centerX = 80 + offset.x       // OK
centerY = 80 + offset.y       // ❌ Position fixe, pas d'animation!
```

**Résultat** : Les accessoires restent figés pendant que le monstre bouge.

---

### Après le Fix ✅

```typescript
// Solution : 1 système de coordonnées unifié
drawAccessoryOnMonster(
  ctx, 
  config,
  80,              // ← Centre fixe X
  bodyY,           // ← Position du corps (avec animations)
  pixelSize
)

// Les accessoires sont dessinés à :
centerX = 80 + offset.x       // Fixe horizontalement
centerY = bodyY + offset.y    // ✅ Suit bodyY qui contient toutes les animations!
```

**Résultat** : Les accessoires suivent TOUTES les transformations du monstre.

---

## 📊 Flux de Transformation

```
┌─────────────────────────────────────────────────────────────┐
│  1. Calcul de bodyY (avec animations)                       │
│     bodyY = 55 + bounce + extraBounce                        │
│                  ↓                                           │
│  2. Début du contexte transformé                             │
│     ctx.save()                                               │
│     ctx.translate(80, 80)        // Centrage                 │
│     ctx.rotate(rotation)         // Rotation                 │
│     ctx.scale(scale, scale)      // Agrandissement           │
│     ctx.translate(-80+offsetX, -80+offsetY) // Déplacement   │
│                  ↓                                           │
│  3. Dessin dans le contexte transformé                       │
│     ├─ drawBody(...)             // Corps du monstre         │
│     ├─ drawEyes(...)             // Yeux                     │
│     ├─ drawMouth(...)            // Bouche                   │
│     ├─ drawAccessoryOnMonster(ctx, hat, 80, bodyY, 6)       │
│     ├─ drawAccessoryOnMonster(ctx, sunglasses, 80, bodyY, 6)│
│     └─ drawAccessoryOnMonster(ctx, shoes, 80, bodyY, 6)     │
│                  ↓                                           │
│  4. Fin du contexte                                          │
│     ctx.restore()                                            │
└─────────────────────────────────────────────────────────────┘
```

**Clé du succès** : Les accessoires sont dessinés DANS le même `ctx.save()/ctx.restore()` que le monstre, ils héritent donc de TOUTES les transformations !

---

## 🎭 Exemples d'Animations

### Animation "feed" (saut)

```
Frame 1:  bodyY = 55        Frame 10: bodyY = 30        Frame 20: bodyY = 55
          scale = 1.0                 scale = 1.1                 scale = 1.0

    🎩                           🎩                           🎩
   👁️ 👁️                        👁️  👁️                       👁️ 👁️
   😊                           😊                           😊
   🦵🦵                          🦵  🦵                        🦵🦵
   👟👟                          👟  👟                        👟👟
  (repos)                     (saut + plus gros)            (repos)
```

**✅ Résultat** : Le chapeau, les yeux, tout suit le saut ET l'agrandissement !

---

### Animation "hug" (rotation)

```
Frame 1:         Frame 10:        Frame 20:        Frame 30:
rotation = 0°    rotation = 15°   rotation = 0°    rotation = -15°

    🎩               🎩               🎩                🎩
   👁️ 👁️            👁️👁️              👁️ 👁️             👁️👁️
   😊              😊               😊               😊
   🦵🦵             🦵🦵              🦵🦵              🦵🦵
   👟👟             👟👟              👟👟              👟👟
 (neutre)      (penché →)       (neutre)        (penché ←)
```

**✅ Résultat** : Tout tourne ensemble, le chapeau reste sur la tête !

---

### Animation "comfort" (balancement)

```
Frame 1:         Frame 10:        Frame 20:        Frame 30:
offsetX = 0      offsetX = +10    offsetX = 0      offsetX = -10

    🎩               🎩                🎩               🎩
   👁️ 👁️            👁️ 👁️             👁️ 👁️            👁️ 👁️
   😊              😊                😊              😊
   🦵🦵             🦵🦵               🦵🦵             🦵🦵
   👟👟             👟👟               👟👟             👟👟
 (centre)       (→ droite)         (centre)       (← gauche)
```

**✅ Résultat** : Tout se balance ensemble horizontalement !

---

## 🔢 Calcul des Positions

### Position Finale d'un Accessoire

```typescript
// Étape 1 : Offset relatif au type
const offset = getAccessoryPositionOffset('hat')
// → { x: 0, y: -25 }

// Étape 2 : Position sur le canvas (avant transformation)
const rawX = 80 + 0      // = 80 (centre)
const rawY = bodyY + (-25) // = bodyY - 25 (au-dessus de la tête)

// Étape 3 : Application des transformations canvas
// Ces transformations sont appliquées AUTOMATIQUEMENT par le contexte :
// - Translation vers (80, 80)
// - Rotation de `rotation` radians
// - Scale de `scale`
// - Translation de (offsetX, offsetY)

// Position finale = transformée automatiquement par canvas !
```

---

## 🎨 Z-Index (Ordre de Dessin)

```
Ordre du plus loin au plus proche :
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

10. ✨ Particules (action feedback)
9.  💫 Effets d'état (zzz, ❤️, etc.)
8.  🎩 CHAPEAU
7.  🦄 Accessoire de trait (horns, ears, tail)
6.  📡 Antennes
5.  🕶️ LUNETTES
4.  👁️😊 Visage (yeux, bouche)
3.  💪🦵 Bras et jambes
2.  ◼️ Corps du monstre
1.  👟 CHAUSSURES

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Important** : L'ordre est maintenu car tous les éléments sont dessinés dans la même boucle, dans le même contexte transformé.

---

## 🧮 Formules Clés

### bodyY (position verticale du corps)

```typescript
const bounce = Math.sin(frame * 0.05) * 3          // Bounce constant
const extraBounce = state === 'happy' 
  ? Math.abs(Math.sin(frame * 0.2)) * -8 
  : 0                                              // Bounce joyeux extra

const bodyY = 55 + bounce + extraBounce            // Position finale
```

### Offsets des Accessoires

```typescript
// Chapeau : au-dessus de la tête
hat: { x: 0, y: -25 }
→ Position: (80, bodyY - 25)

// Lunettes : au niveau des yeux  
sunglasses: { x: 0, y: 20 }
→ Position: (80, bodyY + 20)

// Chaussures : aux pieds
shoes: { x: 0, y: 60 }
→ Position: (80, bodyY + 60)
```

---

## ✅ Checklist de Bon Fonctionnement

Pour vérifier que la solution fonctionne :

1. **Rotation** 
   - [ ] Les accessoires tournent avec le monstre
   - [ ] Ils gardent leur position relative

2. **Scale**
   - [ ] Les accessoires grandissent/rétrécissent avec le monstre
   - [ ] Les proportions restent correctes

3. **Translation**
   - [ ] Les accessoires suivent tous les déplacements
   - [ ] Bounce, offsetX, offsetY sont respectés

4. **Z-Index**
   - [ ] Chapeau devant tout
   - [ ] Lunettes par-dessus le visage
   - [ ] Chaussures derrière le corps

5. **Pas de glissement**
   - [ ] Les accessoires ne se détachent jamais
   - [ ] Ils bougent comme soudés au monstre

---

## 🎓 Concepts Clés

### 1. Contexte Canvas Transformé
Le `ctx.save()` / `ctx.restore()` crée un "monde" transformé où TOUT ce qui est dessiné hérite des transformations.

### 2. Coordonnées Relatives
Les accessoires utilisent `bodyY` comme référence, pas une position absolue.

### 3. Single Source of Truth
`bodyY` contient TOUTES les informations d'animation verticale (bounce, extraBounce).

### 4. Séparation des Responsabilités
- `pixel-monster.tsx` : Gère les animations et le contexte
- `accessory-generator.service.ts` : Dessine les accessoires
- Les deux collaborent via une interface simple

---

## 📚 Documentation Associée

- [ACCESSORIES_POSITIONING_FIX_ANALYSIS.md](./ACCESSORIES_POSITIONING_FIX_ANALYSIS.md) - Analyse complète
- [ACCESSORIES_POSITIONING_FIX_SUMMARY.md](./ACCESSORIES_POSITIONING_FIX_SUMMARY.md) - Résumé rapide
- [ACCESSORIES_POSITIONING_TEST_CHECKLIST.md](./ACCESSORIES_POSITIONING_TEST_CHECKLIST.md) - Tests de validation

