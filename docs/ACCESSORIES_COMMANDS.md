# 🛠️ Commandes & Workflows - Accessoires Pixel Art

## 🚀 Commandes de Base

### Développement

```bash
# Démarrer le serveur de développement
npm run dev

# Le serveur démarre sur http://localhost:3000
```

### Build

```bash
# Build de production
npm run build

# Build avec Turbopack (plus rapide)
npm run build
```

### Linting

```bash
# Vérifier le code
npm run lint

# Linting avec auto-fix
npm run lint -- --fix
```

---

## 🧪 Workflow de Test

### 1. Test Visuel des Accessoires

```bash
# Étape 1 : Démarrer le serveur
npm run dev

# Étape 2 : Ouvrir le navigateur
# http://localhost:3000/app/creatures/[id]

# Étape 3 : Vérifier la section "Accessoires"
# - Les accessoires doivent être en pixel art (canvas)
# - Animation de flottement visible
# - Couleurs correctes
```

### 2. Test d'Intégration

```bash
# Créer un monstre avec accessoires
# 1. Aller sur /app/dashboard
# 2. Créer un monstre
# 3. Acheter des accessoires à la boutique
# 4. Équiper les accessoires
# 5. Voir la page créature
# 6. Vérifier l'affichage pixel art
```

### 3. Test de Performance

```bash
# Dans la console du navigateur (F12)
# 1. Onglet Performance
# 2. Enregistrer pendant 5 secondes
# 3. Vérifier que les FPS sont à ~60
```

---

## 📝 Workflow de Développement

### Ajouter un Nouveau Type d'Accessoire

```bash
# Étape 1 : Définir le type dans la config
# Éditer: src/config/accessories.config.ts

# Étape 2 : Créer la fonction de dessin
# Éditer: src/services/accessories/accessory-generator.service.ts
# Ajouter: drawNewAccessoryType()

# Étape 3 : Ajouter au switch
# Dans drawAccessory(), ajouter:
# case 'newType': drawNewAccessoryType(...)

# Étape 4 : Définir la position
# Dans getAccessoryPositionOffset(), ajouter:
# case 'newType': return { x: 0, y: [offset] }

# Étape 5 : Tester
npm run dev
# Créer un accessoire du nouveau type
# Vérifier l'affichage
```

### Modifier un Accessoire Existant

```bash
# Étape 1 : Localiser la fonction
# src/services/accessories/accessory-generator.service.ts
# Fonctions: drawHat(), drawSunglasses(), drawShoes()

# Étape 2 : Modifier le dessin
# Ajuster les coordonnées, couleurs, etc.

# Étape 3 : Tester visuellement
npm run dev
# Vérifier les changements

# Étape 4 : Linter
npm run lint
```

---

## 🔧 Commandes de Débogage

### Vérifier les Erreurs TypeScript

```bash
# Compiler sans build
npx tsc --noEmit

# Vérifier un fichier spécifique
npx tsc --noEmit src/services/accessories/accessory-generator.service.ts
```

### Inspecter le Canvas

```javascript
// Dans la console du navigateur
// Sélectionner le canvas
const canvas = document.querySelector('canvas.pixel-art')

// Voir le contexte
const ctx = canvas.getContext('2d')

// Vérifier les dimensions
console.log(canvas.width, canvas.height)

// Prendre un screenshot
canvas.toDataURL() // Copier l'URL et ouvrir dans un nouvel onglet
```

### Profiler la Performance

```javascript
// Dans la console du navigateur
// Mesurer le temps de rendu
console.time('render')
// ... attendre quelques frames
console.timeEnd('render')

// Vérifier les FPS
let lastTime = performance.now()
const checkFPS = () => {
  const now = performance.now()
  const fps = 1000 / (now - lastTime)
  console.log('FPS:', fps.toFixed(2))
  lastTime = now
  requestAnimationFrame(checkFPS)
}
checkFPS()
```

---

## 📦 Workflow Git (Recommandé)

### Commiter les Changements

```bash
# Ajouter les nouveaux fichiers
git add src/services/accessories/
git add src/components/accessories/
git add docs/ACCESSORIES_*.md

# Commiter avec un message clair
git commit -m "feat: implement pixel art accessories system

- Add accessory-generator.service.ts for drawing logic
- Add PixelAccessory component for canvas rendering
- Replace emojis with pixel art in MonsterAccessories
- Add comprehensive documentation (10 docs)
- Follow SOLID and Clean Architecture principles
- Ready for future integration on monster canvas"
```

### Créer une Branche

```bash
# Créer et basculer sur une nouvelle branche
git checkout -b feature/pixel-art-accessories

# Faire les changements...
# git add, git commit

# Pousser la branche
git push origin feature/pixel-art-accessories

# Créer une Pull Request sur GitHub
```

---

## 🗂️ Workflow de Documentation

### Lire la Documentation

```bash
# Index principal
cat docs/ACCESSORIES_README.md

# Quick start
cat docs/ACCESSORIES_QUICK_START.md

# Chercher dans la doc
grep -r "drawAccessory" docs/

# Ouvrir dans un éditeur markdown
code docs/ACCESSORIES_PIXEL_ART_SYSTEM.md
```

### Mettre à Jour la Documentation

```bash
# Éditer un fichier
code docs/ACCESSORIES_PIXEL_ART_SYSTEM.md

# Vérifier le markdown (optionnel)
npm install -g markdownlint-cli
markdownlint docs/ACCESSORIES_*.md
```

---

## 🔄 Workflow de Migration

### Migrer d'Autres Composants vers Pixel Art

```bash
# Exemple : Migrer les badges, boutons, etc.

# Étape 1 : Créer un nouveau service
# Copier la structure de accessory-generator.service.ts

# Étape 2 : Créer le composant canvas
# Copier la structure de pixel-accessory.tsx

# Étape 3 : Remplacer l'ancien composant
# Importer le nouveau composant
# Remplacer les références

# Étape 4 : Documenter
# Créer COMPONENT_NAME_PIXEL_ART_SYSTEM.md

# Étape 5 : Tester
npm run dev
```

---

## 🧹 Nettoyage

### Nettoyer le Build

```bash
# Supprimer .next
rm -rf .next

# Rebuild
npm run build
```

### Nettoyer node_modules

```bash
# Supprimer node_modules
rm -rf node_modules

# Réinstaller
npm install
```

---

## 📊 Commandes de Monitoring

### Vérifier la Taille du Bundle

```bash
# Build
npm run build

# Analyser (si webpack-bundle-analyzer est installé)
npm run analyze

# Voir les fichiers statiques
ls -lh .next/static/
```

### Vérifier la Performance

```bash
# Lighthouse (dans Chrome DevTools)
# 1. Ouvrir DevTools (F12)
# 2. Onglet Lighthouse
# 3. Generate report
# 4. Vérifier les scores
```

---

## 🔍 Commandes de Recherche

### Trouver l'Utilisation d'un Composant

```bash
# Chercher PixelAccessory
grep -r "PixelAccessory" src/

# Chercher drawAccessory
grep -r "drawAccessory" src/

# Chercher imports
grep -r "from '@/components/accessories'" src/
```

### Lister les Fichiers Modifiés

```bash
# Fichiers créés/modifiés
git status

# Différences
git diff

# Logs
git log --oneline -10
```

---

## 🎯 Workflows Complets

### Workflow 1 : Développement Local

```bash
# 1. Installer les dépendances
npm install

# 2. Démarrer le serveur
npm run dev

# 3. Faire des changements dans le code
# ...

# 4. Vérifier le linting
npm run lint

# 5. Tester visuellement
# Ouvrir http://localhost:3000

# 6. Commiter
git add .
git commit -m "feat: add new feature"
```

### Workflow 2 : Test Complet

```bash
# 1. Démarrer le serveur
npm run dev

# 2. Tester visuellement
# - Créer un monstre
# - Acheter des accessoires
# - Équiper les accessoires
# - Vérifier l'affichage pixel art

# 3. Tester la performance
# - Ouvrir DevTools (F12)
# - Onglet Performance
# - Enregistrer
# - Vérifier les FPS

# 4. Tester sur différents navigateurs
# - Chrome
# - Firefox
# - Safari
# - Edge

# 5. Valider
# Remplir le template de ACCESSORIES_TESTING_GUIDE.md
```

### Workflow 3 : Déploiement

```bash
# 1. Vérifier le code
npm run lint

# 2. Build de production
npm run build

# 3. Tester le build
npm start

# 4. Commiter et pousser
git push origin main

# 5. Déployer (Vercel, etc.)
# Le déploiement se fait automatiquement via Vercel
```

---

## 💡 Astuces

### Rechargement à Chaud

```bash
# Next.js recharge automatiquement
# Mais si besoin de forcer :
# Ctrl+C puis npm run dev
```

### Clear Cache

```bash
# Supprimer le cache
rm -rf .next/cache

# Rebuild
npm run dev
```

### Debugging Canvas

```javascript
// Ajouter dans le composant
useEffect(() => {
  console.log('Canvas ref:', canvasRef.current)
  console.log('Canvas dimensions:', canvasRef.current?.width, canvasRef.current?.height)
}, [])
```

---

## 📚 Ressources

### Documentation Next.js
```bash
# Ouvrir la doc
open https://nextjs.org/docs
```

### Documentation Canvas API
```bash
# Ouvrir la doc
open https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
```

### Documentation TypeScript
```bash
# Ouvrir la doc
open https://www.typescriptlang.org/docs/
```

---

## ✅ Checklist Rapide

Avant de commiter :
- [ ] Code linté (`npm run lint`)
- [ ] Pas d'erreurs TypeScript
- [ ] Testé visuellement
- [ ] Documentation à jour
- [ ] Commit message clair

Avant de déployer :
- [ ] Build réussi (`npm run build`)
- [ ] Tests passés
- [ ] Performance validée (60 FPS)
- [ ] Testé sur plusieurs navigateurs
- [ ] Documentation complète

---

**Commandes les plus utilisées** :
1. `npm run dev` - Développement
2. `npm run lint` - Vérification
3. `npm run build` - Build
4. `git status` - État Git
5. `git diff` - Différences

**Documentation la plus utile** :
1. `ACCESSORIES_README.md` - Index
2. `ACCESSORIES_QUICK_START.md` - Quick start
3. `ACCESSORIES_TESTING_GUIDE.md` - Tests

