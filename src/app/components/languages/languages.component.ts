import { Component, signal } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { Language } from '../../models/institut.models';

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section class="py-24 bg-white" id="langues">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" appReveal>
          <span class="text-orange font-semibold uppercase tracking-widest text-sm">Nos formations</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-navy mt-2">Cours de langues</h2>
          <div class="w-20 h-1.5 bg-orange rounded-full mx-auto mt-4"></div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
          @for (lang of languages; track lang.name) {
            <div
              appReveal
              class="flip-card h-56 cursor-pointer"
              (mouseenter)="setActive(lang.name)"
              (click)="toggleSelected(lang.name)"
            >
              <div
                class="flip-card-inner relative w-full h-full"
                [class.rotate-y-180]="selected() === lang.name"
              >
                <!-- front -->
                <div
                  class="flip-card-front absolute inset-0 rounded-2xl shadow-md hover:shadow-xl
                         border border-gray-100 flex flex-col items-center justify-center gap-3 p-4
                         transition-shadow duration-300"
                >
                  <span class="text-5xl">{{ lang.flagEmoji }}</span>
                  <h3 class="font-bold text-navy text-lg">{{ lang.name }}</h3>
                  <span class="text-2xl">{{ lang.icon }}</span>
                </div>
                <!-- back -->
                <div
                  class="flip-card-back absolute inset-0 rounded-2xl shadow-xl p-5 flex flex-col
                         items-center justify-center text-center text-white"
                  [style.background]="'linear-gradient(135deg,' + lang.colorFrom + ',' + lang.colorTo + ')'"
                >
                  <h3 class="font-bold text-lg mb-2">{{ lang.name }}</h3>
                  <p class="text-sm opacity-90">{{ lang.tagline }}</p>
                </div>
              </div>
            </div>
          }
        </div>

        <p class="text-center text-gray-500 text-sm mt-8 md:hidden">
          Touchez une carte pour découvrir chaque langue.
        </p>
        <p class="text-center text-gray-500 text-sm mt-8 hidden md:block">
          Survolez une carte pour découvrir chaque langue.
        </p>
      </div>
    </section>
  `,
  styles: [
    `
      .rotate-y-180 {
        transform: rotateY(180deg);
      }
    `,
  ],
})
export class LanguagesComponent {
  selected = signal<string | null>(null);
  hovered = signal<string | null>(null);

  languages: Language[] = [
    {
      name: 'Français',
      flagEmoji: '🇫🇷',
      tagline: 'Parlez, comprenez, réussissez.',
      icon: '💬',
      colorFrom: '#0d2c54',
      colorTo: '#1e4d8b',
    },
    {
      name: 'Anglais',
      flagEmoji: '🇬🇧',
      tagline: 'Communiquez avec le monde.',
      icon: '🌐',
      colorFrom: '#c8102e',
      colorTo: '#e83a52',
    },
    {
      name: 'Italien',
      flagEmoji: '🇮🇹',
      tagline: "La langue de l'art et de la culture.",
      icon: '🏛️',
      colorFrom: '#008C45',
      colorTo: '#3fb96f',
    },
    {
      name: 'Chinois',
      flagEmoji: '🇨🇳',
      tagline: 'Ouvrez-vous au marché de demain.',
      icon: '⛩️',
      colorFrom: '#DE2910',
      colorTo: '#ff5a3c',
    },
    {
      name: 'Allemand',
      flagEmoji: '🇩🇪',
      tagline: 'Précision, rigueur et opportunités.',
      icon: '🏰',
      colorFrom: '#1a1a1a',
      colorTo: '#f5821f',
    },
    {
      name: 'Espagnol',
      flagEmoji: '🇪🇸',
      tagline: 'Une langue, plusieurs mondes.',
      icon: '🌎',
      colorFrom: '#AA151B',
      colorTo: '#F1BF00',
    },
  ];

  setActive(name: string): void {
    this.hovered.set(name);
  }

  toggleSelected(name: string): void {
    this.selected.update((cur) => (cur === name ? null : name));
  }
}
