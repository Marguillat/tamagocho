# 🧪 Guide de Test - Composant MonsterAccessories

## 🎯 Objectif
Vérifier que le composant d'accessoires fonctionne correctement et affiche/équipe/déséquipe les accessoires comme prévu.

## 🚀 Préparation

### 1. Acheter des Accessoires
1. Lancer `npm run dev`
2. Se connecter
3. Ouvrir une créature
4. Cliquer sur "🛍️ Boutique"
5. Onglet "👒 Accessoires"
6. Acheter 3-5 accessoires différents (chapeaux, lunettes, chaussures)

### 2. Localiser le Composant
Le composant apparaît **sous le panneau de statistiques** dans la colonne de droite.

## ✅ Tests à Effectuer

### Test 1 : État Vide (Sans Accessoires)
**Quand** : Créature n'a aucun accessoire

**Vérifications** :
- [ ] ✅ Titre "👔 Accessoires 👔" visible
- [ ] ✅ Emoji 🛍️ affiché
- [ ] ✅ Message "Aucun accessoire pour l'instant"
- [ ] ✅ Texte "Va faire un tour à la boutique !"
- [ ] ✅ Design cohérent avec le reste

**Screenshot** :
```
┌─────────────────────────────────┐
│     👔 Accessoires 👔           │
│                                 │
│          🛍️                     │
│  Aucun accessoire pour          │
│  l'instant                      │
│  Va faire un tour à la boutique!│
└─────────────────────────────────┘
```

---

### Test 2 : État de Chargement
**Quand** : Le composant charge les accessoires

**Vérifications** :
- [ ] ✅ Emoji 👔 avec animation bounce
- [ ] ✅ Texte "Chargement des accessoires..."
- [ ] ✅ Pas de flash de contenu

**Note** : Peut être rapide, utiliser le throttling réseau pour voir

---

### Test 3 : Affichage des Accessoires
**Quand** : La créature possède des accessoires

**Vérifications** :
- [ ] ✅ Titre avec compteur correct : "X accessoire(s) possédé(s)"
- [ ] ✅ Chaque accessoire affiché dans une carte
- [ ] ✅ Canvas avec couleur de l'accessoire
- [ ] ✅ Emoji correct (🤠, 😎, 👟, etc.)
- [ ] ✅ Nom de l'accessoire
- [ ] ✅ Badge de type (🎩 Chapeau / 😎 Lunettes / 👟 Chaussures)
- [ ] ✅ Bouton "＋ Équiper" visible

**Exemple** :
```
┌─────────────────────────────────────┐
│  👔 Accessoires 👔                  │
│  3 accessoires possédés             │
├─────────────────────────────────────┤
│ [🤠]  Chapeau de Cowboy             │
│       🎩 Chapeau                    │
│                      [＋ Équiper]    │
├─────────────────────────────────────┤
│ [😎]  Lunettes de Soleil            │
│       😎 Lunettes                   │
│                      [＋ Équiper]    │
└─────────────────────────────────────┘
```

---

### Test 4 : Équiper un Accessoire
**Action** : Cliquer sur "＋ Équiper"

**Vérifications** :
- [ ] ✅ Bouton devient "..." avec spinner ⏳ pendant le chargement
- [ ] ✅ Après chargement :
  - [ ] Fond devient vert (gradient green-emerald)
  - [ ] Texte devient blanc
  - [ ] Badge "✓ Équipé" apparaît
  - [ ] Bouton devient "✓ Retirer" (fond blanc)
- [ ] ✅ Animation smooth (scale + shadow)
- [ ] ✅ Pas d'erreur dans la console

**Avant** :
```
┌─────────────────────────────────┐
│ [🤠] Chapeau de Cowboy          │
│      🎩 Chapeau    [＋ Équiper]  │
└─────────────────────────────────┘
```

**Après** :
```
┌─────────────────────────────────┐
│ [🤠] Chapeau de Cowboy          │
│      🎩 Chapeau  ✓ Équipé       │
│                   [✓ Retirer]   │
└─────────────────────────────────┘
     (fond vert)
```

---

### Test 5 : Déséquiper un Accessoire
**Action** : Cliquer sur "✓ Retirer" (accessoire équipé)

**Vérifications** :
- [ ] ✅ Bouton devient "..." avec spinner ⏳
- [ ] ✅ Après chargement :
  - [ ] Fond redevient blanc
  - [ ] Texte redevient gris foncé
  - [ ] Badge "✓ Équipé" disparaît
  - [ ] Bouton redevient "＋ Équiper" (fond purple-pink)
- [ ] ✅ Animation smooth
- [ ] ✅ Pas d'erreur dans la console

---

### Test 6 : Équiper Plusieurs Accessoires
**Action** : Équiper 3 accessoires différents en succession rapide

**Vérifications** :
- [ ] ✅ Chaque équipement fonctionne indépendamment
- [ ] ✅ Tous les accessoires équipés ont le fond vert
- [ ] ✅ État cohérent (pas de bug visuel)
- [ ] ✅ Chaque bouton fonctionne correctement

---

### Test 7 : Toggle Rapide
**Action** : Cliquer rapidement sur Équiper → Retirer → Équiper

**Vérifications** :
- [ ] ✅ Pas de double-click possible (bouton désactivé pendant toggle)
- [ ] ✅ État final cohérent
- [ ] ✅ Pas d'erreur dans la console
- [ ] ✅ Pas de race condition

---

### Test 8 : Hover Effects
**Action** : Survoler différents éléments

**Vérifications** :
- [ ] ✅ Carte accessoire : scale-105 + shadow augmentée
- [ ] ✅ Bouton : brightness-110 ou hover:bg-gray-100
- [ ] ✅ Transitions fluides (300ms)
- [ ] ✅ Cursor pointer sur les boutons

---

### Test 9 : Responsive Mobile
**Action** : Tester sur petit écran (< 640px)

**Vérifications** :
- [ ] ✅ Composant prend toute la largeur
- [ ] ✅ Cartes s'empilent verticalement
- [ ] ✅ Boutons restent cliquables
- [ ] ✅ Textes lisibles
- [ ] ✅ Canvas visibles

---

### Test 10 : Refresh de Page
**Action** : Équiper un accessoire, puis rafraîchir la page (F5)

**Vérifications** :
- [ ] ✅ L'accessoire est toujours équipé après refresh
- [ ] ✅ Fond vert maintenu
- [ ] ✅ Badge "✓ Équipé" présent
- [ ] ✅ État persisté en base de données

---

### Test 11 : Canvas Couleurs
**Action** : Vérifier les canvas de différents accessoires

**Vérifications** :
- [ ] ✅ Chaque canvas a une couleur unique
- [ ] ✅ Bordure visible (2px solid)
- [ ] ✅ Fond avec opacité 15%
- [ ] ✅ Emoji bien centré
- [ ] ✅ Taille 64x64px (w-16 h-16)

---

### Test 12 : Types d'Accessoires
**Action** : Acheter et afficher les 3 types

**Vérifications** :
- [ ] ✅ Chapeau → Badge "🎩 Chapeau"
- [ ] ✅ Lunettes → Badge "😎 Lunettes"
- [ ] ✅ Chaussures → Badge "👟 Chaussures"
- [ ] ✅ Emojis corrects selon le catalogue

---

### Test 13 : Intégration avec Boutique
**Scénario Complet** :
1. Ouvrir boutique
2. Acheter un accessoire
3. Fermer la boutique
4. Vérifier que l'accessoire apparaît dans la liste

**Vérifications** :
- [ ] ✅ L'accessoire apparaît immédiatement (ou après refresh)
- [ ] ✅ Compteur mis à jour
- [ ] ✅ Nouvel accessoire non équipé par défaut

---

## 🐛 Bugs Potentiels à Surveiller

### Bug 1 : État Incohérent
**Symptôme** : Accessoire affiché comme équipé mais bouton dit "Équiper"

**Solution** : Vérifier la sync entre `equipedAccessories` et l'état local

### Bug 2 : Double Toggle
**Symptôme** : Cliquer deux fois rapidement cause un bug

**Solution** : Vérifier que `togglingId` désactive bien le bouton

### Bug 3 : Accessoire Manquant
**Symptôme** : Accessoire acheté n'apparaît pas

**Solution** : 
1. Vérifier la DB : l'accessoire existe ?
2. Vérifier le `monsterId` correct
3. Refresh la page

### Bug 4 : Erreur Console
**Symptôme** : Erreur TypeScript dans la console

**Solution** : Vérifier les types `DBAccessory` et `AccessoryConfig`

---

## 📊 Résultats Attendus

### Performance
- ✅ Chargement initial < 500ms
- ✅ Toggle < 300ms
- ✅ Pas de lag au hover
- ✅ Animations fluides 60fps

### UX
- ✅ Feedback immédiat sur chaque action
- ✅ État visuel clair (équipé vs non équipé)
- ✅ Pas de confusion possible
- ✅ Messages d'aide présents

### Stabilité
- ✅ Aucun crash
- ✅ Aucune erreur console
- ✅ État persisté correctement
- ✅ Compatible tous navigateurs

---

## 📝 Checklist Finale

- [ ] Tous les tests passent ✅
- [ ] Aucun bug critique
- [ ] Performance acceptable
- [ ] UX fluide et intuitive
- [ ] Design cohérent avec l'app
- [ ] Responsive OK
- [ ] Documentation à jour

---

**Date des tests** : ___________________  
**Testeur** : ___________________  
**Version** : 1.0.0  
**Statut** : ⬜ À tester / ✅ Validé / ❌ À corriger

