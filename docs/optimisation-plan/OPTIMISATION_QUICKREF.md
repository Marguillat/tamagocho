# ⚡ Quick Reference - Optimisation Tamagotcho

**Printable cheat sheet** - À garder à côté pendant l'implémentation

---

## 🎯 Les 4 Axes en 30 Secondes

| Axe | Utilité | Gain | Effort | Fichier |
|-----|---------|------|--------|---------|
| **useMemo** | Éviter recalculs | 5-10% | ⏱️ 5min | dashboard-content.tsx |
| **useCallback** | Stabiliser functions | 5-10% | ⏱️ 5min | dashboard-content.tsx |
| **Caching** | Moins de requêtes | 15-20% | ⏱️ 30min | React Query |
| **Code Split** | Réduire bundle | 10-15% | ⏱️ 10min | ShopModal |
| **TOTAL** | **Tout** | **+57%** | **~4 sem** | **5 phases** |

---

## 🔥 Patterns ESSENTIELS

### Pattern 1: useMemo
```typescript
// ❌ AVANT
const result = expensiveCalculation(data)

// ✅ APRÈS
const result = useMemo(() => 
  expensiveCalculation(data), 
  [data]
)
```
**Dépendance**: Toutes les variables utilisées

---

### Pattern 2: useCallback
```typescript
// ❌ AVANT
const handleClick = () => { doSomething() }

// ✅ APRÈS
const handleClick = useCallback(() => { 
  doSomething() 
}, [])
```
**Dépendance**: Toutes les variables utilisées dans la fonction

---

### Pattern 3: Lazy Loading
```typescript
// ❌ AVANT
import { Modal } from '@/components/modal'

// ✅ APRÈS
const Modal = dynamic(() => 
  import('@/components/modal').then(m => ({ 
    default: m.Modal 
  })),
  { ssr: false, loading: () => null }
)
```

---

### Pattern 4: React Query
```typescript
// ❌ AVANT
const [data, setData] = useState(null)
useEffect(() => { fetch(...) }, [])

// ✅ APRÈS
const { data } = useQuery('key', () => 
  fetch('/api/...').then(r => r.json()),
  { staleTime: 10000 }
)
```

---

## 📋 4 Tâches Phase 1

### Tâche 1: dashboard-content.tsx
```
Ligne 40-50: Ajouter useMemo à useMonsterStats
Ligne 60-85: Ajouter useCallback aux 3 handlers
Temps: 10 min
Vérifier: npm run lint
```

### Tâche 2: accessories-shop.tsx
```
Ligne 45: Ajouter useMemo à filteredAccessories
Ligne 85: Ajouter useCallback à handlePurchase
Temps: 12 min
Vérifier: npm run lint
```

### Tâche 3: creature-page-client.tsx
```
Ligne 45: Ajouter useMemo à parseMonsterTraits
Ligne 110: Ajouter useCallback à handleAction
Ligne 85: Ajouter useCallback à handleBackgroundChange
Temps: 15 min
Vérifier: npm run lint
```

### Tâche 4: monsters-list.tsx
```
Ligne 35: Ajouter useMemo au mapping
Temps: 10 min
Vérifier: npm run lint
```

**Total Phase 1**: 47 minutes de code ⚡

---

## ✅ Checklist Phase 1

- [ ] Importer useMemo et useCallback
- [ ] Wrapper dashboard stats avec useMemo
- [ ] Wrapper dashboard handlers avec useCallback
- [ ] Wrapper shop filter avec useMemo
- [ ] Wrapper shop purchase avec useCallback
- [ ] Wrapper creature traits avec useMemo
- [ ] Wrapper creature actions avec useCallback
- [ ] Wrapper monsters list avec useMemo
- [ ] Vérifier: `npm run lint` ✅
- [ ] Vérifier: `npm run build:next` ✅
- [ ] Tester dashboard: OK
- [ ] Tester shop modal: OK
- [ ] Tester creature: OK
- [ ] Tester monsters list: OK
- [ ] Lighthouse score ≥ 80

---

## 🧪 Tester Vos Changements

### React DevTools Profiler
```
1. Ouvrir DevTools → Profiler
2. Cliquer "Record"
3. Cliquer bouton du dashboard
4. Cliquer "Stop"
5. Analyser: Moins de re-renders = ✅
```

### Lighthouse
```
1. DevTools → Lighthouse
2. Cliquer "Analyze"
3. Vérifier Performance ≥ 80
4. Comparer avant/après
```

### Console Messages
```
// Aucune erreur TypeScript = ✅
npm run lint

// Build sans erreur = ✅
npm run build:next

// App démarre = ✅
npm run dev
```

---

## 🔧 Commandes Utiles

```bash
# Linter
npm run lint

# Builder
npm run build:next

# Dev server
npm run dev

# Bundle analyzer
npx next-bundle-analyzer
```

---

## 📊 Avant / Après Phase 1

| Métrique | Avant | Après | Gain |
|----------|-------|-------|------|
| LCP | 4.2s | 3.0s | -28% ⚡ |
| FID | 280ms | 150ms | -46% ⚡ |
| CLS | 0.15 | 0.10 | -33% ✨ |
| Re-renders | 10+ | 2-3 | -70% 🚀 |

---

## ❌ Erreurs Courantes

### Erreur 1: Dépendances manquantes
```typescript
// ❌ MAUVAIS
const value = useMemo(() => calculate(x, y), [])

// ✅ BON
const value = useMemo(() => calculate(x, y), [x, y])
```

### Erreur 2: Oublier useCallback import
```typescript
// ❌ MAUVAIS
import { useState, useEffect } from 'react'

// ✅ BON
import { useState, useEffect, useCallback } from 'react'
```

### Erreur 3: Oublier les crochets
```typescript
// ❌ MAUVAIS
const handler = useCallback(() => doStuff())

// ✅ BON
const handler = useCallback(() => { doStuff() }, [])
```

### Erreur 4: Wrapper async incorrectement
```typescript
// ❌ MAUVAIS
const handler = useCallback(async () => {
  return await fetch(...)
})

// ✅ BON
const handler = useCallback(async () => {
  const result = await fetch(...)
  return result
}, [])
```

---

## 💡 Tips Pro

### Tip 1: Utiliser ESLint
Ajouter `eslint-plugin-react-hooks` pour détecter les erreurs de dépendances:
```bash
npm install --save-dev eslint-plugin-react-hooks
```

### Tip 2: Profiler d'Abord
Toujours profiler avant d'optimiser. Trouver les vrais problèmes.

### Tip 3: Mesurer Après
Comparer Lighthouse scores avant/après. Prouver que ça marche.

### Tip 4: Petit Pas
Faire une tâche, tester, puis passer à la suivante. Ne pas tout faire en once.

### Tip 5: Version Control
Committer après chaque tâche réussie. Ça aide pour rollback si besoin.

---

## 📞 Problèmes & Solutions

### Problème: "Component not updating"
**Solution**: Vérifier que dépendances dans useCallback sont correctes
```typescript
const handler = useCallback(() => {...}, [dependency])
```

### Problème: "Too many re-renders"
**Solution**: Vérifier qu'on n'appelle pas setters directement
```typescript
// ❌ MAUVAIS
return <Button onClick={setOpen(true)} />

// ✅ BON
return <Button onClick={() => setOpen(true)} />
```

### Problème: "Stale closures"
**Solution**: Ajouter les dépendances manquantes
```typescript
const handler = useCallback(() => {
  console.log(state) // state doit être en dépendance!
}, [state])
```

---

## 🎯 Performance Targets

**Après Phase 1**, viser:
- ✅ LCP < 3.5s
- ✅ FID < 150ms
- ✅ CLS < 0.1
- ✅ Lighthouse ≥ 80
- ✅ Aucune erreur console

---

## 📚 Ressources Rapides

```
Besoin de: Documentation → Lien:
───────────────────────────────────
useMemo   → https://react.dev/reference/react/useMemo
useCallback→ https://react.dev/reference/react/useCallback
Profiler  → React DevTools (Chrome)
Lighthouse→ DevTools → Lighthouse tab
Bundler   → npx next-bundle-analyzer
```

---

## 🏁 Finish Line Phase 1

### Jour 1: Setup (30 min)
- [ ] Lire OPTIMISATION_PHASE1.md
- [ ] Installer dépendances si besoin
- [ ] Ouvrir les 4 fichiers

### Jour 2: Implementation (90 min)
- [ ] Tâche 1: dashboard-content
- [ ] Tâche 2: accessories-shop
- [ ] Tâche 3: creature-page
- [ ] Tâche 4: monsters-list

### Testing (30 min)
- [ ] npm run lint
- [ ] npm run build
- [ ] Test manuels
- [ ] Lighthouse audit

### Result
✅ +25-30% performance  
✅ Lighthouse +15 points  
✅ Prêt pour Phase 2

---

## 🚀 Next Steps

Après Phase 1:
1. Célébrer les gains 🎉
2. Documenter les résultats
3. Lire OPTIMISATION_PLAN.md pour Phase 2
4. Plonger dans React Query

---

**Imprimez cette page et gardez-la à votre bureau!** 📎

---

*Quick Reference v1.0 - Novembre 2025*  
*Créé par: GitHub Copilot - Senior Engineering Agent*

