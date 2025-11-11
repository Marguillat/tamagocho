# 🎯 Système de Quêtes Journalières - Guide Complet

## 📋 Vue d'ensemble

Le système de quêtes journalières offre aux utilisateurs **3 quêtes quotidiennes uniques** qui se renouvellent automatiquement à minuit. Chaque quête complétée rapporte des **Koins** et suit la progression en temps réel.

---

## ✨ Fonctionnalités

### 1. Quêtes du Jour
- ✅ **3 quêtes journalières** uniques par utilisateur
- ✅ **Renouvellement automatique** à minuit (00:00)
- ✅ **Récompenses en Koins** pour chaque quête complétée
- ✅ **Système de progression** en temps réel
- ✅ **Bonus de complétion** : +50 Koins pour avoir complété toutes les quêtes du jour

### 2. Types de Quêtes Disponibles

| Quête | Description | Objectif | Récompense |
|-------|-------------|----------|------------|
| 🍖 Nourrir ses monstres | Nourris ton monstre plusieurs fois | 5 fois | 20 Koins |
| ⬆️ Faire évoluer | Fais évoluer un monstre d'un niveau | 1 fois | 50 Koins |
| 🎮 Interagir | Interagis avec plusieurs monstres | 3 fois | 30 Koins |
| 🛍️ Acheter un accessoire | Achète dans la boutique | 1 fois | 40 Koins |
| 🌍 Partager un monstre | Rends un monstre public | 1 fois | 15 Koins |
| 🎯 Atteindre un niveau | Fais atteindre le niveau 3 | Niveau 3 | 35 Koins |
| 💰 Collectionneur de Koins | Gagne des Koins | 50 Koins | 25 Koins |
| 👔 Équiper des accessoires | Équipe des accessoires | 2 fois | 20 Koins |
| 🖼️ Changer le fond | Change le fond d'écran | 1 fois | 15 Koins |

### 3. Système de Statistiques

Le système suit pour chaque utilisateur :
- 📊 **Nombre total de quêtes complétées**
- 💰 **Total de Koins gagnés via les quêtes**
- 🔥 **Série actuelle** (jours consécutifs de complétion)
- ⭐ **Meilleure série** (record personnel)

---

## 🏗️ Architecture

### Structure des Fichiers

```
src/
├── config/
│   └── quests.config.ts              # Configuration des quêtes
├── db/
│   └── models/
│       └── daily-quest.model.ts      # Modèle MongoDB
├── services/
│   └── quests/
│       └── daily-quests.service.ts   # Logique métier
├── app/
│   └── api/
│       ├── quests/
│       │   ├── daily/route.ts        # GET quêtes
│       │   └── claim-bonus/route.ts  # POST bonus
│       └── cron/
│           └── reset-quests/route.ts # Renouvellement
├── components/
│   └── quests/
│       ├── daily-quests-section.tsx  # Composant principal
│       ├── quest-card.tsx            # Carte de quête
│       └── quest-stats-display.tsx   # Statistiques
└── hooks/
    └── use-daily-quests.ts           # Hook React
```

### Flux de Données

```
┌─────────────────┐
│   Dashboard     │
│   Component     │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ useDailyQuests  │ ← Hook React
│     Hook        │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  API Routes     │
│ /api/quests/*   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Quest Service   │ ← Logique métier
│  (Service)      │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│    MongoDB      │
│ UserDailyQuests │
└─────────────────┘
```

---

## 🔧 Configuration

### quests.config.ts

Ce fichier centralise **toute la configuration** des quêtes :

```typescript
// Types de quêtes disponibles
export type QuestType =
  | 'feed_monster'
  | 'evolve_monster'
  | 'interact_with_monsters'
  // ... autres types

// Configuration de chaque quête
export const AVAILABLE_QUESTS: QuestConfig[] = [
  {
    id: 'feed_monster',
    title: 'Nourrir ses monstres',
    description: 'Nourris 5 fois ton monstre aujourd\'hui',
    reward: 20,
    targetCount: 5,
    icon: '🍖'
  },
  // ... autres quêtes
]

// Paramètres système
export const QUEST_SYSTEM_CONFIG = {
  DAILY_QUESTS_COUNT: 3,        // Nombre de quêtes par jour
  RESET_HOUR: 0,                 // Heure de renouvellement (minuit)
  COMPLETE_ALL_BONUS: 50         // Bonus de complétion totale
}
```

---

## 💾 Modèle de Données

### UserDailyQuests Schema

```typescript
{
  ownerId: ObjectId,              // Référence à l'utilisateur
  currentDate: String,            // Format YYYY-MM-DD
  quests: [
    {
      questType: String,          // Type de quête
      currentProgress: Number,    // Progression actuelle
      targetCount: Number,        // Objectif
      reward: Number,             // Koins à gagner
      completed: Boolean,         // État
      completedAt: Date           // Date de complétion
    }
  ],
  allCompleted: Boolean,          // Toutes complétées ?
  bonusClaimed: Boolean,          // Bonus réclamé ?
  stats: {
    totalQuestsCompleted: Number,
    totalKoinsEarned: Number,
    currentStreak: Number,
    longestStreak: Number
  }
}
```

---

## 🔄 Renouvellement Automatique

### Option 1 : Vercel Cron (Recommandé)

Configuration dans `vercel.json` :

```json
{
  "crons": [
    {
      "path": "/api/cron/reset-quests",
      "schedule": "0 0 * * *"
    }
  ]
}
```

- **Fréquence** : Tous les jours à minuit (00:00)
- **Endpoint** : `/api/cron/reset-quests`
- **Sécurité** : Token secret via `CRON_SECRET_TOKEN`

### Option 2 : Renouvellement côté client

Les quêtes se régénèrent automatiquement lors de la première visite après minuit grâce à la fonction `getUserDailyQuests()` qui vérifie la date.

---

## 🎮 Intégration dans les Actions

### Mise à jour automatique des quêtes

Le système s'intègre dans les actions existantes via `checkAndUpdateQuest()` :

```typescript
// Dans monsters.actions.ts
if (action === 'feed') {
  await checkAndUpdateQuest(user.id, 'feed_monster', 1)
}

// Dans accessories.actions.ts
await checkAndUpdateQuest(session.user.id, 'buy_accessory', 1)

// Dans backgrounds.actions.ts
await checkAndUpdateQuest(session.user.id, 'change_background', 1)
```

### Points d'intégration

| Action | Fichier | Quête déclenchée |
|--------|---------|------------------|
| Nourrir monstre | `monsters.actions.ts` | `feed_monster` |
| Monstre level up | `monsters.actions.ts` | `evolve_monster` |
| Interaction | `monsters.actions.ts` | `interact_with_monsters` |
| Acheter accessoire | `accessories.actions.ts` | `buy_accessory` |
| Équiper accessoire | `accessories.actions.ts` | `equip_accessory` |
| Changer background | `backgrounds.actions.ts` | `change_background` |
| Rendre public | `monsters.actions.ts` | `make_monster_public` |

---

## 🎨 Interface Utilisateur

### DailyQuestsSection

Le composant principal affiche :

1. **Header avec titre et icône** 🏆
2. **Grille de 3 cartes de quêtes**
3. **Chaque carte contient :**
   - Icône de la quête
   - Titre et description
   - Barre de progression animée
   - Récompense en Koins
   - Badge "Complété" si applicable

4. **Bonus de complétion** (si toutes les quêtes sont faites)
5. **Panneau de statistiques** avec 4 métriques

### Animations

- ✨ **Badge "Complété"** avec animation bounce
- 📊 **Barre de progression** avec transition fluide
- 🎉 **Notification de gain** en haut à droite
- 🌈 **Effets hover** sur les cartes

---

## 📊 API Endpoints

### GET `/api/quests/daily`

Récupère les quêtes du jour de l'utilisateur connecté.

**Réponse** :
```json
{
  "quests": [...],
  "allCompleted": false,
  "bonusClaimed": false,
  "stats": {
    "totalQuestsCompleted": 12,
    "totalKoinsEarned": 350,
    "currentStreak": 3,
    "longestStreak": 5
  },
  "currentDate": "2025-11-08"
}
```

### POST `/api/quests/claim-bonus`

Réclame le bonus de complétion totale.

**Réponse** :
```json
{
  "success": true,
  "bonus": 50,
  "message": "Félicitations ! Vous avez gagné 50 Koins bonus !"
}
```

### GET/POST `/api/cron/reset-quests`

Endpoint de cron pour renouveler les quêtes (usage interne).

---

## 🧪 Tests

### Test Manuel

1. **Créer un utilisateur** et se connecter
2. **Vérifier les quêtes** dans le dashboard
3. **Effectuer une action** (nourrir un monstre)
4. **Recharger la page** et vérifier la progression
5. **Compléter les 3 quêtes**
6. **Réclamer le bonus**

### Test du Renouvellement

```bash
# Test local du cron
curl http://localhost:3000/api/cron/reset-quests

# Test avec token
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:3000/api/cron/reset-quests
```

---

## 🔒 Sécurité

### Variables d'Environnement

```env
CRON_SECRET_TOKEN=your-secret-token-here
```

### Protection des Endpoints

- ✅ Authentification requise pour `/api/quests/*`
- ✅ Token secret pour `/api/cron/reset-quests`
- ✅ Validation de propriété (userId)

---

## 🚀 Déploiement

### Étapes

1. **Pusher le code** sur GitHub
2. **Vercel déploiera automatiquement**
3. **Ajouter la variable d'environnement** `CRON_SECRET_TOKEN` dans Vercel
4. **Vérifier les logs** du cron dans Vercel Dashboard

### Vérification

- Dashboard Vercel → Cron Jobs
- Logs → Rechercher `[CRON-RESET-QUESTS]`

---

## 🎯 Principes SOLID Appliqués

### Single Responsibility Principle (SRP)
- ✅ `quests.config.ts` : Configuration uniquement
- ✅ `daily-quests.service.ts` : Logique métier
- ✅ `quest-card.tsx` : Affichage d'une carte
- ✅ `use-daily-quests.ts` : Gestion d'état

### Open/Closed Principle (OCP)
- ✅ Ajout de nouvelles quêtes sans modifier le code existant
- ✅ Extension via `AVAILABLE_QUESTS`

### Dependency Inversion Principle (DIP)
- ✅ Les composants dépendent du hook `useDailyQuests`
- ✅ Le service dépend des abstractions (types)

---

## 📈 Améliorations Futures

### Idées
- 🎁 Quêtes hebdomadaires avec récompenses premium
- 🏆 Classement des joueurs
- 🎨 Quêtes spéciales événementielles
- 💎 Badges de réussite
- 📱 Notifications push pour les quêtes

---

## 🐛 Dépannage

### Les quêtes ne se mettent pas à jour

➡️ Vérifier que `checkAndUpdateQuest()` est appelé dans l'action

### Le renouvellement ne fonctionne pas

➡️ Vérifier les logs Vercel Cron
➡️ Vérifier que `CRON_SECRET_TOKEN` est défini

### Erreur "User not authenticated"

➡️ Vérifier la session Better Auth
➡️ Vérifier le middleware d'authentification

---

## 📝 Licence

Ce système fait partie du projet Tamagotcho - My Digital School.

---

**Créé avec ❤️ en suivant les principes Clean Architecture & SOLID**

