# 🚀 Quêtes Journalières - Quick Start

## ⚡ Installation (Déjà fait !)

Tous les fichiers sont en place. Aucune installation supplémentaire nécessaire.

---

## 📂 Fichiers Créés

```
✅ src/config/quests.config.ts
✅ src/db/models/daily-quest.model.ts
✅ src/services/quests/daily-quests.service.ts
✅ src/app/api/quests/daily/route.ts
✅ src/app/api/quests/claim-bonus/route.ts
✅ src/app/api/cron/reset-quests/route.ts
✅ src/hooks/use-daily-quests.ts
✅ src/components/quests/daily-quests-section.tsx
✅ src/components/quests/quest-card.tsx
✅ src/components/quests/quest-stats-display.tsx
✅ src/components/quests/index.ts
✅ docs/DAILY_QUESTS_SYSTEM.md
✅ vercel.json (mis à jour)
```

---

## 🎯 Comment ça marche ?

### 1. L'utilisateur se connecte
→ Le dashboard affiche **3 quêtes du jour**

### 2. L'utilisateur effectue des actions
- Nourrit un monstre → ✅ Quête "Nourrir" progresse
- Achète un accessoire → ✅ Quête "Acheter" progresse
- Rend un monstre public → ✅ Quête "Partager" progresse

### 3. Quête complétée
→ 🎉 Animation de complétion
→ 💰 Koins ajoutés automatiquement au wallet

### 4. Toutes les quêtes complétées
→ 🏆 Bouton "Réclamer le bonus"
→ 💎 +50 Koins supplémentaires

### 5. À minuit (00:00)
→ 🔄 Renouvellement automatique
→ ✨ 3 nouvelles quêtes générées

---

## 🧪 Test Rapide

### 1. Démarrer l'application

```bash
npm run dev
```

### 2. Se connecter et aller sur le dashboard

```
http://localhost:3000/app
```

### 3. Voir les quêtes

Vous devriez voir une section "Quêtes du jour" avec 3 quêtes.

### 4. Tester une action

- Cliquer sur un monstre
- Cliquer sur "Nourrir" 5 fois
- Retourner au dashboard
- ✅ La quête "Nourrir ses monstres" devrait progresser

### 5. Compléter toutes les quêtes

- Effectuer les actions requises
- Un bouton "Réclamer" apparaît
- Cliquer dessus pour gagner le bonus

---

## 🔧 Configuration Vercel Cron

### 1. Déployer sur Vercel

```bash
git add .
git commit -m "feat: add daily quests system"
git push
```

### 2. Ajouter la variable d'environnement

Dans Vercel Dashboard :
1. Aller dans **Settings** → **Environment Variables**
2. Ajouter :
   - **Name**: `CRON_SECRET_TOKEN`
   - **Value**: `your-secret-token-here` (générer un token sécurisé)
3. Sauvegarder

### 3. Vérifier le Cron

- Aller dans **Deployments** → **Cron Jobs**
- Vérifier que `/api/cron/reset-quests` est listé
- Schedule: `0 0 * * *` (tous les jours à minuit)

---

## 🎨 Personnalisation

### Ajouter une nouvelle quête

Dans `src/config/quests.config.ts` :

```typescript
{
  id: 'my_new_quest',
  title: 'Ma nouvelle quête',
  description: 'Fais quelque chose d\'incroyable',
  reward: 100,
  targetCount: 1,
  icon: '🎁'
}
```

### Changer le nombre de quêtes par jour

Dans `src/config/quests.config.ts` :

```typescript
export const QUEST_SYSTEM_CONFIG = {
  DAILY_QUESTS_COUNT: 5, // Au lieu de 3
  // ...
}
```

### Changer le bonus de complétion

```typescript
export const QUEST_SYSTEM_CONFIG = {
  // ...
  COMPLETE_ALL_BONUS: 100 // Au lieu de 50
}
```

---

## 📊 Vérifier les Données

### MongoDB Compass

Connectez-vous à votre base MongoDB et vérifiez la collection :

```
Collection: userdailyquests
```

Vous devriez voir :
- Un document par utilisateur
- Les 3 quêtes du jour
- La progression
- Les statistiques

---

## 🐛 Dépannage

### Les quêtes n'apparaissent pas

**Solution** :
1. Vérifier que vous êtes connecté
2. Ouvrir la console du navigateur
3. Vérifier les erreurs
4. Vérifier que MongoDB est connecté

### La progression ne se met pas à jour

**Solution** :
1. Recharger la page
2. Vérifier les logs dans la console
3. Vérifier que `checkAndUpdateQuest()` est appelé dans l'action

### Le cron ne fonctionne pas

**Solution** :
1. Vérifier que `CRON_SECRET_TOKEN` est défini dans Vercel
2. Vérifier les logs Vercel
3. Tester manuellement : `curl https://votre-app.vercel.app/api/cron/reset-quests`

---

## ✅ Checklist de Vérification

- [ ] Les quêtes apparaissent dans le dashboard
- [ ] Les quêtes progressent quand on effectue des actions
- [ ] Les Koins sont ajoutés quand une quête est complétée
- [ ] Le bonus peut être réclamé après toutes les quêtes
- [ ] Les statistiques s'affichent correctement
- [ ] Le renouvellement fonctionne (attendre minuit ou tester l'API)

---

## 🎉 Félicitations !

Votre système de quêtes journalières est opérationnel ! 🚀

Les utilisateurs peuvent maintenant :
- ✅ Compléter des quêtes quotidiennes
- 💰 Gagner des Koins
- 🔥 Maintenir une série de jours consécutifs
- 📊 Suivre leurs statistiques

---

## 📚 Documentation Complète

Pour plus de détails, consultez :
- 📖 `docs/DAILY_QUESTS_SYSTEM.md` - Documentation complète
- 🔧 `src/config/quests.config.ts` - Configuration
- 🧪 Tests et intégration

---

**Bon jeu ! 🎮**

