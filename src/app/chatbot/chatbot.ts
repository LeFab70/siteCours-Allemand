import {
  Component,
  signal,
  ElementRef,
  viewChild,
  afterNextRender,
  Injector,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Msg {
  from: 'bot' | 'user';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chatbot.html',
})
export class Chatbot {
  private injector = inject(Injector);

  readonly ouvert = signal(false);
  readonly saisie = signal('');
  readonly enTrainEcrire = signal(false);
  readonly messages = signal<Msg[]>([
    {
      from: 'bot',
      text: "Bonjour 👋 Je suis Lingua, l'assistant virtuel de MAG LINGUA INSTITUT. Comment puis-je vous aider ?",
    },
  ]);

  readonly suggestions = ['Quelles langues ?', 'Les tarifs ?', 'Assistance visa', 'Contact'];

  readonly nonLu = signal(true);

  readonly zone = viewChild<ElementRef<HTMLDivElement>>('zone');

  basculer(): void {
    this.ouvert.update((v) => !v);
    if (this.ouvert()) {
      this.nonLu.set(false);
      this.scrollEnBas();
    }
  }

  utiliserSuggestion(s: string): void {
    this.saisie.set(s);
    this.envoyer();
  }

  envoyer(): void {
    const texte = this.saisie().trim();
    if (!texte || this.enTrainEcrire()) return;

    this.messages.update((m) => [...m, { from: 'user', text: texte }]);
    this.saisie.set('');
    this.scrollEnBas();

    this.enTrainEcrire.set(true);
    const reponse = this.genererReponse(texte);
    setTimeout(() => {
      this.enTrainEcrire.set(false);
      this.messages.update((m) => [...m, { from: 'bot', text: reponse }]);
      this.scrollEnBas();
    }, 900);
  }

  private genererReponse(entree: string): string {
    const t = entree
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const contient = (...mots: string[]) => mots.some((mot) => t.includes(mot));
    const auHasard = (choix: string[]) => choix[Math.floor(Math.random() * choix.length)];

    // Salutations
    if (contient('bonjour', 'salut', 'coucou', 'hello', 'bonsoir', 'hey')) {
      return auHasard([
        'Bonjour et bienvenue chez MAG LINGUA INSTITUT ! 😊 Voulez-vous des infos sur nos langues, tarifs, examens ou l’assistance visa ?',
        'Salut ! Ravi de vous accueillir 👋. Je peux vous renseigner sur les cours, les certifications, les inscriptions ou les visas. Que souhaitez-vous savoir ?',
      ]);
    }

    // Langue précise
    if (contient('allemand', 'deutsch', 'goethe', 'telc')) {
      return 'Notre cours d’allemand prépare aux certifications TELC et Goethe-Zertifikat (A1 à C1) 🇩🇪. Précision et rigueur garanties ! Voulez-vous vous pré-inscrire ?';
    }
    if (contient('anglais', 'english', 'ielts', 'toefl')) {
      return 'En anglais, nous préparons à l’IELTS et au TOEFL, avec un accent sur l’oral et la confiance 🇬🇧. Quel est votre niveau actuel ?';
    }
    if (contient('francais', 'tcf', 'fle')) {
      return 'Notre cours de français couvre l’expression, la compréhension et la préparation au TCF 🇫🇷. Idéal pour vos études ou l’immigration.';
    }
    if (contient('italien', 'cils', 'plida')) {
      return 'L’italien chez nous, c’est la langue de l’art et de la culture 🇮🇹, avec préparation aux certifications CILS et PLIDA.';
    }
    if (contient('chinois', 'mandarin', 'hsk')) {
      return 'Le chinois vous ouvre le marché de demain 🇨🇳. Nous débutons des bases solides à l’oral comme à l’écrit.';
    }
    if (contient('espagnol', 'espanol')) {
      return 'L’espagnol, une langue et plusieurs mondes 🇪🇸 ! Cours dynamiques pour communiquer rapidement.';
    }

    // Langues en général
    if (contient('langue', 'cours', 'apprendre', 'formation')) {
      return 'Nous enseignons 6 langues : Français, Anglais, Italien, Chinois, Allemand et Espagnol 🌍. Laquelle vous intéresse ?';
    }

    // Niveaux
    if (contient('niveau', 'debutant', 'a1', 'a2', 'b1', 'b2', 'c1', 'avance', 'intermediaire')) {
      return 'Nous accueillons tous les niveaux, du grand débutant (A1) jusqu’au niveau avancé (C1). Un test de positionnement gratuit vous oriente vers le bon groupe 📊.';
    }

    // Durée / rythme
    if (contient('duree', 'combien de temps', 'rythme', 'semaine', 'mois', 'seance', 'frequence')) {
      return 'Les sessions durent généralement 2 à 3 mois selon le niveau, avec plusieurs séances par semaine. Des formules intensives sont aussi possibles ⏱️.';
    }

    // Modalité présentiel / en ligne
    if (contient('en ligne', 'distance', 'presentiel', 'zoom', 'ligne', 'online')) {
      return 'Les cours se déroulent en présentiel à Douala - Yassa, et certaines formules sont disponibles en ligne 💻. Dites-nous votre préférence !';
    }

    // Tarifs / frais
    if (contient('prix', 'tarif', 'cout', 'frais', 'combien', 'montant', 'paiement', 'payer')) {
      return 'Les frais d’inscription sont de 15 000 FCFA. Le tarif des cours dépend de la langue et du niveau — contactez-nous pour un devis personnalisé, paiement échelonné possible 💳.';
    }

    // Inscription / dates
    if (contient('inscri', 'quand', 'date', 'rentree', 'debut', 'commence', 'place')) {
      return 'La rentrée est prévue le lundi 20 Juillet 📅 et les inscriptions se poursuivent. Réservez votre place via le formulaire de contact ou passez directement à l’institut !';
    }

    // Visa / voyage
    if (contient('visa', 'voyage', 'etranger', 'partir', 'canada', 'europe', 'ambassade', 'immigration', 'dossier')) {
      return 'Nous vous accompagnons de A à Z ✈️ : conseils personnalisés, constitution du dossier, prise de rendez-vous et suivi jusqu’à l’obtention de votre visa.';
    }

    // Examens / certifications
    if (contient('examen', 'certif', 'diplome', 'attestation')) {
      return 'Nous préparons aux certifications internationales : TCF, TELC, Goethe-Zertifikat, IELTS, TOEFL, CILS et PLIDA 🎓.';
    }

    // Informatique
    if (contient('informatique', 'ordinateur', 'bureautique', 'word', 'excel', 'programmation', 'code')) {
      return 'Oui ! Nous proposons aussi des formations en informatique et bureautique 🖥️. Demandez-nous le programme détaillé.';
    }

    // Contact
    if (contient('contact', 'telephone', 'numero', 'appeler', 'joindre', 'email', 'mail')) {
      return 'Contactez-nous au 679 800 266 (MTN / WhatsApp) ou 696 649 878 (Orange), par email à maglinguainstitut@gmail.com 📞. Le formulaire de contact est juste en dessous !';
    }
    if (contient('whatsapp', 'wpp', 'chat')) {
      return 'Vous pouvez nous écrire directement sur WhatsApp au 679 800 266 (MTN) 💬 — bouton disponible dans la section Contact !';
    }

    // Adresse
    if (contient('adresse', 'ou ', 'situe', 'localisation', 'yassa', 'trouver', 'plan', 'venir')) {
      return 'Nous sommes à Douala - Yassa 📍, dans l’immeuble voisin de l’Institut Supérieur la Perle (Chez Mag Lingua Institut).';
    }

    // Horaires
    if (contient('horaire', 'heure', 'ouvert', 'ferme', 'disponible')) {
      return 'Nos équipes vous accueillent du lundi au samedi. Appelez-nous ou passez nous voir pour convenir d’un créneau 🕘.';
    }

    // Avis
    if (contient('avis', 'temoignage', 'reput', 'serieux', 'confiance')) {
      return 'Nos apprenants nous notent en moyenne 4,7/5 ⭐ ! Découvrez leurs témoignages dans la section « Avis » du site.';
    }

    // Réseaux
    if (contient('facebook', 'tiktok', 'youtube', 'instagram', 'linkedin', 'reseau', 'suivre', 'page', 'actualite')) {
      return 'Suivez-nous partout 📱 : Facebook, TikTok, YouTube, Instagram et LinkedIn (@maglinguainstitut). Tips, lives et offres exclusives vous y attendent !';
    }

    // Remerciements / clôture
    if (contient('merci', 'super', 'genial', 'parfait', 'top')) {
      return auHasard([
        'Avec plaisir ! 😊 N’hésitez pas si vous avez d’autres questions.',
        'Je vous en prie ! Belle journée et à très bientôt chez MAG LINGUA INSTITUT 🌟.',
      ]);
    }
    if (contient('au revoir', 'bye', 'a bientot', 'ciao')) {
      return 'À bientôt ! 👋 Pensez à réserver votre place, la rentrée est le lundi 20 Juillet et les inscriptions se poursuivent.';
    }

    // Repli
    return auHasard([
      "Bonne question ! Notre équipe pourra vous répondre en détail 😊. Vous pouvez me demander : langues, niveaux, tarifs, examens, visa, horaires ou contact.",
      "Je n’ai pas la réponse exacte, mais l’équipe oui ! Écrivez-nous via le formulaire ou WhatsApp au 679 800 266. Essayez aussi : « tarifs », « visa » ou « inscriptions ».",
    ]);
  }

  private scrollEnBas(): void {
    afterNextRender(
      {
        write: () => {
          const el = this.zone()?.nativeElement;
          if (el) el.scrollTop = el.scrollHeight;
        },
      },
      { injector: this.injector },
    );
  }
}
