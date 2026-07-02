import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RevealDirective } from '../../directives/reveal.directive';
import { ContactForm } from '../../models/institut.models';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, RevealDirective],
  template: `
    <section class="py-24 bg-gray-50" id="contact">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" appReveal>
          <span class="text-orange font-semibold uppercase tracking-widest text-sm">Contactez-nous</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-navy mt-2">Parlons de votre projet</h2>
          <div class="w-20 h-1.5 bg-orange rounded-full mx-auto mt-4"></div>
        </div>

        <div class="grid lg:grid-cols-5 gap-10">
          <!-- Contact info -->
          <div class="lg:col-span-2 space-y-5" appReveal>
            <div class="bg-navy rounded-2xl p-8 text-white space-y-6 shadow-xl">
              <div class="flex items-start gap-4">
                <span class="text-2xl">📞</span>
                <div>
                  <p class="font-semibold">Téléphone</p>
                  <a href="tel:+237679800266" class="text-white/80 hover:text-orange transition-colors block">
                    679 800 266
                  </a>
                  <a href="tel:+237696649878" class="text-white/80 hover:text-orange transition-colors block">
                    696 649 878
                  </a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <span class="text-2xl">✉️</span>
                <div>
                  <p class="font-semibold">Email</p>
                  <a
                    href="mailto:maglinguainstitut@gmail.com"
                    class="text-white/80 hover:text-orange transition-colors break-all"
                  >
                    maglinguainstitut&#64;gmail.com
                  </a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <span class="text-2xl">🌐</span>
                <div>
                  <p class="font-semibold">Site web</p>
                  <a
                    href="https://www.maglinguainstitut.com"
                    target="_blank"
                    rel="noopener"
                    class="text-white/80 hover:text-orange transition-colors"
                  >
                    www.maglinguainstitut.com
                  </a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <span class="text-2xl">📘</span>
                <div>
                  <p class="font-semibold">Facebook</p>
                  <a
                    href="https://facebook.com/maglinguainstitut"
                    target="_blank"
                    rel="noopener"
                    class="text-white/80 hover:text-orange transition-colors"
                  >
                    Mag Lingua Institut
                  </a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <span class="text-2xl">📍</span>
                <div>
                  <p class="font-semibold">Adresse</p>
                  <p class="text-white/80">
                    Yassa, Immeuble voisin à l'Institut Supérieur la Perle, Chez Mag Lingua Institut
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact form -->
          <div class="lg:col-span-3" appReveal style="transition-delay: 150ms">
            <form
              (ngSubmit)="onSubmit()"
              class="bg-white rounded-2xl shadow-xl p-8 space-y-5 relative overflow-hidden"
            >
              <div class="grid sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-medium text-navy mb-1.5">Nom complet</label>
                  <input
                    type="text"
                    name="name"
                    [(ngModel)]="form().name"
                    (ngModelChange)="updateField('name', $event)"
                    required
                    placeholder="Votre nom"
                    class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none
                           focus:ring-2 focus:ring-orange/50 focus:border-orange transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-navy mb-1.5">Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    [(ngModel)]="form().phone"
                    (ngModelChange)="updateField('phone', $event)"
                    placeholder="6XX XXX XXX"
                    class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none
                           focus:ring-2 focus:ring-orange/50 focus:border-orange transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-navy mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  [(ngModel)]="form().email"
                  (ngModelChange)="updateField('email', $event)"
                  required
                  placeholder="vous@email.com"
                  class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none
                         focus:ring-2 focus:ring-orange/50 focus:border-orange transition-all duration-200"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-navy mb-1.5">Langue / Sujet</label>
                <select
                  name="subject"
                  [(ngModel)]="form().subject"
                  (ngModelChange)="updateField('subject', $event)"
                  class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none
                         focus:ring-2 focus:ring-orange/50 focus:border-orange transition-all duration-200 bg-white"
                >
                  <option value="">Sélectionnez un sujet</option>
                  @for (opt of subjectOptions; track opt) {
                    <option [value]="opt">{{ opt }}</option>
                  }
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-navy mb-1.5">Message</label>
                <textarea
                  name="message"
                  [(ngModel)]="form().message"
                  (ngModelChange)="updateField('message', $event)"
                  required
                  rows="4"
                  placeholder="Parlez-nous de votre projet ou de vos questions..."
                  class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none
                         focus:ring-2 focus:ring-orange/50 focus:border-orange transition-all duration-200 resize-none"
                ></textarea>
                <p class="text-xs text-gray-400 mt-1 text-right">{{ messageLength() }} caractères</p>
              </div>

              <button
                type="submit"
                [disabled]="!isValid() || submitState() === 'submitting'"
                class="w-full bg-orange hover:bg-orange-light disabled:opacity-50 disabled:cursor-not-allowed
                       text-white font-semibold py-3.5 rounded-lg shadow-md hover:shadow-xl
                       transition-all duration-300 flex items-center justify-center gap-2"
              >
                @if (submitState() === 'submitting') {
                  <span
                    class="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
                  ></span>
                  Envoi en cours...
                } @else {
                  Envoyer le message
                }
              </button>

              @if (submitState() === 'success') {
                <div
                  class="toast-enter absolute top-4 right-4 bg-teal text-white text-sm font-medium
                         px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2"
                >
                  ✅ Message envoyé avec succès !
                </div>
              }
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  form = signal<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  submitState = signal<SubmitState>('idle');

  subjectOptions = [
    'Français',
    'Anglais',
    'Italien',
    'Chinois',
    'Allemand',
    'Espagnol',
    'Préparation examen',
    'Assistance visa',
    'Autre',
  ];

  messageLength = computed(() => this.form().message.length);

  isValid = computed(() => {
    const f = this.form();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email);
    return f.name.trim().length > 1 && emailOk && f.message.trim().length > 5;
  });

  updateField<K extends keyof ContactForm>(key: K, value: ContactForm[K]): void {
    this.form.update((f) => ({ ...f, [key]: value }));
  }

  onSubmit(): void {
    if (!this.isValid()) return;

    this.submitState.set('submitting');

    // Simule l'envoi (à remplacer par un appel API / EmailJS / backend réel)
    setTimeout(() => {
      this.submitState.set('success');
      this.form.set({ name: '', email: '', phone: '', subject: '', message: '' });

      setTimeout(() => this.submitState.set('idle'), 3500);
    }, 1200);
  }
}
