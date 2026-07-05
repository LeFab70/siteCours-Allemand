import { Component, signal } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section
      class="relative overflow-hidden min-h-screen flex items-center pt-24"
    >
      <!-- Image de fond large et floutée -->
      <img
        [src]="bannerImage"
        alt=""
        aria-hidden="true"
        class="absolute inset-0 w-full h-full object-cover scale-110 blur-[4px] brightness-110"
      />
      <!-- Voile dégradé léger + scrim gauche pour la lisibilité du texte -->
      <div class="absolute inset-0 bg-gradient-to-br from-navy/70 via-navy-light/45 to-navy-dark/55 bg-200% animate-gradient-move"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/25 to-transparent"></div>

      <!-- decorative floating flags -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <span class="absolute top-24 left-[8%] text-6xl animate-float">🇫🇷</span>
        <span class="absolute top-40 right-[12%] text-6xl animate-float" style="animation-delay:0.5s">🇬🇧</span>
        <span class="absolute bottom-32 left-[15%] text-6xl animate-float" style="animation-delay:1s">🇩🇪</span>
        <span class="absolute bottom-20 right-[20%] text-6xl animate-float" style="animation-delay:1.5s">🇪🇸</span>
        <span class="absolute top-1/2 left-[45%] text-6xl animate-float" style="animation-delay:2s">🇮🇹</span>
        <span class="absolute top-16 right-[40%] text-6xl animate-float" style="animation-delay:2.5s">🇨🇳</span>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center py-16">
        <div appReveal>
          <span class="inline-block bg-orange/20 text-orange font-semibold text-sm px-4 py-1.5 rounded-full mb-6">
            Formation Professionnelle · Langues & Informatique
          </span>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            MAG LINGUA <span class="shimmer-text">INSTITUT</span>
          </h1>
          <p class="text-xl sm:text-2xl font-bold text-orange mb-6">
            Apprenez, progressez, ouvrez vos horizons !
          </p>
          <p class="text-white/80 text-lg mb-8 max-w-xl">
            Situé à Yassa, immeuble voisin à l'Institut Supérieur la Perle — nous vous
            accompagnons dans l'apprentissage des langues, la préparation aux certifications
            internationales et vos démarches de visa.
          </p>
          <div class="flex flex-wrap gap-4">
            <a
              href="#langues"
              class="bg-orange hover:bg-orange-light text-white font-semibold px-7 py-3.5
                     rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              Découvrir nos cours
            </a>
            <a
              href="#contact"
              class="border-2 border-white text-white font-semibold px-7 py-3.5 rounded-full
                     hover:bg-white hover:text-navy transition-all duration-300 hover:-translate-y-1"
            >
              Nous contacter
            </a>
          </div>

          <div class="flex items-center gap-6 mt-10 text-white/90">
            <div class="flex items-center gap-2">
              <span class="text-2xl">📍</span>
              <span class="text-sm">Yassa, Chez Mag Lingua Institut</span>
            </div>
          </div>
        </div>

        <div class="relative flex justify-center lg:justify-end" appReveal>
          <div class="relative w-full max-w-md">
            <img
              [src]="heroImage"
              alt="Étudiants en cours avec leurs livres"
              loading="eager"
              class="rounded-3xl shadow-2xl ring-4 ring-white/20 w-full h-80 sm:h-96 object-cover animate-float"
            />
            <!-- badge flottant -->
            <div class="absolute -bottom-6 -left-4 bg-white rounded-2xl shadow-xl px-5 py-4 max-w-[240px]">
              <p class="text-navy font-extrabold leading-tight">
                Des langues, des compétences, des opportunités
              </p>
            </div>
            <div class="absolute -top-4 -right-4 bg-orange text-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2">
              <span class="text-2xl">📶</span>
              <span class="text-xs font-bold">Wifi & salles<br />climatisées</span>
            </div>
          </div>
        </div>
      </div>

      <!-- wave divider -->
      <svg class="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 50L60 45C120 40 240 30 360 33.3C480 37 600 53 720 58.3C840 63 960 57 1080 48.3C1200 40 1320 30 1380 25L1440 20V100H0V50Z" fill="white"/>
      </svg>
    </section>
  `,
})
export class HeroComponent {
  loaded = signal(true);
  bannerImage = 'assets/banniere.jpg';
  heroImage = 'assets/etudiants.jpg';
}
