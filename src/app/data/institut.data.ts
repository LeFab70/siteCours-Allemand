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

export interface Avis {
  nom: string;
  initiales: string;
  categorie: 'Cours' | 'Voyage';
  note: number; // sur 5
  commentaire: string;
  couleur: string; // classe de fond pour l'avatar
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
  { sigle: 'IELTS', description: 'International English Language Testing System', langue: 'Anglais', accent: 'text-red-600' },
  { sigle: 'TOEFL', description: 'Test of English as a Foreign Language', langue: 'Anglais', accent: 'text-brand-blue' },
  { sigle: 'CILS', description: "Certification officielle d'italien", langue: 'Italien', accent: 'text-brand-green' },
  { sigle: 'PLIDA', description: "Certification officielle d'italien", langue: 'Italien', accent: 'text-brand-navy' },
];

export const SERVICES_VISA: ServiceVisa[] = [
  { titre: 'Conseils personnalisés pour vos projets de voyage', icone: '✈️' },
  { titre: 'Assistance dans la constitution de vos dossiers', icone: '📄' },
  { titre: 'Prise de rendez-vous et suivi des démarches', icone: '📅' },
  { titre: "Accompagnement jusqu'à l'obtention de votre visa", icone: '🛡️' },
];

export const INFO_CONTACT: InfoContact = {
  telephones: ['679 800 266', '696 649 878'],
  email: 'maglinguainstitut@gmail.com',
  siteWeb: 'www.maglinguainstitut.com',
  facebook: 'Mag Lingua Institut',
  facebookUrl: 'https://www.facebook.com/maglinguainstitut',
  adresse: "Yassa, Immeuble voisin à l'Institut Supérieur la Perle, Chez Mag Lingua Institut",
};

export const FRAIS_INSCRIPTION = '15 000 FCFA';
export const DEBUT_INSCRIPTION = '15 Juillet';

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
