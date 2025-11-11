# Guide de Test - Monstres Publics

## 🚀 Comment tester la fonctionnalité

### 1. Rendre un monstre public

#### Option A : Via l'interface
1. Naviguez vers le dashboard (`/app`)
2. Cliquez sur une de vos créatures
3. Sur la page de la créature, cliquez sur le bouton **"🔒 Privé"** en haut à droite
4. Le bouton devient **"🌍 Public"**
5. Votre monstre est maintenant visible publiquement !

#### Option B : Via la base de données (dev)
```typescript
// Dans MongoDB ou via une action serveur
await db.collection('monsters').updateOne(
  { _id: 'votre-monster-id' },
  { $set: { isPublic: true } }
)
```

### 2. Voir les monstres publics

#### Desktop
- Cliquez sur le bouton **"🌍 Monstres Publics"** dans le header en haut

#### Mobile
- Appuyez sur l'icône **"🌍 Public"** dans la barre de navigation en bas

### 3. Ce que vous devriez voir

#### Si des monstres publics existent :
- Une grille de cartes avec :
  - ✅ Le monstre animé
  - ✅ Son background équipé (si disponible)
  - ✅ Ses accessoires équipés (chapeau, chaussures, lunettes)
  - ✅ Son nom et niveau
  - ✅ Son état actuel (😊 happy, 😢 sad, etc.)
  - ✅ Badge "🌍 Public"

#### Si aucun monstre public :
- Message : "😢 Aucun monstre public pour le moment"
- Invitation à partager une créature

## 🔍 Points de vérification

### ✅ Checklist de test

- [ ] Le bouton toggle fonctionne (privé ↔️ public)
- [ ] Le changement est instantané (optimistic update)
- [ ] La page des monstres publics est accessible depuis le header
- [ ] La page des monstres publics est accessible depuis la bottom nav
- [ ] Les monstres s'affichent avec leurs backgrounds
- [ ] Les monstres s'affichent avec leurs accessoires
- [ ] Les animations fonctionnent (hover, bounce)
- [ ] Le design est responsive (mobile, tablet, desktop)
- [ ] Le cas "aucun monstre" affiche le bon message

## 🐛 Résolution de problèmes

### Le bouton toggle ne fait rien
- Vérifiez que la server action `togglePublicMonster` existe dans `/src/actions/monsters.actions.ts`
- Vérifiez la console pour d'éventuelles erreurs

### Les accessoires ne s'affichent pas
- Vérifiez que le monstre a bien des accessoires équipés
- Vérifiez que `equipedAccessories` contient des IDs valides
- Vérifiez la console pour des erreurs de chargement

### Le background ne s'affiche pas
- Vérifiez que le monstre a un background équipé
- Vérifiez que `equipedBackground` contient un ID valide
- Vérifiez l'URL du background dans la base de données

## 📊 États des monstres et leurs emojis

| État    | Emoji | Label   |
|---------|-------|---------|
| happy   | 😊    | Joyeux  |
| sad     | 😢    | Triste  |
| angry   | 😠    | Fâché   |
| hungry  | 🍔    | Affamé  |
| sleepy  | 😴    | Endormi |

## 🎨 Navigation

### Desktop (header)
```
[🏠 Dashboard] [🌍 Monstres Publics] [🪙 Wallet] [🚪 Quitter]
```

### Mobile (bottom nav)
```
[🏠 Home] [🌍 Public] [🪙 Wallet] [🚪 Quitter]
```

## 🔗 Routes

- Page publique : `/app/public-monsters`
- Détail créature : `/app/creatures/[id]`
- Dashboard : `/app`
- Wallet : `/app/wallet`

