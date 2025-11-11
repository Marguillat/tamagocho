# Implémentation du système de backgrounds dynamiques

## Résumé

Implémentation complète du système permettant d'afficher, sélectionner et déséquiper des backgrounds pour les monstres dans le composant `creature-monster-display.tsx`.

## Fichiers créés

### `/src/components/creature/monster-backgrounds.tsx`
Nouveau composant responsable de :
- Afficher tous les backgrounds possédés par le monstre
- Permettre de sélectionner un background à équiper
- Permettre de déséquiper totalement le background actuel
- Afficher visuellement les backgrounds avec leur aperçu

**Fonctionnalités :**
- Liste en grille des backgrounds avec preview
- Badge "ÉQUIPÉ" sur le background actuel
- Bouton "Retirer le background" pour déséquiper
- Design cohérent avec le reste de l'application (style jeu vidéo fun)
- Gestion des états de chargement

## Fichiers modifiés

### `/src/components/creature/creature-monster-display.tsx`
**Modifications :**
- Ajout de la prop `equipedBackgroundUrl?: string | null`
- Remplacement du background statique par un background dynamique basé sur la prop
- Le background par défaut (`/backgrounds/cosy-tamagocho.png`) est affiché si aucun background n'est équipé

**Code clé :**
```tsx
<div 
  className="..."
  style={{
    backgroundImage: equipedBackgroundUrl !== null && equipedBackgroundUrl !== undefined && equipedBackgroundUrl !== ''
      ? `url('${equipedBackgroundUrl}')`
      : "url('/backgrounds/cosy-tamagocho.png')"
  }}
>
```

### `/src/components/creature/creature-page-client.tsx`
**Modifications :**
1. Import du nouveau composant `MonsterBackgrounds` et du type `DBBackground`
2. Import de la server action `getEquippedBackground`
3. Ajout d'un state pour le background équipé : `useState<DBBackground | null>(null)`
4. Ajout d'un useEffect pour charger le background équipé au montage et lors des changements
5. Passage de la prop `equipedBackgroundUrl` au composant `CreatureMonsterDisplay`
6. Ajout du composant `MonsterBackgrounds` dans la colonne droite après les accessoires

**Code clé :**
```tsx
// State
const [equippedBackground, setEquippedBackground] = useState<DBBackground | null>(null)

// Chargement du background
useEffect(() => {
  const loadEquippedBackground = async (): Promise<void> => {
    const bg = await getEquippedBackground(monster._id)
    setEquippedBackground(bg)
  }
  void loadEquippedBackground()
}, [monster._id, currentMonster.equipedBackground])

// Affichage du composant
<MonsterBackgrounds
  monsterId={currentMonster._id}
  equipedBackgroundId={currentMonster.equipedBackground ?? null}
/>
```

## Server Actions utilisées

Les server actions suivantes (non modifiées) sont utilisées :
- `getBackgroundsForMonster(monsterId: string)` : Récupère tous les backgrounds possédés
- `equipBackgroundToMonster(monsterId: string, backgroundId: string)` : Équipe un background
- `unequipBackgroundFromMonster(monsterId: string)` : Déséquipe le background actuel
- `getEquippedBackground(monsterId: string)` : Récupère le background actuellement équipé

## Architecture et principes appliqués

### SOLID
- **SRP (Single Responsibility)** : Le composant `MonsterBackgrounds` a la responsabilité unique de gérer l'affichage et la sélection des backgrounds
- **DIP (Dependency Inversion)** : Le composant dépend des abstractions (server actions) et non des implémentations concrètes

### Clean Architecture
- **Presentation Layer** : Composants React purs sans logique métier
- **Application Layer** : Server actions pour l'orchestration
- **Séparation des responsabilités** : Chaque composant a un rôle bien défini

### Clean Code
- Noms descriptifs et significatifs
- Fonctions courtes et focalisées
- Commentaires explicatifs pour la documentation
- Gestion appropriée des états de chargement et d'erreur

## Flux d'utilisation

1. L'utilisateur visite la page de détail d'un monstre
2. Le composant `CreaturePageClient` charge le background équipé via `getEquippedBackground`
3. Le background est affiché dans `CreatureMonsterDisplay` sous le monstre
4. Le composant `MonsterBackgrounds` affiche tous les backgrounds possédés
5. L'utilisateur peut :
   - Cliquer sur un background pour l'équiper (appel à `equipBackgroundToMonster`)
   - Cliquer sur "Retirer le background" pour le déséquiper (appel à `unequipBackgroundFromMonster`)
6. Le changement est détecté par le useEffect qui recharge le background équipé
7. L'affichage est mis à jour automatiquement

## Design visuel

- **Couleurs** : Palette blue/cyan pour les backgrounds (cohérent avec le thème eau/paysage)
- **Grille responsive** : 1 colonne sur mobile, 2 colonnes sur desktop
- **Aperçus visuels** : Chaque background est affiché en aspect ratio 16:9
- **Badge équipé** : Anneau vert et badge "✓ ÉQUIPÉ" sur le background actuel
- **Bouton de déséquipement** : Rouge/rose avec icône 🚫
- **État vide** : Message encourageant à visiter la boutique

## Tests manuels suggérés

1. ✅ Vérifier que le background par défaut s'affiche quand aucun n'est équipé
2. ✅ Acheter un background dans la boutique
3. ✅ Vérifier qu'il apparaît dans la liste des backgrounds possédés
4. ✅ Équiper le background et vérifier qu'il s'affiche sous le monstre
5. ✅ Déséquiper le background et vérifier le retour au background par défaut
6. ✅ Équiper un autre background et vérifier le changement
7. ✅ Vérifier la persistance après rechargement de la page

## Notes techniques

- Le background est stocké sous forme d'URL dans la base de données
- Le champ `equipedBackground` dans `DBMonster` contient l'ID du background équipé (ou `null`)
- Le rechargement automatique du background se fait via le monitoring de `currentMonster.equipedBackground`
- Les server actions gèrent automatiquement la revalidation du cache Next.js
- Le composant est entièrement client-side pour une meilleure réactivité

