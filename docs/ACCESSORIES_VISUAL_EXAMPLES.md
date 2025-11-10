# Accessoires - Exemples Visuels en Pixel Art

## Vue d'ensemble

Les accessoires sont maintenant rendus en pixel art sur canvas, dans le même style que les monstres.

## Exemples par Type

### 1. Chapeaux (Hat)

#### Structure Visuelle
```
Position: Y = centerY - 40 (au-dessus de la tête)

    ████████████        ← Haut du chapeau (4 pixels)
   ██████████████       ← Milieu (5 pixels)
  ████████████████      ← Base (6 pixels)
 ████████████████████   ← Bord (8 pixels) [mainColor]
```

#### Détails
- **Ombres** : Côté gauche (couleur - 30% luminosité)
- **Reflets** : Côté droit (couleur + 30% luminosité)
- **Style** : Structure en étages pour donner du volume

#### Couleurs d'exemple
- Cowboy : `#8B4513` (marron)
- Couronne : `#FFD700` (or)
- Casquette : `#FF0000` (rouge)
- Magicien : `#800080` (violet)
- Fête : `#FF69B4` (rose)

### 2. Lunettes (Sunglasses)

#### Structure Visuelle
```
Position: Y = centerY - 5 (niveau des yeux)

       ▐▌               ← Branche gauche
    ██████  ▄  ██████   ← Verres + pont + verres
                 ▐▌     ← Branche droite
    ↑       ↑     ↑
  Verre    Pont  Verre
  gauche         droit
```

#### Détails
- **Verres** : 3 pixels de large × 2 pixels de haut
- **Pont** : 1 pixel entre les verres
- **Branches** : 1 pixel sur les côtés
- **Reflets** : 1 pixel blanc sur chaque verre

#### Couleurs d'exemple
- Soleil : `#000000` (noir)
- Geek : `#4169E1` (bleu)
- Cœur : `#FF1493` (rose foncé)
- Étoile : `#FFD700` (or)
- 3D : `#FF0000` (rouge)

### 3. Chaussures (Shoes)

#### Structure Visuelle
```
Position: Y = centerY + 50 (aux pieds)

  ██▀           ██▀     ← Lacets/détails
  ███           ███     ← Partie haute
 ████          ████     ← Semelles
  ↑              ↑
Gauche         Droite
```

#### Détails
- **Paire** : Deux chaussures distinctes
- **Semelles** : Partie basse plus large
- **Ombres** : Sous les semelles
- **Détails** : Petits pixels pour les lacets

#### Couleurs d'exemple
- Baskets : `#FFFFFF` (blanc)
- Bottes : `#8B4513` (marron)
- Ballerines : `#FF69B4` (rose)
- Rangers : `#000000` (noir)

## Système de Couleurs

### Calcul des Ombres et Reflets

```typescript
// Couleur principale
mainColor: '#FF6B9D'

// Ombre (mainColor - 30 luminosité)
darkColor: '#CC4F7A'

// Reflet (mainColor + 30 luminosité)
lightColor: '#FF8FB0'
```

### Formule
```
RGB → (R, G, B)
Ombre → (max(0, R-30), max(0, G-30), max(0, B-30))
Reflet → (min(255, R+30), min(255, G+30), min(255, B+30))
```

## Taille et Échelle

### Canvas Standard
```
Largeur: 80px
Hauteur: 80px
Pixel Size: width / 26 ≈ 3px
```

### Canvas dans la Liste
```
Largeur: 64px
Hauteur: 64px
Scale: 0.8
```

### Canvas sur le Monstre (Future)
```
Largeur: 160px
Hauteur: 160px
Pixel Size: 6px (comme le monstre)
```

## Animation

### Flottement
```javascript
frame = 0, 1, 2, 3, ...
float = Math.sin(frame * 0.05) * 2

Résultat:
- Amplitude: ±2 pixels
- Période: ~125 frames (≈2 secondes à 60 FPS)
- Fluide et subtil
```

### Graphique de l'Animation
```
Y Position
  ↑
  │     ╱╲      ╱╲      ╱╲
  │    ╱  ╲    ╱  ╲    ╱  ╲
  │___╱____╲__╱____╲__╱____╲___ → Time
  │         ╲╱      ╲╱      ╲╱
```

## Comparaison Visuelle

### Avant (Emojis)
```
┌─────────┐
│   🎩   │  ← Emoji système (non personnalisable)
└─────────┘
```

### Après (Canvas Pixel Art)
```
┌─────────┐
│  ████   │  ← Rendu custom avec couleur personnalisée
│ ██████  │     Ombres et reflets
│████████ │     Animation fluide
└─────────┘
```

## Intégration Future : Sur le Monstre

### Vue d'Ensemble
```
     [Chapeau]           ← Dessiné EN DERNIER (dessus)
         ↓
    ┌────────┐
    │ O    O │ [Lunettes]  ← Par-dessus le visage
    │   ︶   │
    └────────┘
        │
     [Corps]             ← Dessiné EN PREMIER
        │
   [Chaussures]          ← Derrière le corps
```

### Ordre de Dessin (Z-Index)
```
1. Arrière-plan
2. Chaussures         ← Derrière
3. Corps du monstre
4. Bras et jambes
5. Visage (yeux, bouche)
6. Lunettes          ← Par-dessus le visage
7. Antennes
8. Chapeau           ← Tout au-dessus
9. Effets avant
```

### Positions Relatives
```typescript
const monsterCenter = { x: 80, y: 80 }
const monsterBodyY = 55 + bounce

// Chapeau
drawAt(x: 80, y: 80 + (-40)) = (80, 40)

// Lunettes
drawAt(x: 80, y: 80 + (-5)) = (80, 75)

// Chaussures
drawAt(x: 80, y: 80 + 50) = (80, 130)
```

## Palette de Couleurs Recommandées

### Chapeaux
```
🎩 Élégant      : #000000 (noir)
🤠 Cowboy       : #8B4513 (marron)
👑 Royal        : #FFD700 (or)
🧢 Sportif      : #FF0000 (rouge)
🎓 Académique   : #000080 (bleu marine)
```

### Lunettes
```
😎 Cool         : #000000 (noir)
🤓 Intello      : #4169E1 (bleu royal)
💖 Romantique   : #FF1493 (rose profond)
⭐ Star         : #FFD700 (or)
🌈 Arc-en-ciel  : #FF0000 (rouge)
```

### Chaussures
```
👟 Sport        : #FFFFFF (blanc)
🥾 Aventure     : #8B4513 (marron)
👠 Élégance     : #000000 (noir)
🩰 Ballet       : #FFB6C1 (rose clair)
🥿 Décontracté  : #87CEEB (bleu ciel)
```

## Tests Visuels

### Checklist Qualité
- [ ] Les pixels sont nets (pas de flou)
- [ ] Les couleurs correspondent à `mainColor`
- [ ] Les ombres sont visibles et cohérentes
- [ ] Les reflets ajoutent du volume
- [ ] L'animation est fluide (60 FPS)
- [ ] Pas de débordement du canvas
- [ ] Style cohérent avec les monstres

### Exemple de Test
```tsx
// Tester tous les types
<div style={{ display: 'flex', gap: '20px' }}>
  <PixelAccessory type="hat" mainColor="#8B4513" />
  <PixelAccessory type="sunglasses" mainColor="#000000" />
  <PixelAccessory type="shoes" mainColor="#FFFFFF" />
</div>
```

## Ressources

- **Service** : `src/services/accessories/accessory-generator.service.ts`
- **Composant** : `src/components/accessories/pixel-accessory.tsx`
- **Config** : `src/config/accessories.config.ts`
- **Documentation** : `docs/ACCESSORIES_PIXEL_ART_SYSTEM.md`

