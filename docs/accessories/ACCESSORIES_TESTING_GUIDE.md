# Guide de Test - Système d'Accessoires Pixel Art

## Test d'Affichage Visuel

### 1. Accéder à la page d'une créature

1. Démarrer le serveur de développement :
   ```bash
   npm run dev
   ```

2. Naviguer vers `/app/creatures/[id]` où `[id]` est l'ID d'un monstre possédant des accessoires

### 2. Vérifier l'affichage des accessoires

Dans la section "Accessoires" de la page, vous devriez voir :

✅ **Au lieu d'emojis** :
- ❌ Ancien : `🎩` `😎` `👟` (emojis)
- ✅ Nouveau : Canvas avec rendu pixel art

✅ **Caractéristiques visuelles** :
- Style pixel art cohérent avec les monstres
- Animation de flottement subtile
- Ombres et reflets sur les accessoires
- Couleurs correspondant à `mainColor`

### 3. Types d'accessoires à tester

#### Chapeau (Hat)
```
Type: hat
Position: Au-dessus (haut du canvas)
Visuel attendu:
- Bord large horizontal
- Partie haute structurée en étages
- Ombres sur le côté gauche
- Reflets sur le côté droit
```

#### Lunettes (Sunglasses)
```
Type: sunglasses
Position: Centre (niveau des yeux)
Visuel attendu:
- Deux verres rectangulaires
- Pont central entre les verres
- Branches sur les côtés
- Reflets lumineux sur les verres
```

#### Chaussures (Shoes)
```
Type: shoes
Position: En bas (pieds)
Visuel attendu:
- Paire de chaussures (gauche + droite)
- Semelles visibles
- Ombres sous les semelles
- Détails de lacets
```

### 4. Checklist de Validation Visuelle

- [ ] Les accessoires sont affichés en pixel art (pas d'emojis)
- [ ] Le style est cohérent avec le rendu des monstres
- [ ] L'animation de flottement est fluide (pas de saccades)
- [ ] Les couleurs correspondent à `mainColor` de l'accessoire
- [ ] Les ombres et reflets sont visibles
- [ ] Le canvas s'adapte à la taille du conteneur
- [ ] Pas de décalage ou de coupure dans le rendu

## Test de la Liste d'Accessoires

### 1. Monstre sans accessoire

**Attendu** :
```
┌─────────────────────────────────┐
│         👔 Accessoires 👔       │
│                                 │
│            🛍️                   │
│  Aucun accessoire pour          │
│        l'instant                │
│  Va faire un tour à la boutique!│
└─────────────────────────────────┘
```

### 2. Monstre avec accessoires

**Attendu** :
```
┌─────────────────────────────────────────┐
│           👔 Accessoires 👔             │
│         3 accessoires possédés          │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ [Canvas] Chapeau de Cowboy       │  │
│  │          🎩 Chapeau  ✓ Équipé   │  │
│  │                         [Retirer]│  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ [Canvas] Lunettes de Soleil      │  │
│  │          😎 Lunettes             │  │
│  │                         [Équiper]│  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ [Canvas] Baskets Rouges          │  │
│  │          👟 Chaussures            │  │
│  │                         [Équiper]│  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### 3. États à tester

#### État Normal (Non équipé)
- Background : Blanc
- Bordure : Grise
- Bouton : Violet-rose gradient

#### État Équipé
- Background : Vert gradient
- Bordure : Verte
- Badge "✓ Équipé" visible
- Bouton : Blanc avec texte vert

#### État Loading (Toggle en cours)
- Bouton : Gris avec spinner "⏳"
- État désactivé

## Test Fonctionnel

### 1. Équiper un accessoire

**Actions** :
1. Cliquer sur le bouton "Équiper" d'un accessoire non équipé
2. Observer le changement d'état

**Résultat attendu** :
- ✅ Le bouton affiche "⏳ ..." pendant le toggle
- ✅ L'accessoire passe en état "Équipé" (fond vert)
- ✅ Le bouton devient "✓ Retirer"
- ✅ Le badge "✓ Équipé" apparaît

### 2. Retirer un accessoire

**Actions** :
1. Cliquer sur le bouton "Retirer" d'un accessoire équipé
2. Observer le changement d'état

**Résultat attendu** :
- ✅ Le bouton affiche "⏳ ..." pendant le toggle
- ✅ L'accessoire repasse en état normal (fond blanc)
- ✅ Le bouton redevient "+ Équiper"
- ✅ Le badge "✓ Équipé" disparaît

## Test de Performance

### Vérifications

1. **Fluidité** : L'animation de flottement est à 60 FPS
2. **Pas de lag** : Affichage de 10+ accessoires sans ralentissement
3. **Responsive** : Le canvas s'adapte aux changements de taille

### Outil de test

Ouvrir la console du navigateur (F12) et vérifier :
```javascript
// Pas d'erreurs dans la console
// Pas de warnings de performance

// Vérifier les FPS (dans l'onglet Performance)
// Animation cible : 60 FPS
```

## Test de Compatibilité

### Navigateurs à tester

- [ ] Chrome (dernière version)
- [ ] Firefox (dernière version)
- [ ] Safari (dernière version)
- [ ] Edge (dernière version)

### Résolutions à tester

- [ ] Desktop : 1920x1080
- [ ] Laptop : 1366x768
- [ ] Tablet : 768x1024
- [ ] Mobile : 375x667

## Problèmes Connus et Solutions

### Le canvas n'apparaît pas

**Cause** : Le composant n'est pas importé correctement
**Solution** : Vérifier l'import dans `monster-accessories.tsx`
```tsx
import { PixelAccessory } from '@/components/accessories/pixel-accessory'
```

### L'accessoire est coupé

**Cause** : Les dimensions du canvas sont trop petites
**Solution** : Ajuster `width` et `height` dans les props
```tsx
<PixelAccessory width={80} height={80} />
```

### L'animation saccade

**Cause** : Trop d'animations simultanées
**Solution** : Utiliser `requestAnimationFrame` (déjà implémenté)

### Les couleurs ne correspondent pas

**Cause** : `mainColor` n'est pas au bon format
**Solution** : Vérifier que `mainColor` est en format `#RRGGBB`

## Rapport de Test

### Template

```markdown
# Test - Accessoires Pixel Art

**Date** : [Date]
**Testeur** : [Nom]
**Environnement** : [OS / Navigateur]

## Résultats

### Affichage Visuel
- [ ] Chapeaux : ✅ / ❌
- [ ] Lunettes : ✅ / ❌
- [ ] Chaussures : ✅ / ❌
- [ ] Animation : ✅ / ❌

### Fonctionnalités
- [ ] Équiper : ✅ / ❌
- [ ] Retirer : ✅ / ❌
- [ ] États : ✅ / ❌

### Performance
- [ ] FPS : [Valeur]
- [ ] Lag : ✅ / ❌
- [ ] Responsive : ✅ / ❌

## Bugs Trouvés
[Liste des bugs]

## Commentaires
[Observations]
```

## Commandes Utiles

```bash
# Démarrer le serveur de dev
npm run dev

# Lancer le linter
npm run lint

# Build de production
npm run build

# Nettoyer et rebuild
rm -rf .next && npm run build
```

## Prochain Test : Intégration sur le Monstre

Une fois les tests ci-dessus validés, passer au test d'intégration :
→ Voir `ACCESSORIES_PIXEL_ART_SYSTEM.md` section "Intégration Future"

