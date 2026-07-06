// Catalogue Tina-Bijoux — inspiré de la boutique du Marché Dantokpa (Cotonou)
// Chaque produit porte les attributs utilisés par la recherche à facettes :
// catégorie, matière/couleur, gamme de prix, occasion.

// ===== Photos des bijoux =====
import montreDouceur  from './assets/montre-douceur.jpg';
import collierLumiere from './assets/collier-lumiere.jpg';
import collierRoyal   from './assets/collier-royal.jpg';
import collierPerle   from './assets/collier-perle.jpg';
import bagueAurore    from './assets/bague-aurore.jpg';
import bagueUnion     from './assets/bague-union.jpg';

export const CATEGORIES = ['Montres', 'Colliers', 'Bagues'];

export const MATERIALS = [
  { id: 'or',     label: 'Or jaune',   color: '#C9A227' },
  { id: 'dore',   label: 'Doré',       color: '#D9BD7A' },
  { id: 'argent', label: 'Argenté',    color: '#C0C4C9' },
  { id: 'rose',   label: 'Or rose',    color: '#D9A38A' },
];

export const OCCASIONS = ['Quotidien', 'Cérémonie', 'Cadeau', 'Mariage'];

// Gammes de prix en FCFA (contexte Cotonou)
export const PRICE_RANGES = [
  { id: 'p1', label: "Moins de 15 000 F", min: 0,     max: 15000 },
  { id: 'p2', label: '15 000 – 30 000 F', min: 15000, max: 30000 },
  { id: 'p3', label: '30 000 – 50 000 F', min: 30000, max: 50000 },
  { id: 'p4', label: 'Plus de 50 000 F',  min: 50000, max: Infinity },
];

export const PRODUCTS = [
  { id: 1, name: 'Montre Douceur', cat: 'Montres', material: 'rose', price: 38000, occasions: ['Quotidien','Cadeau'], rating: 4, glyph: '⌚', tag: 'Populaire', image: montreDouceur,
    desc: 'Petit boîtier or rose, léger au poignet, parfait au quotidien.' },
  { id: 2, name: 'Collier Lumière', cat: 'Colliers', material: 'dore', price: 22000, occasions: ['Cérémonie','Cadeau'], rating: 5, glyph: '📿', tag: 'Nouveau', image: collierLumiere,
    desc: 'Chaîne fine à pampilles scintillantes, tombé délicat sur le décolleté.' },
  { id: 3, name: 'Collier Royal', cat: 'Colliers', material: 'or', price: 65000, occasions: ['Mariage','Cérémonie'], rating: 5, glyph: '📿', tag: null, image: collierRoyal,
    desc: 'Rang travaillé en or jaune, pièce maîtresse pour un jour de fête.' },
  { id: 4, name: 'Collier Perle', cat: 'Colliers', material: 'argent', price: 18000, occasions: ['Quotidien','Cadeau'], rating: 4, glyph: '📿', tag: null, image: collierPerle,
    desc: 'Perles nacrées sur fil argenté, une élégance discrète et intemporelle.' },
  { id: 5, name: 'Bague Aurore', cat: 'Bagues', material: 'rose', price: 16000, occasions: ['Cadeau','Cérémonie'], rating: 5, glyph: '💍', tag: 'Nouveau', image: bagueAurore,
    desc: 'Anneau or rose surmonté d’une pierre claire, romantique et fin.' },
  { id: 6, name: 'Bague Union', cat: 'Bagues', material: 'or', price: 72000, occasions: ['Mariage'], rating: 5, glyph: '💍', tag: null, image: bagueUnion,
    desc: 'Alliance en or jaune travaillée, pour dire oui avec éclat.' },
];