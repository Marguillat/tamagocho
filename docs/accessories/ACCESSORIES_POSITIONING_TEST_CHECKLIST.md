# Checklist de Test : Fix Positionnement des Accessoires

**Date** : 9 novembre 2025  
**Objectif** : Valider que les accessoires suivent correctement toutes les animations du monstre

---

## 🎯 Tests de Base

### ✅ Test 1 : Affichage Statique
**Scénario** : Monstre au repos avec accessoires
```typescript
<AnimatedMonster 
  state="happy" 
  traits={defaultTraits}
  level={1}
  equippedAccessories={[
    { type: 'hat', mainColor: '#FF5733' },
    { type: 'sunglasses', mainColor: '#000000' },
    { type: 'shoes', mainColor: '#8B4513' }
  ]}
/>
```

**Résultat attendu** :
- [ ] Chapeau positionné au-dessus de la tête
- [ ] Lunettes au niveau des yeux
- [ ] Chaussures aux pieds
- [ ] Z-index correct (chapeau > lunettes > corps > chaussures)
- [ ] Accessoires suivent le bounce naturel du monstre

---

## 🔄 Tests de Rotation

### ✅ Test 2 : Action "hug" (rotation excitée)
```typescript
<AnimatedMonster 
  state="happy" 
  currentAction="hug"
  equippedAccessories={[{ type: 'hat', mainColor: '#FF5733' }]}
/>
```

**Résultat attendu** :
- [ ] Le chapeau tourne AVEC le monstre (rotation synchronisée)
- [ ] Le chapeau reste attaché à la tête pendant toute la rotation
- [ ] Pas de décalage ou de glissement visible

### ✅ Test 3 : Action "wake" (secousses)
```typescript
<AnimatedMonster 
  state="sleepy" 
  currentAction="wake"
  equippedAccessories={[
    { type: 'sunglasses', mainColor: '#000000' }
  ]}
/>
```

**Résultat attendu** :
- [ ] Les lunettes suivent les secousses du monstre
- [ ] Rotation synchronisée avec le monstre
- [ ] Restent au niveau des yeux pendant tout le mouvement

---

## 📏 Tests de Scale

### ✅ Test 4 : Action "feed" (sauts avec agrandissement)
```typescript
<AnimatedMonster 
  state="hungry" 
  currentAction="feed"
  equippedAccessories={[
    { type: 'hat', mainColor: '#FF5733' },
    { type: 'shoes', mainColor: '#8B4513' }
  ]}
/>
```

**Résultat attendu** :
- [ ] Chapeau et chaussures s'agrandissent avec le monstre
- [ ] Le scale est uniforme et synchronisé
- [ ] Les accessoires reprennent leur taille normale après l'animation
- [ ] Pas de distorsion

### ✅ Test 5 : Action "hug" (pulse d'échelle)
```typescript
<AnimatedMonster 
  state="happy" 
  currentAction="hug"
  equippedAccessories={[
    { type: 'sunglasses', mainColor: '#000000' }
  ]}
/>
```

**Résultat attendu** :
- [ ] Les lunettes pulsent en synchronisation avec le monstre
- [ ] Le pulse est fluide et naturel
- [ ] Pas de saccades

---

## 📍 Tests de Translation

### ✅ Test 6 : Action "comfort" (balancement)
```typescript
<AnimatedMonster 
  state="sad" 
  currentAction="comfort"
  equippedAccessories={[
    { type: 'hat', mainColor: '#FF5733' },
    { type: 'sunglasses', mainColor: '#000000' },
    { type: 'shoes', mainColor: '#8B4513' }
  ]}
/>
```

**Résultat attendu** :
- [ ] Tous les accessoires suivent le balancement horizontal
- [ ] Le mouvement est fluide et synchronisé
- [ ] Les accessoires restent à leur position relative sur le monstre

### ✅ Test 7 : État "happy" (bounce continu)
```typescript
<AnimatedMonster 
  state="happy"
  level={5}
  equippedAccessories={[
    { type: 'hat', mainColor: '#FF5733' }
  ]}
/>
```

**Résultat attendu** :
- [ ] Le chapeau suit le bounce joyeux continu (extraBounce)
- [ ] Le mouvement vertical est fluide
- [ ] Le chapeau reste attaché pendant les sauts

---

## 🎪 Tests Combinés

### ✅ Test 8 : Tous les accessoires + animation complexe
```typescript
<AnimatedMonster 
  state="happy" 
  currentAction="hug"
  level={10}
  equippedAccessories={[
    { type: 'hat', mainColor: '#FF5733' },
    { type: 'sunglasses', mainColor: '#000000' },
    { type: 'shoes', mainColor: '#8B4513' }
  ]}
/>
```

**Résultat attendu** :
- [ ] Tous les accessoires suivent la rotation ET le scale ET la translation
- [ ] Le Z-index est respecté (chapeau devant, chaussures derrière)
- [ ] Aucun accessoire ne se détache ou ne glisse
- [ ] Les 3 accessoires bougent comme une seule entité avec le monstre

### ✅ Test 9 : Changement d'action rapide
**Actions successives** : feed → hug → comfort → wake

**Résultat attendu** :
- [ ] Les accessoires suivent chaque transition sans bug
- [ ] Pas de position incorrecte entre les transitions
- [ ] Les accessoires restent attachés pendant tout le cycle

---

## 🐛 Tests de Régression

### ✅ Test 10 : Monstre sans accessoires
```typescript
<AnimatedMonster 
  state="happy" 
  currentAction="feed"
  equippedAccessories={[]}
/>
```

**Résultat attendu** :
- [ ] Le monstre s'anime normalement
- [ ] Aucune erreur dans la console
- [ ] Les performances sont identiques

### ✅ Test 11 : Un seul accessoire
Tester séparément :
- [ ] Chapeau seul
- [ ] Lunettes seules
- [ ] Chaussures seules

**Résultat attendu** :
- [ ] Chaque accessoire fonctionne correctement en solo
- [ ] Pas d'effet de bord sur les autres éléments

---

## 🎨 Tests Visuels

### ✅ Test 12 : Différents styles de monstre
Tester avec différents `bodyStyle` :
- [ ] round + accessoires
- [ ] square + accessoires
- [ ] tall + accessoires
- [ ] wide + accessoires

**Résultat attendu** :
- [ ] Les accessoires s'adaptent à tous les styles de corps
- [ ] Le positionnement reste cohérent

### ✅ Test 13 : Différents états
Tester avec différents `state` :
- [ ] happy (bounce extra)
- [ ] sad (couleurs atténuées)
- [ ] hungry (couleurs plus vives)
- [ ] sleepy (couleurs sombres)
- [ ] angry (couleurs rougeâtres)

**Résultat attendu** :
- [ ] Les accessoires s'affichent correctement dans tous les états
- [ ] Les couleurs des accessoires ne sont pas affectées par l'état

---

## 🚀 Tests de Performance

### ✅ Test 14 : Multiple monstres avec accessoires
```typescript
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
  {Array.from({ length: 12 }).map((_, i) => (
    <AnimatedMonster 
      key={i}
      state="happy" 
      currentAction="hug"
      equippedAccessories={[
        { type: 'hat', mainColor: '#FF5733' },
        { type: 'sunglasses', mainColor: '#000000' },
        { type: 'shoes', mainColor: '#8B4513' }
      ]}
    />
  ))}
</div>
```

**Résultat attendu** :
- [ ] Animations fluides à 60 FPS
- [ ] Pas de ralentissement visible
- [ ] Utilisation CPU/GPU raisonnable

---

## ✅ Validation Finale

- [ ] **Tous les tests de base** passent (Tests 1-7)
- [ ] **Tous les tests combinés** passent (Tests 8-9)
- [ ] **Aucune régression** détectée (Tests 10-11)
- [ ] **Rendu visuel correct** (Tests 12-13)
- [ ] **Performance acceptable** (Test 14)
- [ ] **Aucune erreur console** pendant tous les tests
- [ ] **Code lint** sans erreurs bloquantes

---

## 📝 Notes

**Fichiers modifiés** :
- `src/services/accessories/accessory-generator.service.ts`
- `src/components/monsters/pixel-monster.tsx`

**Documentation** :
- [ACCESSORIES_POSITIONING_FIX_ANALYSIS.md](./ACCESSORIES_POSITIONING_FIX_ANALYSIS.md)
- [ACCESSORIES_POSITIONING_FIX_SUMMARY.md](./ACCESSORIES_POSITIONING_FIX_SUMMARY.md)

**Date de validation** : _______________  
**Validé par** : _______________

