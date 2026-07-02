import {
  Component,
  computed,
  signal,
  viewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

interface Review {
  name: string;
  initials: string;
  category: 'Cours' | 'Voyage';
  rating: number;
  comment: string;
  from: string;
  to: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section class="py-24 bg-gray-50" id="avis">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12" appReveal>
          <span class="text-orange font-semibold uppercase tracking-widest text-sm">Témoignages</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-navy mt-2">Ils nous font confiance</h2>
          <div class="w-20 h-1.5 bg-orange rounded-full mx-auto mt-4"></div>

          <div class="mt-6 inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-sm">
            <span class="relative inline-block text-2xl leading-none tracking-tight">
              <span class="text-gray-300">★★★★★</span>
              <span
                class="absolute inset-0 overflow-hidden text-amber-400"
                [style.width.%]="fillPercent(averageRating())"
                >★★★★★</span
              >
            </span>
            <span class="font-extrabold text-navy text-xl">{{ averageRating() }}/5</span>
            <span class="text-gray-500 text-sm">• {{ reviews.length }} avis clients</span>
          </div>
        </div>

        <div class="relative" (mouseenter)="paused.set(true)" (mouseleave)="paused.set(false)">
          <!-- Bouton précédent -->
          <button
            (click)="scrollBy(-1)"
            class="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white text-navy shadow-lg hover:bg-navy hover:text-white items-center justify-center transition"
            aria-label="Avis précédent"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Piste défilable -->
          <div
            #track
            (scroll)="onScroll()"
            class="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-2"
          >
            @for (r of reviews; track r.name) {
              <div
                class="snap-start shrink-0 w-[85%] sm:w-[46%] lg:w-[31.5%] bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow"
                    [style.background]="'linear-gradient(135deg,' + r.from + ',' + r.to + ')'"
                  >
                    {{ r.initials }}
                  </div>
                  <div>
                    <p class="font-bold text-navy">{{ r.name }}</p>
                    <span
                      class="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                      [class]="r.category === 'Voyage' ? 'bg-orange/15 text-orange' : 'bg-navy/10 text-navy'"
                    >
                      {{ r.category === 'Voyage' ? '✈️ Voyage & Visa' : '📚 Cours de langue' }}
                    </span>
                  </div>
                </div>

                <div class="mt-4 flex items-center gap-2">
                  <span class="relative inline-block text-lg leading-none tracking-tight">
                    <span class="text-gray-300">★★★★★</span>
                    <span
                      class="absolute inset-0 overflow-hidden text-amber-400"
                      [style.width.%]="fillPercent(r.rating)"
                      >★★★★★</span
                    >
                  </span>
                  <span class="text-sm font-semibold text-navy">{{ r.rating }}/5</span>
                </div>

                <p class="text-gray-600 mt-3 text-sm leading-relaxed">« {{ r.comment }} »</p>
              </div>
            }
          </div>

          <!-- Bouton suivant -->
          <button
            (click)="scrollBy(1)"
            class="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white text-navy shadow-lg hover:bg-navy hover:text-white items-center justify-center transition"
            aria-label="Avis suivant"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Points indicateurs -->
        <div class="flex justify-center gap-2 mt-6">
          @for (r of reviews; track r.name; let i = $index) {
            <button
              (click)="goTo(i)"
              class="h-2.5 rounded-full transition-all"
              [class]="activeIndex() === i ? 'w-8 bg-orange' : 'w-2.5 bg-gray-300 hover:bg-gray-400'"
              [attr.aria-label]="'Aller à l’avis ' + (i + 1)"
            ></button>
          }
        </div>
      </div>

      <!-- Bandeau Facebook -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16" appReveal>
        <div
          class="rounded-3xl px-6 py-10 sm:px-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
          style="background: linear-gradient(90deg,#1877f2,#0b5fd4)"
        >
          <div class="flex items-center gap-5">
            <div class="w-16 h-16 shrink-0 rounded-2xl bg-white/15 flex items-center justify-center animate-float">
              <svg class="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z" />
              </svg>
            </div>
            <div>
              <h3 class="text-2xl sm:text-3xl font-extrabold">Suivez-nous sur Facebook</h3>
              <p class="text-white/85 mt-1">Actualités, promos et vie de l'institut — rejoignez la communauté !</p>
            </div>
          </div>
          <a
            [href]="facebookUrl"
            target="_blank"
            rel="noopener"
            class="shrink-0 inline-flex items-center gap-2 bg-white text-[#1877f2] font-bold px-7 py-3.5 rounded-full shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z" /></svg>
            Nous suivre
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `,
  ],
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  facebookUrl = 'https://www.facebook.com/maglinguainstitut';

  track = viewChild<ElementRef<HTMLDivElement>>('track');
  activeIndex = signal(0);
  paused = signal(false);
  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.timer = setInterval(() => this.autoAdvance(), 5000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  private step(): number {
    const el = this.track()?.nativeElement;
    if (!el) return 0;
    const first = el.firstElementChild as HTMLElement | null;
    const width = first?.getBoundingClientRect().width ?? el.clientWidth;
    return width + 24; // + gap-6
  }

  scrollBy(direction: number): void {
    const el = this.track()?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: direction * this.step(), behavior: 'smooth' });
  }

  goTo(i: number): void {
    const el = this.track()?.nativeElement;
    if (!el) return;
    el.scrollTo({ left: i * this.step(), behavior: 'smooth' });
  }

  onScroll(): void {
    const el = this.track()?.nativeElement;
    if (!el) return;
    const s = this.step();
    if (s > 0) this.activeIndex.set(Math.round(el.scrollLeft / s));
  }

  private autoAdvance(): void {
    if (this.paused()) return;
    const el = this.track()?.nativeElement;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft >= max - 5) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      this.scrollBy(1);
    }
  }

  reviews: Review[] = [
    {
      name: 'Sandrine M.',
      initials: 'SM',
      category: 'Cours',
      rating: 5,
      comment:
        "Grâce au cours d'allemand, j'ai obtenu mon Goethe-Zertifikat B1 du premier coup. Formateurs au top !",
      from: '#0d2c54',
      to: '#1e4d8b',
    },
    {
      name: 'Boris T.',
      initials: 'BT',
      category: 'Voyage',
      rating: 4.5,
      comment:
        "Accompagnement visa impeccable pour mon départ au Canada. Dossier accepté, un grand merci à l'équipe.",
      from: '#f5821f',
      to: '#c8102e',
    },
    {
      name: 'Aïcha D.',
      initials: 'AD',
      category: 'Cours',
      rating: 5,
      comment:
        "Ambiance conviviale et méthode efficace en anglais. J'ai gagné en confiance pour l'IELTS.",
      from: '#008C45',
      to: '#3fb96f',
    },
    {
      name: 'Georges N.',
      initials: 'GN',
      category: 'Voyage',
      rating: 4,
      comment:
        'Conseils personnalisés et suivi sérieux de mon dossier. Je recommande pour tout projet à l’étranger.',
      from: '#123a6e',
      to: '#0e8a7d',
    },
    {
      name: 'Laëtitia K.',
      initials: 'LK',
      category: 'Cours',
      rating: 4.5,
      comment:
        "Cours d'italien vivant et interactif. Les professeurs sont patients et vraiment à l'écoute.",
      from: '#AA151B',
      to: '#F1BF00',
    },
    {
      name: 'Yannick E.',
      initials: 'YE',
      category: 'Voyage',
      rating: 5,
      comment:
        "De la prise de rendez-vous à l'obtention du visa, tout a été fluide. Une équipe de confiance.",
      from: '#f5821f',
      to: '#ff9a3d',
    },
  ];

  averageRating = computed(() => {
    const total = this.reviews.reduce((s, r) => s + r.rating, 0);
    return Math.round((total / this.reviews.length) * 10) / 10;
  });

  fillPercent(rating: number): number {
    return (rating / 5) * 100;
  }
}
