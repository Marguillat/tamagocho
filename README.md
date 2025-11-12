# 🎮 Tamagotcho

Application web moderne inspirée des célèbres Tamagotchi, développée avec Next.js 15, TypeScript et MongoDB. Adoptez, personnalisez et prenez soin de vos créatures virtuelles dans un univers en pixel art coloré !

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.20.0-green)](https://www.mongodb.com/)

## ✨ Fonctionnalités Principales

### 👾 Système de Monstres
- 🎨 **Génération procédurale en pixel art** - Plus de 200 000 combinaisons uniques
- 😊 **5 états émotionnels** - Heureux, triste, en colère, affamé, endormi (avec animations)
- ⚡ **Système d'évolution** - Faites monter de niveau vos créatures
- 🌍 **Monstres publics** - Partagez vos créatures avec la communauté
- 🔄 **Mise à jour automatique** - Les états évoluent en temps réel

### 🎨 Personnalisation Avancée
- 👒 **Accessoires en pixel art** - 15 accessoires disponibles en 3 catégories
  - 🎩 Chapeaux : Cowboy, Couronne, Casquette, Magicien, Fête
  - 👓 Lunettes : Soleil, Geek, Cœur, Étoile, 3D
  - 👟 Chaussures : Baskets, Bottes, Danse, Patins, Spatiales
- 🖼️ **Backgrounds personnalisables** - 5 fonds thématiques premium
  - 🏠 Cosy : Intérieur chaleureux et confortable
  - 🏰 Fantasy : Château magique et enchanteur
  - 🚀 Sci-Fi : Vaisseau spatial futuriste
  - ⚙️ Steampunk : Atelier rétro-futuriste
  - 🌳 Nature : Forêt apaisante et verdoyante
- 🎭 **Système de positionnement dynamique** - Les accessoires suivent les mouvements et animations
- 🛍️ **Boutique intégrée** - Achetez des accessoires et des fonds avec des Koins
- 🎨 **Système de z-ordering** - 10 layers de profondeur pour un rendu parfait

### 💰 Économie & Progression
- 🪙 **Système de monnaie virtuelle** - Gagnez et dépensez des Koins
- 💳 **Boutique de Koins** - Achat de packs via Stripe (5 packs disponibles)
  - 🪙 Débutant : 10 Koins pour 5€
  - 💰 Populaire : 50 Koins pour 20€ ⭐
  - 💎 Pro : 500 Koins pour 150€
  - 👑 Royal : 1000 Koins pour 200€
  - 🌟 Légendaire : 5000 Koins pour 800€
- 🎯 **Quêtes journalières** - 9 types de quêtes disponibles
  - Nourrir 5 fois (20 Koins)
  - Faire évoluer (50 Koins)
  - Interagir 3 fois (30 Koins)
  - Acheter un accessoire (40 Koins)
  - Rendre public (15 Koins)
  - Atteindre niveau 3 (35 Koins)
  - Gagner 50 Koins (25 Koins)
  - Équiper 2 accessoires (20 Koins)
  - Changer le fond (15 Koins)
- 🏆 **Bonus de complétion** - 50 Koins bonus si toutes les quêtes sont terminées
- 🔥 **Système de streak** - Compteur de jours consécutifs
- 📊 **Statistiques détaillées** - Total de quêtes, Koins gagnés, meilleur streak
- 🔄 **Renouvellement automatique** - Nouvelles quêtes chaque jour à minuit

### 🔐 Authentification & Sécurité
- 🔒 **Better Auth** - Authentification moderne et sécurisée
- 📧 **Email/Password** - Inscription classique
- 🐙 **GitHub OAuth** - Connexion via GitHub
- 🛡️ **Sessions sécurisées** - Gestion des sessions côté serveur

### 🎮 Fonctionnalités Avancées
- 📱 **Design 100% responsive** - Interface optimisée mobile, tablette et desktop
- 🎉 **Animations fluides** - Transitions et effets visuels soignés avec Canvas
- 🔔 **Notifications toast** - Feedback visuel instantané avec React Toastify
- 📊 **Dashboard personnel** - Vue d'ensemble complète de toutes vos créatures
- 🎨 **Pixel Art Generator** - Système de rendu canvas pour monstres et accessoires
- 🔄 **Auto-update** - Mise à jour automatique des états via Cron Jobs Vercel
- 💾 **Persistence des données** - MongoDB avec Mongoose pour la robustesse
- 🎯 **Server Actions** - Architecture moderne sans API routes classiques
- 🏪 **Système de boutique** - Onglets accessoires, backgrounds et boosts XP

## 📸 Aperçu

### Fonctionnalités Clés en Action

- 🏠 **Page d'accueil** - Landing page moderne avec présentation des fonctionnalités
- 🎮 **Dashboard** - Gestion de vos créatures avec vue en grille responsive
- 👾 **Page Créature** - Visualisation détaillée avec monstre animé et stats en temps réel
- 🛍️ **Boutique** - Interface par onglets (Accessoires, Backgrounds, Boosts XP)
- 💰 **Wallet** - Boutique de Koins avec packs Stripe et design premium
- 🎯 **Quêtes** - Interface de quêtes journalières avec progression et statistiques
- 🌍 **Monstres Publics** - Galerie communautaire avec backgrounds et accessoires

### Générations Uniques

Le système de génération procédurale garantit que chaque monstre est unique avec :
- 🎨 Plus de 200 000 combinaisons possibles
- 🎭 Rendu en pixel art sur canvas HTML5
- 😊 Animations différentes selon l'état émotionnel
- 🎨 Couleurs générées algorithmiquement pour chaque partie du corps

## 🚀 Démarrage rapide

### Prérequis

- Node.js 20.0 ou supérieur
- MongoDB (local ou Atlas)
- npm ou yarn
- Compte Stripe (optionnel, pour tester les paiements)

### Installation

```bash
# Cloner le projet
git clone git@github.com:Marguillat/tamagocho.git
cd tamagotcho

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos credentials

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📚 Documentation

La documentation complète du projet est disponible dans le dossier `/documentation` et accessible en ligne :

- **Production** : [https://tamagotcho.vercel.app/documentation](https://tamagotcho.vercel.app/documentation)
- **Local** : `npm run dev:docs` puis [http://localhost:3000](http://localhost:3000)

### Documentation Principale

- 📐 **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Principes SOLID et Clean Architecture appliqués
- 🧩 **Composants** - Documentation des composants React
- 👾 **Système de Monstres** - Génération procédurale en pixel art
- 🔒 **Authentification** - Configuration et utilisation de Better Auth
- 🛠️ **Guide de développement** - Instructions pour contribuer

### Documentation Technique Détaillée (dossier `/docs`)

#### Accessoires
- 📘 **[ACCESSORIES_README.md](./docs/accessories/ACCESSORIES_README.md)** - Guide complet du système d'accessoires
- ⚡ **[ACCESSORIES_QUICK_START.md](./docs/accessories/ACCESSORIES_QUICK_START.md)** - Démarrage rapide en 30 secondes
- 🎨 **[ACCESSORIES_VISUAL_EXAMPLES.md](./docs/accessories/ACCESSORIES_VISUAL_EXAMPLES.md)** - Exemples visuels et palette

#### Backgrounds
- 🖼️ **[BACKGROUNDS_README.md](./docs/backgrounds/BACKGROUNDS_README.md)** - Système de fonds personnalisables
- ⚡ **[BACKGROUNDS_QUICKSTART.md](./docs/backgrounds/BACKGROUNDS_QUICKSTART.md)** - Guide de démarrage rapide

#### Quêtes
- 🎯 **[DAILY_QUESTS_README.md](./docs/quests/DAILY_QUESTS_README.md)** - Système de quêtes journalières
- 📊 **[DAILY_QUESTS_QUICKSTART.md](./docs/quests/DAILY_QUESTS_QUICKSTART.md)** - Guide rapide
- 🧪 **[DAILY_QUESTS_TESTING_GUIDE.md](./docs/quests/DAILY_QUESTS_TESTING_GUIDE.md)** - Tests et validation

#### Cron & Automatisation
- 🔄 **[CRON_SYSTEM.md](./docs/cron/CRON_SYSTEM.md)** - Système de mise à jour automatique
- ⚡ **[CRON_QUICKSTART.md](./docs/cron/CRON_QUICKSTART.md)** - Configuration rapide

#### Boutique & Paiements
- 💳 **[WALLET_SHOP_SYSTEM.md](./docs/shop/WALLET_SHOP_SYSTEM.md)** - Intégration Stripe et boutique de Koins

#### Monstres Publics
- 🌍 **[PUBLIC_MONSTERS_IMPLEMENTATION.md](./docs/public-monsters/PUBLIC_MONSTERS_IMPLEMENTATION.md)** - Système de partage

## 🏗️ Stack technique

| Catégorie | Technologie |
|-----------|-------------|
| **Framework** | Next.js 15.5.4 (App Router + Turbopack) |
| **Langage** | TypeScript 5.x (mode strict) |
| **UI** | React 19.1.0 |
| **Styling** | Tailwind CSS 4 avec palette personnalisée |
| **Base de données** | MongoDB 6.20.0 + Mongoose 8.19.1 |
| **Authentification** | Better Auth 1.3.24 |
| **Paiements** | Stripe 19.1.0 (Checkout + Webhooks) |
| **Animations** | Canvas Confetti 1.9.4 |
| **Notifications** | React Toastify 11.0.5 |
| **Déploiement** | Vercel (avec Cron Jobs) |
| **Documentation** | Docusaurus |
| **Linting** | ts-standard 12.0.2 |

## 📁 Structure du projet

```
tamagotcho/
├── src/
│   ├── app/              # Next.js App Router (pages et layouts)
│   │   ├── api/          # API Routes (Stripe webhooks, Cron endpoints)
│   │   ├── app/          # Pages protégées (dashboard, créatures, wallet)
│   │   └── sign-in/      # Pages d'authentification
│   ├── components/       # Composants React réutilisables
│   │   ├── accessories/  # Composants d'accessoires en pixel art
│   │   ├── creature/     # Composants de créatures (affichage, actions)
│   │   ├── dashboard/    # Composants du tableau de bord
│   │   ├── quests/       # Composants de quêtes journalières
│   │   └── shop/         # Composants de boutique
│   ├── types/           # Types et interfaces TypeScript
│   ├── services/        # Logique métier (génération de monstres, accessoires, quêtes)
│   ├── db/              # Connexion MongoDB et modèles Mongoose
│   ├── lib/             # Utilitaires et configuration (auth, stripe, utils)
│   ├── actions/         # Server Actions Next.js
│   ├── config/          # Fichiers de configuration (accessoires, backgrounds, quêtes)
│   └── hooks/           # Custom React hooks
├── cron/                # Serveur Cron indépendant
├── documentation/       # Documentation Docusaurus
├── public/              # Assets statiques (images, backgrounds)
├── specs/               # Spécifications du projet
└── docs/                # Documentation technique détaillée
```

## 🎨 Principes d'architecture

Le projet suit rigoureusement les **principes SOLID** et l'**architecture Clean** :

- ✅ **Single Responsibility** - Chaque composant a une seule responsabilité
- ✅ **Open/Closed** - Ouvert à l'extension, fermé à la modification
- ✅ **Liskov Substitution** - Les types peuvent être substitués sans casser le code
- ✅ **Interface Segregation** - Interfaces spécifiques et focalisées
- ✅ **Dependency Inversion** - Dépendance vers des abstractions

Pour plus de détails, consultez la [documentation architecture](./documentation/docs/architecture).

## 🛠️ Scripts disponibles

```bash
# Développement
npm run dev              # Démarre Next.js (port 3000)
npm run dev:docs         # Démarre la documentation (port 3000)
npm run dev:cron         # Démarre le serveur Cron (développement)

# Build
npm run build            # Build complet (Next.js + Documentation)
npm run build:next       # Build Next.js uniquement
npm run build:docs       # Build documentation uniquement

# Production
npm start                # Démarre le serveur Next.js en production
npm run start:cron       # Démarre le serveur Cron en production

# Qualité de code
npm run lint             # Linter avec ts-standard (auto-fix)
```

## 🔐 Configuration

### Variables d'environnement

Créer un fichier `.env.local` à la racine (voir `.env.example` pour un template complet) :

```bash
# MongoDB
MONGODB_USERNAME="votre_username"
MONGODB_PASSWORD="votre_password"
MONGODB_HOST="votre_cluster.mongodb.net"
MONGODB_DATABASE_NAME="tamagotcho"
MONGODB_PARAMS="?retryWrites=true&w=majority"
MONGODB_APP_NAME="tamagotcho"

# Better Auth
BETTER_AUTH_SECRET="votre_secret_key_ici"
BETTER_AUTH_URL="http://localhost:3000"

# GitHub OAuth (optionnel)
GITHUB_CLIENT_ID="votre_github_client_id"
GITHUB_CLIENT_SECRET="votre_github_client_secret"

# Stripe (pour la boutique de Koins)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Cron Job (optionnel - sécurise les endpoints)
CRON_SECRET_TOKEN="votre_token_secret"
NEXT_PUBLIC_CRON_SECRET_TOKEN="votre_token_secret"

# Public
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 🗺️ Roadmap & Fonctionnalités à venir

### ✅ Complété (Version Actuelle)
- [x] Système de génération de monstres en pixel art
- [x] Authentification avec Better Auth (Email + GitHub OAuth)
- [x] Dashboard avec gestion de créatures
- [x] Système d'accessoires en pixel art (15 items)
- [x] Backgrounds personnalisables (5 thèmes)
- [x] Quêtes journalières (9 types)
- [x] Boutique de Koins avec Stripe
- [x] Monstres publics et partage communautaire
- [x] Mise à jour automatique via Cron Jobs
- [x] Documentation complète avec Docusaurus

### 🚧 En Développement
- [ ] Système de combat entre monstres
- [ ] Achievements et trophées
- [ ] Classement global des joueurs
- [ ] Événements temporaires
- [ ] Nouveaux types d'accessoires (colliers, ailes)
- [ ] Mini-jeux intégrés
- [ ] Système d'amis et social

### 💡 Idées Futures
- [ ] Application mobile (React Native)
- [ ] Mode multijoueur en temps réel
- [ ] Breeding (reproduction de monstres)
- [ ] NFT collection (optionnel)
- [ ] Intégration Discord bot
- [ ] Notifications push
- [ ] Mode hors-ligne (PWA)

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez notre [guide de développement](./documentation/docs/development-guide.md) pour :

- Installer l'environnement de développement
- Comprendre les conventions de code
- Soumettre une Pull Request
- Ajouter de nouveaux types d'accessoires
- Créer de nouveaux backgrounds

### Workflow

1. Fork le projet
2. Créer une branche (`git checkout -b feature/ma-feature`)
3. Commit les changements (`git commit -m 'feat: ajout de ma feature'`)
4. Push vers la branche (`git push origin feature/ma-feature`)
5. Ouvrir une Pull Request

## 👥 Auteurs

- **Margouillat** - [GitHub](https://github.com/RiusmaX)

Projet réalisé dans le cadre de la formation **My Digital School**.

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) - Framework React
- [Better Auth](https://www.better-auth.com/) - Solution d'authentification
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Docusaurus](https://docusaurus.io/) - Générateur de documentation
- [Vercel](https://vercel.com/) - Plateforme de déploiement

---

**Développé avec ❤️ et ☕ par l'équipe Tamagotcho**
