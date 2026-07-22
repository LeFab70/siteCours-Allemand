export interface Langue {
  nom: string;
  drapeau: string; // emoji drapeau
  slogan: string;
  couleur: string; // classe de dégradé tailwind
}

export interface Examen {
  sigle: string;
  description: string;
  langue: string;
  accent: string; // classe de couleur d'accent
}

export interface ServiceVisa {
  titre: string;
  icone: string; // emoji
}

export interface InfoContact {
  telephones: string[];
  email: string;
  siteWeb: string;
  facebook: string;
  facebookUrl: string;
  adresse: string;
}

export interface ReseauSocial {
  nom: string;
  url: string;
  handle: string;
  couleur: string;
  description: string;
}

export interface Avis {
  nom: string;
  initiales: string;
  categorie: 'Cours' | 'Voyage';
  note: number; // sur 5
  commentaire: string;
  couleur: string; // classe de fond pour l'avatar
}

export interface Service {
  titre: string;
  icone: string; // emoji
}

export interface Tarif {
  niveau: string;
  scolarite: string;
  manuel: string;
  duree: string;
  populaire?: boolean;
}

export interface TarifLangue {
  nom: string;
  drapeau: string;
  prixNiveau: string; // FCFA par niveau
  couleur: string; // classe de dégradé tailwind
}

export interface CoursVacances {
  matieres: string[];
  prix: string;
  debut: string; // date de début (pour le compte à rebours)
  periode: string; // texte complet de la période
  publicCible: string;
}

export interface TarifExamensIntl {
  sigles: string[];
  prix: string;
  duree: string;
  reductionBacheliers: string;
  noteInternes: string;
}

export const LANGUES: Langue[] = [
  { nom: 'Français', drapeau: '🇫🇷', slogan: 'Parlez, comprenez, réussissez.', couleur: 'from-blue-600 to-blue-800' },
  { nom: 'Anglais', drapeau: '🇬🇧', slogan: 'Communiquez avec le monde.', couleur: 'from-indigo-600 to-blue-900' },
  { nom: 'Italien', drapeau: '🇮🇹', slogan: "La langue de l'art et de la culture.", couleur: 'from-green-600 to-emerald-800' },
  { nom: 'Chinois', drapeau: '🇨🇳', slogan: 'Ouvrez-vous au marché de demain.', couleur: 'from-red-600 to-rose-800' },
  { nom: 'Allemand', drapeau: '🇩🇪', slogan: 'Précision, rigueur et opportunités.', couleur: 'from-yellow-500 to-amber-700' },
  { nom: 'Espagnol', drapeau: '🇪🇸', slogan: 'Une langue, plusieurs mondes.', couleur: 'from-orange-500 to-red-700' },
];

export const EXAMENS: Examen[] = [
  { sigle: 'TCF', description: 'Test de Connaissance du Français', langue: 'Français', accent: 'text-brand-blue' },
  { sigle: 'TELC', description: "Certification officielle d'allemand", langue: 'Allemand', accent: 'text-brand-navy' },
  { sigle: 'Goethe-Zertifikat', description: "Certification officielle d'allemand", langue: 'Allemand', accent: 'text-brand-green' },
  { sigle: 'ECL', description: "Certification européenne d'allemand", langue: 'Allemand', accent: 'text-brand-blue' },
  { sigle: 'ÖSD', description: "Certification officielle d'allemand (autrichienne)", langue: 'Allemand', accent: 'text-brand-orange' },
  { sigle: 'IELTS', description: 'International English Language Testing System', langue: 'Anglais', accent: 'text-red-600' },
  { sigle: 'TOEFL', description: 'Test of English as a Foreign Language', langue: 'Anglais', accent: 'text-brand-blue' },
  { sigle: 'CILS', description: "Certification officielle d'italien", langue: 'Italien', accent: 'text-brand-green' },
  { sigle: 'PLIDA', description: "Certification officielle d'italien", langue: 'Italien', accent: 'text-brand-navy' },
  { sigle: 'CELI', description: "Certificat de connaissance de la langue italienne", langue: 'Italien', accent: 'text-brand-orange' },
  { sigle: 'CIC', description: "Certification d'italien commercial", langue: 'Italien', accent: 'text-red-600' },
];

export const SERVICES_VISA: ServiceVisa[] = [
  { titre: 'Conseils personnalisés pour vos projets de voyage', icone: '✈️' },
  { titre: 'Assistance dans la constitution de vos dossiers', icone: '📄' },
  { titre: 'Prise de rendez-vous et suivi des démarches', icone: '📅' },
  { titre: "Accompagnement jusqu'à l'obtention de votre visa", icone: '🛡️' },
];

export const INFO_CONTACT: InfoContact = {
  telephones: ['679 800 266', '696 649 878'], // MTN (WhatsApp, vérifié) en premier, puis Orange
  email: 'maglinguainstitut@gmail.com',
  siteWeb: 'maglinguainstitut.com',
  facebook: 'Mag Lingua Institut',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61591799831083',
  adresse: "Douala - Yassa, Immeuble voisin à l'Institut Supérieur la Perle, Chez Mag Lingua Institut",
};

/** Liens sociaux (placeholders à remplacer par les vrais comptes) — utiles pour monétisation & trafic */
export const RESEAUX_SOCIAUX: ReseauSocial[] = [
  {
    nom: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61591799831083',
    handle: '@Mag Lingua Institut',
    couleur: '#1877F2',
    description: 'Actualités & communauté',
  },
  {
    nom: 'TikTok',
    url: 'https://www.tiktok.com/@maglingua.institut',
    handle: '@maglingua.institut',
    couleur: '#010101',
    description: 'Cours courts & tips',
  },
  {
    nom: 'YouTube',
    url: 'https://www.youtube.com/@maglinguainstitut',
    handle: '@maglinguainstitut',
    couleur: '#FF0000',
    description: 'Vidéos & tutoriels',
  },
  {
    nom: 'WhatsApp',
    url: 'https://wa.me/237679800266?text=Bonjour%20MAG%20LINGUA%20INSTITUT',
    handle: '679 800 266',
    couleur: '#25D366',
    description: 'Contact rapide',
  },
];

export const FRAIS_INSCRIPTION = '15 000 FCFA';
export const DEBUT_INSCRIPTION = 'Tous les mois';

export const AVIS: Avis[] = [
  {
    nom: 'Sandrine M.',
    initiales: 'SM',
    categorie: 'Cours',
    note: 5,
    commentaire:
      "Grâce au cours d'allemand, j'ai obtenu mon Goethe-Zertifikat B1 du premier coup. Formateurs au top !",
    couleur: 'from-blue-500 to-blue-700',
  },
  {
    nom: 'Boris T.',
    initiales: 'BT',
    categorie: 'Voyage',
    note: 4.5,
    commentaire:
      "Accompagnement visa impeccable pour mon départ au Canada. Dossier accepté, un grand merci à l'équipe.",
    couleur: 'from-orange-500 to-red-600',
  },
  {
    nom: 'Aïcha D.',
    initiales: 'AD',
    categorie: 'Cours',
    note: 5,
    commentaire:
      "Ambiance conviviale et méthode efficace en anglais. J'ai gagné en confiance pour l'IELTS.",
    couleur: 'from-emerald-500 to-green-700',
  },
  {
    nom: 'Georges N.',
    initiales: 'GN',
    categorie: 'Voyage',
    note: 4,
    commentaire:
      'Conseils personnalisés et suivi sérieux de mon dossier. Je recommande pour tout projet à l’étranger.',
    couleur: 'from-indigo-500 to-blue-800',
  },
  {
    nom: 'Laëtitia K.',
    initiales: 'LK',
    categorie: 'Cours',
    note: 4.5,
    commentaire:
      "Cours d'italien vivant et interactif. Les professeurs sont patients et vraiment à l'écoute.",
    couleur: 'from-rose-500 to-pink-700',
  },
  {
    nom: 'Yannick E.',
    initiales: 'YE',
    categorie: 'Voyage',
    note: 5,
    commentaire:
      "De la prise de rendez-vous à l'obtention du visa, tout a été fluide. Une équipe de confiance.",
    couleur: 'from-amber-500 to-orange-700',
  },
];

export const SERVICES: Service[] = [
  { titre: 'Cours de langues aux normes internationales et préparation aux examens', icone: '🌍' },
  { titre: "Études supérieures à l'étranger", icone: '🎓' },
  { titre: 'Formations et emplois', icone: '💼' },
  { titre: 'Au pair, volontariat, regroupement familial, soins infirmiers', icone: '🤝' },
  { titre: 'Traduction et interprétariat', icone: '🗣️' },
];

export const SERVICES_NB =
  'Cours du jour et du soir, en ligne et en présentiel. Wifi et salles climatisées.';

export const TARIFS: Tarif[] = [
  { niveau: 'A1', scolarite: '100 000', manuel: '15 000', duree: '10 semaines' },
  { niveau: 'A2', scolarite: '100 000', manuel: '15 000', duree: '10 semaines' },
  { niveau: 'B1', scolarite: '115 000', manuel: '20 000', duree: '12 semaines', populaire: true },
  { niveau: 'B2', scolarite: '115 000', manuel: '20 000', duree: '12 semaines' },
  { niveau: 'C1', scolarite: '130 000', manuel: '20 000', duree: '12 semaines' },
];

/** Tarifs par niveau pour les langues à prix forfaitaire (hors Français/Anglais/Allemand ci-dessus) */
export const TARIFS_LANGUES: TarifLangue[] = [
  { nom: 'Italien', drapeau: '🇮🇹', prixNiveau: '100 000', couleur: 'from-green-600 to-emerald-800' },
  { nom: 'Chinois', drapeau: '🇨🇳', prixNiveau: '130 000', couleur: 'from-red-600 to-rose-800' },
  { nom: 'Espagnol', drapeau: '🇪🇸', prixNiveau: '130 000', couleur: 'from-orange-500 to-red-700' },
];

export const COURS_VACANCES: CoursVacances = {
  matieres: ['Anglais', 'Français', 'Mathématiques', 'Physique'],
  prix: '50 000',
  debut: '21 Juillet',
  periode: 'Du 21 juillet au 19 août',
  publicCible: 'Élèves',
};

export const TARIF_EXAMENS_INTL: TarifExamensIntl = {
  sigles: ['TCF', 'TOEFL', 'IELTS'],
  prix: '80 000',
  duree: '2 mois',
  reductionBacheliers: '10%',
  noteInternes:
    'Préparation gratuite aux examens pour les internes (apprenants déjà inscrits à un cours).',
};

// Images d'illustration (locales) — étudiants africains, thème apprentissage
export const IMAGES = {
  banniere: 'banniere.jpg',
  hero: 'etudiants.jpg',
  services: 'services.jpg',
  etudes: 'etudiante.jpg',
  vacances: 'vacances.jpg',
};
