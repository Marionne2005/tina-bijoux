// Catalogue Tina-Bijoux — inspiré de la boutique du Marché Dantokpa (Cotonou)
// Chaque produit porte les attributs utilisés par la recherche à facettes :
// catégorie, matière/couleur, gamme de prix, occasion.

export const CATEGORIES = ['Montres', 'Colliers', 'Bracelets', "Boucles d'oreilles", 'Bagues'];

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

// Emoji-glyphe utilisé comme visuel léger (prototype haute-fidélité sans photos)
export const PRODUCTS = [
  { id: 1,  name: 'Montre Éclat',        cat: 'Montres',            material: 'dore',   price: 42000, occasions: ['Cérémonie','Cadeau'],        rating: 5, glyph: '⌚', tag: 'Populaire',
    desc: 'Montre bracelet dorée au cadran soleil, maille fine et fermoir sûr.' },
  { id: 2,  name: 'Montre Sahel',        cat: 'Montres',            material: 'or',     price: 58000, occasions: ['Cérémonie','Mariage'],       rating: 5, glyph: '⌚', tag: null,
    desc: 'Cadran vert profond serti, bracelet en or jaune pour les grandes occasions.' },
  { id: 3,  name: 'Montre Douceur',      cat: 'Montres',            material: 'rose',   price: 38000, occasions: ['Quotidien','Cadeau'],        rating: 4, glyph: '⌚', tag: null,
    desc: 'Petit boîtier or rose, léger au poignet, parfait au quotidien.' },
  { id: 4,  name: 'Collier Lumière',     cat: 'Colliers',           material: 'dore',   price: 22000, occasions: ['Cérémonie','Cadeau'],        rating: 5, glyph: '📿', tag: 'Nouveau',
    desc: 'Chaîne fine à pampilles scintillantes, tombé délicat sur le décolleté.' },
  { id: 5,  name: 'Collier Royal',       cat: 'Colliers',           material: 'or',     price: 65000, occasions: ['Mariage','Cérémonie'],       rating: 5, glyph: '📿', tag: null,
    desc: 'Rang travaillé en or jaune, pièce maîtresse pour un jour de fête.' },
  { id: 6,  name: 'Collier Perle',       cat: 'Colliers',           material: 'argent', price: 18000, occasions: ['Quotidien','Cadeau'],        rating: 4, glyph: '📿', tag: null,
    desc: 'Perles nacrées sur fil argenté, une élégance discrète et intemporelle.' },
  { id: 7,  name: 'Bracelet Jonc',       cat: 'Bracelets',          material: 'or',     price: 28000, occasions: ['Cérémonie','Mariage'],       rating: 5, glyph: '💫', tag: null,
    desc: 'Jonc lisse en or jaune, se porte seul ou en accumulation.' },
  { id: 8,  name: 'Bracelet Maille',     cat: 'Bracelets',          material: 'dore',   price: 14000, occasions: ['Quotidien','Cadeau'],        rating: 4, glyph: '💫', tag: 'Petit prix',
    desc: 'Maille souple dorée, confortable et lumineuse toute la journée.' },
  { id: 9,  name: 'Bracelet Étoile',     cat: 'Bracelets',          material: 'argent', price: 12000, occasions: ['Quotidien','Cadeau'],        rating: 4, glyph: '💫', tag: null,
    desc: 'Chaîne argentée ornée d\u2019une étoile sertie, idée cadeau tendre.' },
  { id: 10, name: "Créoles Soleil",      cat: "Boucles d'oreilles", material: 'dore',   price: 9000,  occasions: ['Quotidien','Cadeau'],        rating: 5, glyph: '💎', tag: 'Petit prix',
    desc: 'Créoles dorées légères, un rayon de soleil à chaque mouvement.' },
  { id: 11, name: "Puces Éclat",         cat: "Boucles d'oreilles", material: 'argent', price: 11000, occasions: ['Quotidien','Cérémonie'],     rating: 4, glyph: '💎', tag: null,
    desc: 'Puces serties brillantes, discrètes et faciles à porter partout.' },
  { id: 12, name: "Pendantes Fête",      cat: "Boucles d'oreilles", material: 'or',     price: 34000, occasions: ['Mariage','Cérémonie'],       rating: 5, glyph: '💎', tag: null,
    desc: 'Pendantes en or jaune qui habillent un visage pour les grands jours.' },
  { id: 13, name: 'Bague Aurore',        cat: 'Bagues',             material: 'rose',   price: 16000, occasions: ['Cadeau','Cérémonie'],        rating: 5, glyph: '💍', tag: 'Nouveau',
    desc: 'Anneau or rose surmonté d\u2019une pierre claire, romantique et fin.' },
  { id: 14, name: 'Bague Union',         cat: 'Bagues',             material: 'or',     price: 72000, occasions: ['Mariage'],                   rating: 5, glyph: '💍', tag: null,
    desc: 'Alliance en or jaune travaillée, pour dire oui avec éclat.' },
  { id: 15, name: 'Bague Trille',        cat: 'Bagues',             material: 'dore',   price: 13000, occasions: ['Quotidien','Cadeau'],        rating: 4, glyph: '💍', tag: 'Petit prix',
    desc: 'Trois anneaux dorés entrelacés, une bague du quotidien pleine de charme.' },
  { id: 16, name: 'Collier Étoilé',      cat: 'Colliers',           material: 'dore',   price: 26000, occasions: ['Cadeau','Cérémonie'],        rating: 5, glyph: '📿', tag: null,
    desc: 'Semé d\u2019étoiles dorées sur chaîne fine, un ciel autour du cou.' },
  { id: 17, name: 'Bracelet Gourmette',  cat: 'Bracelets',          material: 'rose',   price: 24000, occasions: ['Cadeau','Cérémonie'],        rating: 4, glyph: '💫', tag: null,
    desc: 'Gourmette or rose personnalisable, un cadeau qui reste.' },
  { id: 18, name: 'Créoles Lune',        cat: "Boucles d'oreilles", material: 'rose',   price: 15000, occasions: ['Quotidien','Cadeau'],        rating: 5, glyph: '💎', tag: null,
    desc: 'Créoles or rose au fini satiné, douceur assurée au quotidien.' },
];
