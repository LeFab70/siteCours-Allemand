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
                  <a href="tel:+237696649878" class="text-white/80 hover:text-orange transition-colors block">
                    696 649 878
                  </a>
                  <a href="tel:+237679800266" class="text-white/80 hover:text-orange transition-colors block">
                    679 800 266
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

              <a
                [href]="whatsappUrl"
                target="_blank"
                rel="noopener"
                class="mt-2 w-full inline-flex items-center justify-center gap-2 bg-teal hover:bg-emerald-600
                       text-white font-bold py-3.5 rounded-lg shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12 2a10 10 0 00-8.6 15.06L2 22l5.06-1.33A10 10 0 1012 2z" /></svg>
                Discuter sur WhatsApp
              </a>
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

        <!-- Carte / géolocalisation -->
        <div class="mt-10" appReveal>
          <div class="flex items-center gap-2 mb-4">
            <span class="text-xl">📍</span>
            <h3 class="font-extrabold text-navy text-lg">Nous trouver</h3>
          </div>
          <div class="rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
            <iframe
              src="https://www.google.com/maps?q=Institut+Sup%C3%A9rieur+la+Perle+Yassa+Douala&output=embed"
              title="Localisation de MAG LINGUA INSTITUT à Yassa"
              width="100%"
              height="340"
              style="border:0"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen
            ></iframe>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Institut+Sup%C3%A9rieur+la+Perle+Yassa+Douala"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 mt-4 text-navy font-semibold hover:text-orange transition-colors"
          >
            Ouvrir dans Google Maps →
          </a>
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

  get whatsappUrl(): string {
    const numero = '237696649878'; // Orange (WhatsApp)
    const texte = encodeURIComponent(
      'Bonjour MAG LINGUA INSTITUT, je souhaite avoir des informations sur vos formations.',
    );
    return `https://wa.me/${numero}?text=${texte}`;
  }

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
