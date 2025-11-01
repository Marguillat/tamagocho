# 🛍️ Guide Rapide - Boutique d'Accessoires

## 🎯 Ce qui a été implémenté

### Fonctionnalités
✅ Boutique d'accessoires complète avec 15 accessoires  
✅ 3 catégories : Chapeaux 🎩, Lunettes 😎, Chaussures 👟  
✅ Canvas visuel pour prévisualiser chaque accessoire  
✅ Affichage en temps réel du solde en Koins  
✅ Filtrage par type d'accessoire  
✅ Système d'achat intégré avec le wallet  
✅ Messages de succès/erreur animés  
✅ Design responsive (mobile → desktop)  

## 📂 Fichiers Principaux

```
src/
├── config/
│   └── accessories.config-v2.ts        # 📦 Catalogue des accessoires
├── components/
│   ├── shop/
│   │   └── accessories-shop-v2.tsx     # 🛒 Composant boutique
│   └── creature/
│       └── shop-modal.tsx              # 🪟 Modale avec onglets
└── actions/
    └── accessories.actions.ts          # 🔧 Server actions (non modifiées)
```

## 🚀 Comment Tester

### 1. Lancer l'application
```bash
npm run dev
```

### 2. Accéder à une créature
- Se connecter
- Cliquer sur une créature existante
- Cliquer sur le bouton "🛍️ Boutique"

### 3. Acheter un accessoire
- L'onglet "👒 Accessoires" s'affiche par défaut
- Votre solde s'affiche en haut : "🪙 XXX Koins"
- Filtrer par type (optionnel) : Tous / Chapeaux / Lunettes / Chaussures
- Cliquer sur "🛒 Acheter" sur un accessoire
- Le solde se met à jour automatiquement
- Message de confirmation affiché

## 🎨 Accessoires Disponibles

### Chapeaux (5)
- 🤠 Chapeau de Cowboy - 25 Koins
- 👑 Couronne Royale - 100 Koins ⭐ Populaire
- 🧢 Casquette - 15 Koins
- 🎩 Chapeau de Magicien - 75 Koins
- 🎉 Chapeau de Fête - 20 Koins

### Lunettes (5)
- 😎 Lunettes de Soleil - 20 Koins ⭐ Populaire
- 🤓 Lunettes de Geek - 18 Koins
- 😍 Lunettes Cœur - 22 Koins
- 🌟 Lunettes Étoile - 30 Koins
- 🎬 Lunettes 3D - 25 Koins

### Chaussures (5)
- 👟 Baskets - 20 Koins ⭐ Populaire
- 🥾 Bottes de Cowboy - 35 Koins
- 🩰 Chaussons de Danse - 28 Koins
- 🛼 Patins à Roulettes - 45 Koins
- 🚀 Bottes Spatiales - 80 Koins

## 🔍 Détails Techniques

### Informations Affichées par Accessoire
1. **Canvas visuel** : Zone colorée avec fond dégradé
2. **Emoji** : Représentation visuelle (7xl)
3. **Badge type** : Catégorie (hat/glasses/shoes)
4. **Badge populaire** : Pour les items les + vendus
5. **Nom** : Titre de l'accessoire
6. **Description** : Texte descriptif
7. **Couleur** : Pastille avec la couleur principale
8. **Prix** : En Koins avec emoji 🪙
9. **Bouton** : État adaptatif (peut acheter / pas assez)

### Server Actions Utilisées
```typescript
// Crée l'accessoire et gère le paiement
await createAccessoryForMonster(monsterId, {
  type: 'hat',           // ou 'sunglasses', 'shoes'
  mainColor: '#FFD700',  // Code couleur hex
  price: 100             // Prix en Koins
})
```

## ⚙️ Configuration

### Ajouter un Nouvel Accessoire
Éditer `src/config/accessories.config-v2.ts` :

```typescript
{
  id: 'shoes-new',           // ID unique
  name: 'Nouvelles Chaussures',
  type: 'shoes',             // hat | sunglasses | shoes
  price: 50,                 // Prix en Koins
  mainColor: '#FF6347',      // Couleur hex
  emoji: '👠',               // Emoji représentatif
  description: 'Description', // Texte descriptif
  popular: false             // true pour badge ⭐
}
```

## 🐛 Débogage

### Si le solde ne s'affiche pas
- Vérifier que l'utilisateur est connecté
- Vérifier que `getWallet()` fonctionne
- Regarder la console navigateur pour erreurs

### Si l'achat ne fonctionne pas
- Vérifier le solde suffisant
- Regarder la console serveur
- Vérifier la connexion MongoDB
- Tester les server actions directement

### Fichiers de log
- Console navigateur : Erreurs client
- Console serveur : Erreurs server actions
- Network tab : Requêtes API

## 📱 Responsive Design

```
📱 Mobile (< 640px)      : 1 colonne
📱 Tablet (640-1024px)   : 2 colonnes  
💻 Desktop (1024-1280px) : 3 colonnes
🖥️ Large (> 1280px)      : 4 colonnes
```

## ✨ Animations

- **Hover** : Scale 1.05 sur les cartes
- **Click** : Scale 0.95 sur les boutons
- **Success** : Bounce animation
- **Error** : Shake animation
- **Transitions** : 300ms duration

## 🎯 Prochaines Étapes

1. **Affichage des accessoires possédés** : Inventaire
2. **Équipement** : Drag & drop pour équiper
3. **Visualisation 3D** : Voir l'accessoire sur la créature
4. **Collection** : Badges de collection complète

## 📚 Documentation Complète

Voir `docs/ACCESSORIES_SHOP_IMPLEMENTATION.md` pour :
- Architecture détaillée
- Principes SOLID appliqués
- Flux de données complet
- Diagrammes techniques

## 🆘 Support

En cas de problème :
1. Vérifier les logs (navigateur + serveur)
2. Relire cette documentation
3. Consulter le code source avec commentaires
4. Vérifier la base de données MongoDB

---

**Créé le** : 2025-01-11  
**Version** : 1.0.0  
**Statut** : ✅ Production Ready

