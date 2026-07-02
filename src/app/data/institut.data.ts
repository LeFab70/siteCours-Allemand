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
  adresse: string;
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
  adresse: "Yassa, Immeuble voisin à l'Institut Supérieur la Perle, Chez Mag Lingua Institut",
};

export const FRAIS_INSCRIPTION = '15 000 FCFA';
export const DEBUT_INSCRIPTION = '15 Juillet';
