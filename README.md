# Pepeline - Prédiction de Satisfaction

Application web moderne pour la prédiction de satisfaction des passagers aériens, développée avec Nuxt 3, Vue.js et Tailwind CSS.

## 🌟 Fonctionnalités

### Interface Adaptative
- **Version Desktop/Tablette** : Interface spacieuse avec disposition en grille
- **Version Mobile** : Interface optimisée pour les petits écrans avec disposition verticale
- **Détection Automatique** : Adaptation en temps réel selon la taille de l'écran

### Formulaire Intelligent
- Validation en temps réel des données
- Navigation intuitive entre les étapes
- Indicateurs de progression
- Messages d'erreur contextuels

### Design Moderne
- Thème inspiré d'iOS avec effets de flou
- Animations fluides et transitions douces
- Effets de survol et retours tactiles

### Easter Eggs
- **Mode ATC** : Interface radar activée par 5 clics rapides sur le logo
- Animations spéciales et effets visuels cachés

## 🚀 Installation

```bash
# Installation des dépendances
npm install

# Lancement du serveur de développement
npm run dev

# Construction pour la production
npm run build
```

## 📱 Versions d'Interface

### Desktop (≥1024px)
- Disposition en grille 3 colonnes
- Effets de survol élaborés
- Animations complètes

### Tablette (≥640px)
- Disposition en grille 2 colonnes
- Adaptation des espacements
- Conservation des animations principales

### Mobile (<640px)
- Disposition verticale optimisée
- Cartes en format horizontal
- Interface tactile adaptée
- Performances optimisées

## 🛠 Technologies

- **Frontend** : Nuxt 3, Vue.js 3, Tailwind CSS
- **État** : Pinia
- **Animations** : CSS natif, Vue Transitions
- **Responsive** : Media Queries, Tailwind Breakpoints

## 📋 Structure du Projet

```
├── components/
│   ├── form/         # Composants de formulaire
│   └── ui/           # Composants d'interface
├── pages/            # Routes de l'application
├── stores/           # État global (Pinia)
└── types/            # Types TypeScript
```

## 🎨 Personnalisation

Le design peut être personnalisé via :
- `tailwind.config.ts` pour les thèmes
- Variables CSS pour les couleurs et effets
- Classes utilitaires Tailwind

## 📝 Notes

- Interface responsive avec breakpoints à 640px et 1024px
- Support des préférences de mouvement réduit
- Optimisations de performance pour mobile
- Easter eggs pour une expérience ludique
