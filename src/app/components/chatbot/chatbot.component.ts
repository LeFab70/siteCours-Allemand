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

    if (has('bonjour', 'salut', 'coucou', 'hello', 'bonsoir'))
      return 'Bonjour et bienvenue ! Souhaitez-vous des infos sur nos langues, nos tarifs, les examens ou l’assistance visa ?';
    if (has('langue', 'cours', 'francais', 'anglais', 'italien', 'chinois', 'allemand', 'espagnol'))
      return 'Nous proposons 6 langues : Français, Anglais, Italien, Chinois, Allemand et Espagnol 🌍. Laquelle vous intéresse ?';
    if (has('prix', 'tarif', 'cout', 'frais', 'combien', 'montant'))
      return 'Les frais d’inscription sont de 15 000 FCFA. Le tarif des cours dépend de la langue et du niveau — écrivez-nous pour un devis !';
    if (has('inscri', 'quand', 'date', 'rentree', 'debut', 'commence'))
      return 'Les inscriptions débutent le 15 Juillet 📅. Réservez votre place via le formulaire de contact !';
    if (has('visa', 'voyage', 'etranger', 'partir', 'canada', 'ambassade'))
      return 'Nous vous accompagnons de A à Z : conseils, dossier, prise de rendez-vous et suivi jusqu’à l’obtention du visa ✈️.';
    if (has('examen', 'certif', 'tcf', 'ielts', 'toefl', 'goethe', 'telc', 'cils', 'plida'))
      return 'Nous préparons aux certifications : TCF, TELC, Goethe-Zertifikat, IELTS, TOEFL, CILS et PLIDA 🎓.';
    if (has('contact', 'telephone', 'numero', 'appeler', 'email', 'mail', 'whatsapp'))
      return 'Contactez-nous au 679 800 266 / 696 649 878 ou par email : maglinguainstitut@gmail.com 📞';
    if (has('adresse', 'ou ', 'situe', 'localisation', 'yassa', 'trouver'))
      return 'Nous sommes à Yassa, dans l’immeuble voisin de l’Institut Supérieur la Perle 📍.';
    if (has('horaire', 'heure', 'ouvert', 'ferme'))
      return 'Nos équipes sont disponibles du lundi au samedi. Appelez-nous pour convenir d’un créneau !';
    if (has('merci', 'super', 'genial', 'parfait'))
      return 'Avec plaisir ! 😊 N’hésitez pas si vous avez d’autres questions.';
    if (has('facebook', 'reseau', 'suivre', 'page'))
      return 'Suivez-nous sur Facebook « Mag Lingua Institut » pour ne rien manquer 👍.';
    return "Je n’ai pas toutes les réponses, mais notre équipe oui ! Écrivez-nous via le formulaire de contact ou au 679 800 266. Demandez-moi : langues, tarifs, examens, visa ou contact.";
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
