# 🧪 Guide de Test - Système de Quêtes Journalières

## 📋 Checklist de Test Complète

Ce guide vous permet de tester entièrement le système de quêtes journalières.

---

## 🚀 Prérequis

### 1. Démarrer l'application

```bash
npm run dev
```

### 2. Se connecter

- Naviguer vers `http://localhost:3000`
- Se connecter avec un compte utilisateur
- Accéder au dashboard `/app`

---

## ✅ Test 1 : Affichage des Quêtes

### Objectif
Vérifier que les quêtes s'affichent correctement dans le dashboard.

### Étapes
1. ✅ Aller sur `/app` (dashboard)
2. ✅ Scroller vers la section "Quêtes du jour"
3. ✅ Vérifier qu'il y a **3 cartes de quêtes**

### Résultat attendu
- 📋 Titre "Quêtes du jour" visible
- 🎯 3 cartes affichées côte à côte (ou empilées sur mobile)
- 🎨 Chaque carte contient :
  - Un emoji/icône
  - Un titre
  - Une description
  - Une barre de progression
  - La récompense en Koins

### ✅ Validation
- [ ] Section visible
- [ ] 3 quêtes affichées
- [ ] Informations complètes sur chaque carte

---

## ✅ Test 2 : Progression - Quête "Nourrir"

### Objectif
Tester la progression de la quête "Nourris 5 fois ton monstre".

### Étapes
1. ✅ Créer un monstre (si vous n'en avez pas)
2. ✅ Cliquer sur un monstre pour aller sur sa page
3. ✅ Mettre le monstre en état "hungry" (affamé)
4. ✅ Cliquer sur le bouton "Nourrir" (🍖)
5. ✅ Retourner au dashboard
6. ✅ Vérifier la progression de la quête
7. ✅ Répéter 4 fois de plus (total 5 fois)

### Résultat attendu
- À chaque action "Nourrir" : **progression +1**
- Barre de progression se remplit progressivement
- À 5/5 :
  - 🎉 Badge "✓ Complété" apparaît
  - 💰 Koins ajoutés au wallet
  - 🎨 Carte change de couleur (fond vert)

### ✅ Validation
- [ ] Progression augmente après chaque action
- [ ] Badge "Complété" s'affiche
- [ ] Koins crédités (vérifier le wallet)

---

## ✅ Test 3 : Progression - Quête "Acheter Accessoire"

### Objectif
Tester la quête "Achète un accessoire dans la boutique".

### Étapes
1. ✅ Avoir au moins 40 Koins dans le wallet
2. ✅ Aller sur la page d'un monstre
3. ✅ Ouvrir le modal "Boutique Accessoires"
4. ✅ Acheter un accessoire (n'importe lequel)
5. ✅ Retourner au dashboard

### Résultat attendu
- Quête "Acheter un accessoire" passe à **1/1**
- Badge "✓ Complété" apparaît immédiatement
- +40 Koins ajoutés au wallet

### ✅ Validation
- [ ] Quête complétée après l'achat
- [ ] Koins ajoutés

---

## ✅ Test 4 : Progression - Quête "Équiper Accessoire"

### Objectif
Tester la quête "Équipe 2 accessoires sur tes monstres".

### Étapes
1. ✅ Avoir au moins 2 accessoires achetés
2. ✅ Sur la page du monstre, cliquer sur 2 accessoires différents
3. ✅ Les accessoires s'équipent sur le monstre
4. ✅ Retourner au dashboard

### Résultat attendu
- Quête progresse : **1/2** puis **2/2**
- Badge "✓ Complété" à 2/2
- +20 Koins ajoutés

### ✅ Validation
- [ ] Progression correcte
- [ ] Quête complétée
- [ ] Récompense reçue

---

## ✅ Test 5 : Progression - Quête "Changer Background"

### Objectif
Tester la quête "Change le fond d'écran d'un monstre".

### Étapes
1. ✅ Avoir acheté un background (boutique backgrounds)
2. ✅ Sur la page du monstre, équiper le background
3. ✅ Retourner au dashboard

### Résultat attendu
- Quête "Changer le fond" : **1/1**
- Badge "✓ Complété"
- +15 Koins ajoutés

### ✅ Validation
- [ ] Quête complétée
- [ ] Koins crédités

---

## ✅ Test 6 : Progression - Quête "Rendre Public"

### Objectif
Tester la quête "Rends un monstre public".

### Étapes
1. ✅ Sur la page d'un monstre
2. ✅ Cliquer sur le toggle "Rendre public"
3. ✅ Le monstre devient public
4. ✅ Retourner au dashboard

### Résultat attendu
- Quête "Partager un monstre" : **1/1**
- Badge "✓ Complété"
- +15 Koins ajoutés

### ✅ Validation
- [ ] Quête complétée
- [ ] Récompense reçue

---

## ✅ Test 7 : Progression - Quête "Interagir"

### Objectif
Tester la quête "Interagis avec 3 monstres différents".

### Étapes
1. ✅ Avoir au moins 3 monstres
2. ✅ Aller sur le monstre 1 → Effectuer une action (nourrir, câliner, etc.)
3. ✅ Aller sur le monstre 2 → Effectuer une action
4. ✅ Aller sur le monstre 3 → Effectuer une action
5. ✅ Retourner au dashboard

### Résultat attendu
- Quête progresse : **1/3** → **2/3** → **3/3**
- Badge "✓ Complété" à 3/3
- +30 Koins ajoutés

### ✅ Validation
- [ ] Progression à chaque interaction
- [ ] Quête complétée
- [ ] Koins crédités

---

## ✅ Test 8 : Bonus de Complétion Totale

### Objectif
Tester le bonus des 50 Koins pour avoir complété toutes les quêtes.

### Étapes
1. ✅ Compléter les 3 quêtes du jour
2. ✅ Retourner au dashboard
3. ✅ Vérifier l'apparition de la bannière bonus
4. ✅ Cliquer sur le bouton "Réclamer"

### Résultat attendu
- 🏆 Bannière colorée apparaît en bas des quêtes
- Texte : "Bonus de complétion !"
- Bouton "Réclamer" visible
- Après clic :
  - 🎉 Notification en haut à droite
  - Message : "Félicitations ! Vous avez gagné 50 Koins bonus !"
  - +50 Koins dans le wallet
  - Bouton disparaît ou devient grisé

### ✅ Validation
- [ ] Bannière visible après 3 quêtes
- [ ] Bouton "Réclamer" fonctionne
- [ ] Notification affichée
- [ ] 50 Koins crédités
- [ ] Bonus non réclamable 2 fois

---

## ✅ Test 9 : Statistiques

### Objectif
Vérifier que les statistiques s'affichent et se mettent à jour.

### Étapes
1. ✅ Compléter plusieurs quêtes
2. ✅ Vérifier la section "Vos statistiques" en bas

### Résultat attendu
- 4 cartes de statistiques visibles :
  - 🎯 **Quêtes complétées** (augmente à chaque quête)
  - 💰 **Koins gagnés** (somme des récompenses)
  - 🔥 **Série actuelle** (jours consécutifs)
  - ⭐ **Meilleure série** (record)

### ✅ Validation
- [ ] Statistiques affichées
- [ ] Valeurs correctes
- [ ] Mise à jour en temps réel

---

## ✅ Test 10 : Renouvellement des Quêtes

### Objectif
Tester le renouvellement automatique des quêtes.

### Option A : Test manuel via API

```bash
# Appeler l'endpoint de reset
curl http://localhost:3000/api/cron/reset-quests
```

### Option B : Attendre minuit
1. ✅ Noter les quêtes actuelles
2. ✅ Attendre jusqu'à 00:00
3. ✅ Recharger le dashboard

### Résultat attendu
- 3 **nouvelles quêtes** différentes générées
- Progression réinitialisée à 0/X
- Streak mis à jour si applicable
- Anciennes quêtes complétées archivées dans les stats

### ✅ Validation
- [ ] Nouvelles quêtes générées
- [ ] Progression à zéro
- [ ] Statistiques conservées

---

## ✅ Test 11 : API Endpoints

### Test GET /api/quests/daily

```bash
curl http://localhost:3000/api/quests/daily \
  -H "Cookie: better-call-your-cookie-here"
```

**Résultat attendu** :
```json
{
  "quests": [
    {
      "questType": "feed_monster",
      "currentProgress": 2,
      "targetCount": 5,
      "reward": 20,
      "completed": false,
      "title": "Nourrir ses monstres",
      "description": "Nourris 5 fois ton monstre aujourd'hui",
      "icon": "🍖"
    }
  ],
  "allCompleted": false,
  "bonusClaimed": false,
  "stats": {...},
  "currentDate": "2025-11-08"
}
```

### Test POST /api/quests/claim-bonus

```bash
curl -X POST http://localhost:3000/api/quests/claim-bonus \
  -H "Cookie: better-call-your-cookie-here"
```

**Résultat attendu** :
```json
{
  "success": true,
  "bonus": 50,
  "message": "Félicitations ! Vous avez gagné 50 Koins bonus !"
}
```

### ✅ Validation
- [ ] GET retourne les quêtes correctement
- [ ] POST réclame le bonus correctement
- [ ] Erreurs gérées (401 si non authentifié)

---

## ✅ Test 12 : MongoDB

### Objectif
Vérifier que les données sont bien stockées dans MongoDB.

### Étapes
1. ✅ Ouvrir MongoDB Compass
2. ✅ Connecter à votre base de données
3. ✅ Vérifier la collection `userdailyquests`

### Résultat attendu
```json
{
  "_id": "...",
  "ownerId": "user-id",
  "currentDate": "2025-11-08",
  "quests": [
    {
      "questType": "feed_monster",
      "currentProgress": 5,
      "targetCount": 5,
      "reward": 20,
      "completed": true,
      "completedAt": "2025-11-08T14:23:45.123Z"
    }
  ],
  "allCompleted": false,
  "bonusClaimed": false,
  "stats": {
    "totalQuestsCompleted": 12,
    "totalKoinsEarned": 340,
    "currentStreak": 3,
    "longestStreak": 5
  },
  "createdAt": "...",
  "updatedAt": "..."
}
```

### ✅ Validation
- [ ] Collection existe
- [ ] Document créé par utilisateur
- [ ] Champs corrects
- [ ] Données mises à jour

---

## 🐛 Dépannage

### Problème : Les quêtes ne s'affichent pas

**Solutions** :
1. Vérifier la console du navigateur (F12)
2. Vérifier que vous êtes connecté
3. Vérifier MongoDB connecté
4. Vérifier les logs du serveur

### Problème : La progression ne se met pas à jour

**Solutions** :
1. Recharger la page (F5)
2. Vérifier la console pour erreurs
3. Vérifier que `checkAndUpdateQuest()` est bien appelé
4. Vérifier MongoDB pour voir si les données changent

### Problème : Le bonus ne se réclame pas

**Solutions** :
1. Vérifier que les 3 quêtes sont complétées
2. Vérifier que le bonus n'a pas déjà été réclamé
3. Vérifier la console du navigateur
4. Tester l'API directement avec curl

### Problème : Les quêtes ne se renouvellent pas

**Solutions** :
1. Vérifier les logs Vercel Cron (si déployé)
2. Tester manuellement l'endpoint `/api/cron/reset-quests`
3. Vérifier la configuration `vercel.json`
4. Vérifier que `CRON_SECRET_TOKEN` est défini

---

## 📊 Rapport de Test

### Template de rapport

```
Date du test : ___________
Testeur : ___________

Test 1 - Affichage : ☐ Réussi ☐ Échoué
Test 2 - Nourrir : ☐ Réussi ☐ Échoué
Test 3 - Acheter : ☐ Réussi ☐ Échoué
Test 4 - Équiper : ☐ Réussi ☐ Échoué
Test 5 - Background : ☐ Réussi ☐ Échoué
Test 6 - Rendre public : ☐ Réussi ☐ Échoué
Test 7 - Interagir : ☐ Réussi ☐ Échoué
Test 8 - Bonus : ☐ Réussi ☐ Échoué
Test 9 - Statistiques : ☐ Réussi ☐ Échoué
Test 10 - Renouvellement : ☐ Réussi ☐ Échoué
Test 11 - API : ☐ Réussi ☐ Échoué
Test 12 - MongoDB : ☐ Réussi ☐ Échoué

Notes :
_______________________________________
_______________________________________
```

---

## ✅ Validation Finale

Une fois tous les tests passés :

- [ ] Toutes les quêtes s'affichent correctement
- [ ] La progression fonctionne pour chaque type
- [ ] Les récompenses sont créditées
- [ ] Le bonus de complétion fonctionne
- [ ] Les statistiques sont exactes
- [ ] Le renouvellement fonctionne
- [ ] Les API répondent correctement
- [ ] MongoDB stocke les données

**🎉 Si tous les tests sont validés, le système est prêt pour la production !**

---

**Bon test ! 🧪**

