# Tina-Bijoux — Prototype e-commerce (SEG3525, Devoir 4)

Prototype haute-fidélité d'un site de vente de bijoux, inspiré de la boutique
**Tina-Bijoux** (Marché Dantokpa, Cotonou). Réalisé avec React + Vite.

## Lancer en local
```bash
npm install
npm run dev
```

## Construire pour la production
```bash
npm run build      # génère le dossier dist/
```

## Déploiement (Netlify)
- Glisser-déposer le dossier `dist/` sur https://app.netlify.com/drop
- OU connecter le repo GitHub avec : build command `npm run build`, publish directory `dist`

## Les 3 processus interactifs
1. **Suivre des instructions** — tunnel d'achat en 4 étapes (panier → coordonnées → paiement → confirmation) avec un *stepper* qui indique l'étape en cours.
2. **Exploration divergent/convergent** — recherche à facettes (catégorie, matière, budget, occasion) avec compteurs et chips de filtres actifs.
3. **Communication** — sondage de satisfaction (note en étoiles + tags + message libre).
