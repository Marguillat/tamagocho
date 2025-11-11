# Solution : Mise à jour instantanée du background

## Problème identifié
Le background ne se mettait à jour qu'après une nouvelle requête périodique (toutes les 5 secondes), créant un délai visible entre l'action utilisateur et la mise à jour visuelle.

## Solutions évaluées

### ❌ Solution 1 : Mise à jour optimiste locale uniquement
- Mettre à jour uniquement le state local sans recharger depuis le serveur
- **Rejetée** : Risque de désynchronisation avec la base de données

### ❌ Solution 2 : Event bus / Custom events
- Utiliser un système d'événements pour communiquer entre composants
- **Rejetée** : Over-engineering, complexité inutile pour ce cas simple

### ❌ Solution 4 : State management global (Context/Zustand)
- Introduire un gestionnaire d'état global
- **Rejetée** : Trop lourd pour ce besoin spécifique, contre les principes actuels du projet

### ✅ Solution 3 : Callback + Rechargement immédiat (IMPLÉMENTÉE)
- Le composant enfant notifie le parent via callback
- Le parent recharge immédiatement les données depuis le serveur
- **Sélectionnée** : Simple, maintenable, garantit la cohérence des données

## Architecture de la solution

```
┌──────────────────────────────────┐
│   CreaturePageClient (Parent)   │
│                                  │
│  State:                          │
│  - equippedBackground            │
│                                  │
│  Functions:                      │
│  - handleBackgroundChange()      │
│    └─> getEquippedBackground()   │
│        └─> setEquippedBackground()│
└────────────┬─────────────────────┘
             │ Props:
             │ - onBackgroundChange callback
             ▼
┌──────────────────────────────────┐
│  MonsterBackgrounds (Enfant)    │
│                                  │
│  Actions:                        │
│  - handleEquip()                 │
│    ├─> equipBackgroundToMonster()│
│    └─> onBackgroundChange()      │
│  - handleUnequip()               │
│    ├─> unequipBackgroundFromMonster()│
│    └─> onBackgroundChange()      │
└──────────────────────────────────┘
```

## Implémentation détaillée

### 1. MonsterBackgrounds (Enfant)

**Ajout de la prop callback :**
```typescript
interface MonsterBackgroundsProps {
  monsterId: string
  equipedBackgroundId: string | null
  onBackgroundChange?: () => void  // ← NOUVEAU
}
```

**Appel du callback après équipement :**
```typescript
const handleEquip = async (backgroundId: string): Promise<void> => {
  setTogglingId(backgroundId)
  
  try {
    await equipBackgroundToMonster(monsterId, backgroundId)
    setEquipedBackgroundId(backgroundId)
    
    // Notifier le parent du changement
    if (onBackgroundChange !== undefined) {
      onBackgroundChange()  // ← NOUVEAU
    }
  } catch (error) {
    console.error('Erreur lors de l\'équipement:', error)
  } finally {
    setTogglingId(null)
  }
}
```

**Appel du callback après déséquipement :**
```typescript
const handleUnequip = async (): Promise<void> => {
  if (equipedBackgroundId === null) return
  
  setTogglingId(equipedBackgroundId)
  
  try {
    await unequipBackgroundFromMonster(monsterId)
    setEquipedBackgroundId(null)
    
    // Notifier le parent du changement
    if (onBackgroundChange !== undefined) {
      onBackgroundChange()  // ← NOUVEAU
    }
  } catch (error) {
    console.error('Erreur lors du déséquipement:', error)
  } finally {
    setTogglingId(null)
  }
}
```

### 2. CreaturePageClient (Parent)

**Création du callback handler :**
```typescript
/**
 * Callback appelé quand un background est équipé/déséquipé
 * Recharge immédiatement le background pour mise à jour instantanée
 */
const handleBackgroundChange = async (): Promise<void> => {
  try {
    const bg = await getEquippedBackground(monster._id)
    setEquippedBackground(bg)
  } catch (error) {
    console.error('Erreur lors du rechargement du background:', error)
  }
}
```

**Passage du callback au composant enfant :**
```typescript
<MonsterBackgrounds
  monsterId={currentMonster._id}
  equipedBackgroundId={currentMonster.equipedBackground ?? null}
  onBackgroundChange={() => { void handleBackgroundChange() }}  // ← NOUVEAU
/>
```

## Flux d'exécution

1. **Action utilisateur** : Clic sur un background ou sur "Retirer le background"
2. **MonsterBackgrounds** : Appel de la server action correspondante
3. **Server Action** : Mise à jour en base de données + revalidation du cache Next.js
4. **MonsterBackgrounds** : Appel du callback `onBackgroundChange()`
5. **CreaturePageClient** : Exécution de `handleBackgroundChange()`
6. **CreaturePageClient** : Appel de `getEquippedBackground()` pour récupérer les données fraîches
7. **CreaturePageClient** : Mise à jour du state `equippedBackground`
8. **CreatureMonsterDisplay** : Reçoit la nouvelle prop et met à jour l'affichage
9. **Affichage** : Le background est immédiatement visible sous le monstre ✨

## Avantages de cette solution

### ✅ Principes SOLID respectés
- **SRP** : Chaque composant garde sa responsabilité unique
- **OCP** : Extension par composition (callback), pas de modification des interfaces existantes
- **DIP** : Dépendance sur abstraction (callback fonction), pas d'implémentation concrète

### ✅ Clean Architecture
- **Séparation des couches** : Présentation (React) → Application (server actions) → Domaine (DB)
- **Flux unidirectionnel** : Enfant notifie parent via callback standard React

### ✅ Maintenabilité
- **Pattern React standard** : Callback props, familier pour tous les développeurs React
- **Testable** : Callback peut être mocké facilement dans les tests
- **Évolutif** : Facile d'ajouter d'autres callbacks ou composants similaires

### ✅ Performance
- **Rechargement ciblé** : Seul le background est rechargé, pas tout le monstre
- **Optimisation Next.js** : Revalidation automatique du cache serveur
- **Mise à jour instantanée** : L'utilisateur voit le changement immédiatement

### ✅ Cohérence des données
- **Single source of truth** : Les données viennent toujours du serveur
- **Pas de désynchronisation** : Le state local est toujours à jour avec la DB
- **Gestion d'erreur** : Les erreurs sont catchées et loggées

## Pérennité

Cette solution est pérenne car :

1. **Pas de dépendance externe** : Utilise uniquement React natif
2. **Pattern éprouvé** : Callback props utilisé depuis React 0.14 (2015)
3. **Compatible Next.js** : Fonctionne avec App Router et Server Actions
4. **Extensible** : Facile d'ajouter d'autres types de callbacks (accessoires, stats, etc.)
5. **Migration facile** : Si besoin d'un state manager plus tard, la structure est déjà propre

## Tests recommandés

### Test manuel
1. ✅ Équiper un background → Vérifier affichage instantané
2. ✅ Déséquiper le background → Vérifier retour instantané au défaut
3. ✅ Équiper un autre background → Vérifier changement instantané
4. ✅ Rafraîchir la page → Vérifier persistance du background

### Test unitaire (à implémenter)
```typescript
describe('MonsterBackgrounds', () => {
  it('should call onBackgroundChange after equipping', async () => {
    const mockOnChange = jest.fn()
    render(<MonsterBackgrounds onBackgroundChange={mockOnChange} />)
    
    // Simuler équipement
    await userEvent.click(screen.getByText('Background 1'))
    
    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })
})
```

## Comparaison avec les alternatives

| Critère | Callback | Event Bus | State Global | Optimiste seul |
|---------|----------|-----------|--------------|----------------|
| Simplicité | ✅ | ❌ | ⚠️ | ✅ |
| Performance | ✅ | ✅ | ✅ | ✅ |
| Cohérence données | ✅ | ✅ | ✅ | ❌ |
| Maintenabilité | ✅ | ⚠️ | ⚠️ | ✅ |
| Testabilité | ✅ | ⚠️ | ⚠️ | ✅ |
| Pattern standard | ✅ | ❌ | ⚠️ | ✅ |
| Over-engineering | ✅ | ❌ | ❌ | ✅ |

**Légende :** ✅ Excellent | ⚠️ Moyen | ❌ Problématique

## Conclusion

La solution par callback est la plus adaptée car elle :
- Résout le problème de manière simple et efficace
- Respecte les principes de conception du projet
- Reste maintenable et extensible pour le futur
- N'introduit pas de complexité inutile
- Garantit la cohérence des données avec le serveur

Cette approche est **recommandée** pour tous les cas similaires (accessoires, stats, etc.).

