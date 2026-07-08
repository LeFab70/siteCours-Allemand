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
  template: `
    <!-- Bouton flottant -->
    <button
      (click)="toggle()"
      class="fixed bottom-6 right-6 z-[60] w-16 h-16 rounded-full bg-navy text-white shadow-2xl
             flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200"
      [class.animate-pulse-soft]="!open()"
      aria-label="Ouvrir le chat"
    >
      @if (!open()) {
        <span class="text-3xl">🤖</span>
        @if (unread()) {
          <span
            class="absolute -top-1 -right-1 w-5 h-5 bg-orange text-white text-xs font-bold rounded-full
                   flex items-center justify-center animate-bounce"
            >1</span
          >
        }
      } @else {
        <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      }
    </button>

    <!-- Fenêtre de chat -->
    @if (open()) {
      <div
        class="fixed bottom-24 right-6 z-[60] w-[92vw] max-w-sm rounded-3xl bg-white shadow-2xl
               overflow-hidden flex flex-col animate-fade-in-up origin-bottom-right"
        style="height: min(72vh, 560px)"
      >
        <!-- En-tête -->
        <div
          class="text-white p-4 flex items-center gap-3 bg-200%"
          style="background: linear-gradient(120deg,#0d2c54,#123a6e,#f5821f); background-size:200% 200%"
        >
          <div class="relative w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-2xl">
            🤖
            <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
          </div>
          <div class="leading-tight">
            <p class="font-bold">Lingua • Assistant IA</p>
            <p class="text-xs text-white/80">En ligne — réponse immédiate</p>
          </div>
        </div>

        <!-- Messages -->
        <div #zone class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          @for (m of messages(); track $index) {
            <div class="flex" [class.justify-end]="m.from === 'user'">
              <div
                class="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm"
                [class]="m.from === 'user'
                  ? 'bg-orange text-white rounded-br-md'
                  : 'bg-white text-gray-700 rounded-bl-md'"
              >
                {{ m.text }}
              </div>
            </div>
          }

          @if (typing()) {
            <div class="flex">
              <div class="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm flex gap-1">
                <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay:0s"></span>
                <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay:.15s"></span>
                <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay:.3s"></span>
              </div>
            </div>
          }
        </div>

        <!-- Suggestions -->
        <div class="px-3 pt-2 flex flex-wrap gap-2 bg-white">
          @for (s of suggestions; track s) {
            <button
              (click)="useSuggestion(s)"
              class="text-xs font-semibold text-navy bg-gray-100 hover:bg-orange/10 px-3 py-1.5 rounded-full transition"
            >
              {{ s }}
            </button>
          }
        </div>

        <!-- Saisie -->
        <form (ngSubmit)="send()" class="p-3 bg-white flex items-center gap-2">
          <input
            [ngModel]="input()"
            (ngModelChange)="input.set($event)"
            name="input"
            type="text"
            placeholder="Écrivez votre message..."
            autocomplete="off"
            class="flex-1 rounded-full bg-gray-100 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange/40"
          />
          <button
            type="submit"
            [disabled]="!input().trim()"
            class="w-10 h-10 shrink-0 rounded-full bg-orange text-white flex items-center justify-center
                   hover:bg-orange-light disabled:opacity-40 transition"
            aria-label="Envoyer"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z" /></svg>
          </button>
        </form>
      </div>
    }
  `,
})
export class ChatbotComponent {
  private injector = inject(Injector);

  open = signal(false);
  input = signal('');
  typing = signal(false);
  unread = signal(true);

  messages = signal<Msg[]>([
    {
      from: 'bot',
      text: "Bonjour 👋 Je suis Lingua, l'assistant virtuel de MAG LINGUA INSTITUT. Comment puis-je vous aider ?",
    },
  ]);

  suggestions = ['Quelles langues ?', 'Les tarifs ?', 'Assistance visa', 'Contact'];

  zone = viewChild<ElementRef<HTMLDivElement>>('zone');

  toggle(): void {
    this.open.update((v) => !v);
    if (this.open()) {
      this.unread.set(false);
      this.scrollToBottom();
    }
  }

  useSuggestion(s: string): void {
    this.input.set(s);
    this.send();
  }

  send(): void {
    const text = this.input().trim();
    if (!text || this.typing()) return;

    this.messages.update((m) => [...m, { from: 'user', text }]);
    this.input.set('');
    this.scrollToBottom();

    this.typing.set(true);
    const reply = this.buildReply(text);
    setTimeout(() => {
      this.typing.set(false);
      this.messages.update((m) => [...m, { from: 'bot', text: reply }]);
      this.scrollToBottom();
    }, 900);
  }

  private buildReply(input: string): string {
    const t = input
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const has = (...w: string[]) => w.some((x) => t.includes(x));
    const pick = (choices: string[]) => choices[Math.floor(Math.random() * choices.length)];

    if (has('bonjour', 'salut', 'coucou', 'hello', 'bonsoir', 'hey'))
      return pick([
        'Bonjour et bienvenue chez MAG LINGUA INSTITUT ! 😊 Voulez-vous des infos sur nos langues, tarifs, examens ou l’assistance visa ?',
        'Salut ! Ravi de vous accueillir 👋. Je peux vous renseigner sur les cours, certifications, inscriptions ou visas. Que souhaitez-vous savoir ?',
      ]);

    if (has('allemand', 'deutsch', 'goethe', 'telc'))
      return 'Notre cours d’allemand prépare aux certifications TELC et Goethe-Zertifikat (A1 à C1) 🇩🇪. Voulez-vous vous pré-inscrire ?';
    if (has('anglais', 'english', 'ielts', 'toefl'))
      return 'En anglais, nous préparons à l’IELTS et au TOEFL, avec un focus sur l’oral 🇬🇧. Quel est votre niveau actuel ?';
    if (has('francais', 'tcf', 'fle'))
      return 'Notre cours de français couvre l’expression, la compréhension et la préparation au TCF 🇫🇷.';
    if (has('italien', 'cils', 'plida'))
      return 'L’italien chez nous, la langue de l’art et de la culture 🇮🇹, avec préparation CILS et PLIDA.';
    if (has('chinois', 'mandarin', 'hsk'))
      return 'Le chinois vous ouvre le marché de demain 🇨🇳. Des bases solides à l’oral comme à l’écrit.';
    if (has('espagnol', 'espanol'))
      return 'L’espagnol, une langue et plusieurs mondes 🇪🇸 ! Cours dynamiques pour communiquer vite.';

    if (has('langue', 'cours', 'apprendre', 'formation'))
      return 'Nous enseignons 6 langues : Français, Anglais, Italien, Chinois, Allemand et Espagnol 🌍. Laquelle vous intéresse ?';
    if (has('niveau', 'debutant', 'a1', 'a2', 'b1', 'b2', 'c1', 'avance', 'intermediaire'))
      return 'Nous accueillons tous les niveaux, du grand débutant (A1) au niveau avancé (C1). Un test de positionnement gratuit vous oriente 📊.';
    if (has('duree', 'combien de temps', 'rythme', 'semaine', 'mois', 'seance', 'frequence'))
      return 'Les sessions durent 2 à 3 mois selon le niveau, avec plusieurs séances/semaine. Formules intensives possibles ⏱️.';
    if (has('en ligne', 'distance', 'presentiel', 'zoom', 'ligne', 'online'))
      return 'Cours en présentiel à Yassa, et certaines formules en ligne 💻. Dites-nous votre préférence !';
    if (has('prix', 'tarif', 'cout', 'frais', 'combien', 'montant', 'paiement', 'payer'))
      return 'Frais d’inscription : 15 000 FCFA. Le tarif des cours dépend de la langue et du niveau — devis personnalisé et paiement échelonné possibles 💳.';
    if (has('inscri', 'quand', 'date', 'rentree', 'debut', 'commence', 'place'))
      return 'Les inscriptions débutent le 15 Juillet 📅. Réservez via le formulaire de contact ou passez à l’institut !';
    if (has('visa', 'voyage', 'etranger', 'partir', 'canada', 'europe', 'ambassade', 'immigration', 'dossier'))
      return 'Accompagnement de A à Z ✈️ : conseils, constitution du dossier, rendez-vous et suivi jusqu’à l’obtention du visa.';
    if (has('examen', 'certif', 'diplome', 'attestation'))
      return 'Nous préparons aux certifications : TCF, TELC, Goethe-Zertifikat, IELTS, TOEFL, CILS et PLIDA 🎓.';
    if (has('informatique', 'ordinateur', 'bureautique', 'word', 'excel', 'programmation', 'code'))
      return 'Oui ! Nous proposons aussi des formations en informatique et bureautique 🖥️. Demandez le programme.';
    if (has('contact', 'telephone', 'numero', 'appeler', 'joindre', 'email', 'mail'))
      return 'Contactez-nous au 679 800 266 / 696 649 878, par email maglinguainstitut@gmail.com, ou via WhatsApp 📞.';
    if (has('whatsapp', 'wpp', 'chat'))
      return 'Écrivez-nous sur WhatsApp au 679 800 266 💬 — bouton disponible dans la section Contact !';
    if (has('adresse', 'ou ', 'situe', 'localisation', 'yassa', 'trouver', 'plan', 'venir'))
      return 'Nous sommes à Yassa 📍, immeuble voisin de l’Institut Supérieur la Perle (Chez Mag Lingua Institut).';
    if (has('horaire', 'heure', 'ouvert', 'ferme', 'disponible'))
      return 'Nous vous accueillons du lundi au samedi. Appelez-nous pour convenir d’un créneau 🕘.';
    if (has('avis', 'temoignage', 'reput', 'serieux', 'confiance'))
      return 'Nos apprenants nous notent en moyenne 4,7/5 ⭐ ! Voir la section « Avis » du site.';
    if (has('facebook', 'tiktok', 'youtube', 'instagram', 'linkedin', 'reseau', 'suivre', 'page', 'actualite'))
      return 'Suivez-nous partout 📱 : Facebook, TikTok, YouTube, Instagram et LinkedIn (@maglinguainstitut). Tips, lives et offres exclusives vous y attendent !';
    if (has('merci', 'super', 'genial', 'parfait', 'top'))
      return pick([
        'Avec plaisir ! 😊 N’hésitez pas si vous avez d’autres questions.',
        'Je vous en prie ! Belle journée et à bientôt chez MAG LINGUA INSTITUT 🌟.',
      ]);
    if (has('au revoir', 'bye', 'a bientot', 'ciao'))
      return 'À bientôt ! 👋 Pensez à réserver votre place, les inscriptions ouvrent le 15 Juillet.';

    return pick([
      'Bonne question ! Notre équipe pourra vous répondre en détail 😊. Demandez-moi : langues, niveaux, tarifs, examens, visa, horaires ou contact.',
      'Je n’ai pas la réponse exacte, mais l’équipe oui ! Écrivez-nous via le formulaire ou au 679 800 266. Essayez : « tarifs », « visa » ou « inscriptions ».',
    ]);
  }

  private scrollToBottom(): void {
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
