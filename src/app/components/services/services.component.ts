import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

interface Service {
  icon: string;
  title: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section class="pb-24 bg-white" id="services">
      <!-- Bande statistiques (chevauche la bannière) -->
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-10">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-3xl shadow-xl p-6 md:p-8" appReveal>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-extrabold text-navy">6</div>
            <div class="text-xs md:text-sm text-gray-500 font-medium mt-1">Langues enseignées</div>
          </div>
          <div class="text-center border-l border-gray-100">
            <div class="text-3xl md:text-4xl font-extrabold text-orange">9</div>
            <div class="text-xs md:text-sm text-gray-500 font-medium mt-1">Certifications</div>
          </div>
          <div class="text-center md:border-l border-gray-100">
            <div class="text-3xl md:text-4xl font-extrabold text-teal">4.7/5</div>
            <div class="text-xs md:text-sm text-gray-500 font-medium mt-1">Satisfaction</div>
          </div>
          <div class="text-center border-l border-gray-100">
            <div class="text-3xl md:text-4xl font-extrabold text-navy">100%</div>
            <div class="text-xs md:text-sm text-gray-500 font-medium mt-1">Accompagnement</div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center pt-4">
        <!-- Visuel -->
        <div class="relative" appReveal>
          <img
            [src]="image"
            alt="Formatrice et apprenants en salle de cours"
            loading="lazy"
            class="rounded-3xl shadow-2xl w-full object-cover h-[420px] hover:scale-[1.02] transition-transform duration-500"
          />
          <div class="absolute -bottom-6 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 max-w-[230px]">
            <span class="text-3xl">📶</span>
            <span class="text-sm font-semibold text-navy">Wifi & salles climatisées</span>
          </div>
          <div class="absolute -top-5 -left-4 bg-orange text-white rounded-2xl shadow-xl px-4 py-3">
            <span class="text-sm font-bold">Jour & soir • En ligne & présentiel</span>
          </div>
        </div>

        <!-- Liste des services -->
        <div appReveal>
          <span class="text-orange font-semibold uppercase tracking-widest text-sm">Ce que nous offrons</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-navy mt-2">Nos services</h2>
          <div class="w-20 h-1.5 bg-orange rounded-full mt-4"></div>
          <p class="text-gray-500 mt-4">
            Un accompagnement complet, des langues jusqu'à votre projet à l'international.
          </p>

          <div class="mt-8 space-y-3">
            @for (s of services; track s.title; let i = $index) {
              <div
                appReveal
                [style.transition-delay.ms]="i * 80"
                class="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 hover:bg-orange/5 hover:translate-x-1 transition-all duration-300"
              >
                <div class="w-12 h-12 shrink-0 rounded-xl bg-navy flex items-center justify-center text-xl shadow-md">
                  {{ s.icon }}
                </div>
                <p class="font-semibold text-navy">{{ s.title }}</p>
              </div>
            }
          </div>

          <div class="mt-6 flex items-start gap-3 bg-navy text-white rounded-2xl p-4">
            <span class="text-xl">ℹ️</span>
            <p class="text-sm text-white/90"><strong>NB :</strong> {{ nb }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ServicesComponent {
  image = 'assets/services.jpg';

  nb = 'Cours du jour et du soir, en ligne et en présentiel. Wifi et salles climatisées.';

  services: Service[] = [
    { icon: '🌍', title: 'Cours de langues aux normes internationales et préparation aux examens' },
    { icon: '🎓', title: "Études supérieures à l'étranger" },
    { icon: '💼', title: 'Formations et emplois' },
    { icon: '🤝', title: 'Au pair, volontariat, regroupement familial, soins infirmiers' },
    { icon: '🗣️', title: 'Traduction et interprétariat' },
  ];
}
