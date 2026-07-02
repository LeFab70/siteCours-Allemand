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

    if (contient('bonjour', 'salut', 'coucou', 'hello', 'bonsoir')) {
      return 'Bonjour et bienvenue ! Souhaitez-vous des infos sur nos langues, nos tarifs, les examens ou l’assistance visa ?';
    }
    if (contient('langue', 'cours', 'francais', 'anglais', 'italien', 'chinois', 'allemand', 'espagnol')) {
      return 'Nous proposons 6 langues : Français, Anglais, Italien, Chinois, Allemand et Espagnol 🌍. Laquelle vous intéresse ?';
    }
    if (contient('prix', 'tarif', 'cout', 'frais', 'combien', 'montant')) {
      return 'Les frais d’inscription sont de 15 000 FCFA. Le tarif des cours dépend de la langue et du niveau — écrivez-nous pour un devis personnalisé !';
    }
    if (contient('inscri', 'quand', 'date', 'rentree', 'debut', 'commence')) {
      return 'Les inscriptions débutent le 15 Juillet 📅. Réservez votre place dès maintenant via le formulaire de contact !';
    }
    if (contient('visa', 'voyage', 'etranger', 'partir', 'canada', 'ambassade')) {
      return 'Nous vous accompagnons de A à Z : conseils, constitution du dossier, prise de rendez-vous et suivi jusqu’à l’obtention de votre visa ✈️.';
    }
    if (contient('examen', 'certif', 'tcf', 'ielts', 'toefl', 'goethe', 'telc', 'cils', 'plida')) {
      return 'Nous préparons aux certifications : TCF, TELC, Goethe-Zertifikat, IELTS, TOEFL, CILS et PLIDA 🎓.';
    }
    if (contient('contact', 'telephone', 'numero', 'appeler', 'email', 'mail', 'whatsapp')) {
      return 'Contactez-nous au 679 800 266 / 696 649 878 ou par email : maglinguainstitut@gmail.com 📞';
    }
    if (contient('adresse', 'ou ', 'situe', 'localisation', 'yassa', 'trouver')) {
      return 'Nous sommes à Yassa, dans l’immeuble voisin de l’Institut Supérieur la Perle 📍.';
    }
    if (contient('horaire', 'heure', 'ouvert', 'ferme')) {
      return 'Nos équipes sont disponibles du lundi au samedi. Passez nous voir ou appelez-nous pour convenir d’un créneau !';
    }
    if (contient('merci', 'super', 'genial', 'parfait')) {
      return 'Avec plaisir ! 😊 N’hésitez pas si vous avez d’autres questions.';
    }
    if (contient('facebook', 'reseau', 'suivre', 'page')) {
      return 'Suivez-nous sur Facebook « Mag Lingua Institut » pour ne rien manquer de nos actualités 👍.';
    }
    return "Je n’ai pas toutes les réponses, mais notre équipe oui ! Écrivez-nous via le formulaire de contact ou au 679 800 266. Vous pouvez aussi me demander : langues, tarifs, examens, visa ou contact.";
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
