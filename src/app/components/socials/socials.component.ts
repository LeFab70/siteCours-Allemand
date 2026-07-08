import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  color: string;
  description: string;
}

@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section
      id="reseaux"
      class="py-20 bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white overflow-hidden relative"
    >
      <div class="absolute -top-20 -left-20 w-72 h-72 bg-orange/20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 -right-16 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" appReveal>
        <div class="text-center mb-10">
          <span class="text-orange font-semibold uppercase tracking-widest text-sm">Communauté</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold mt-2">Suivez-nous partout</h2>
          <div class="w-20 h-1.5 bg-orange rounded-full mx-auto mt-4"></div>
          <p class="text-white/80 mt-4 max-w-2xl mx-auto">
            Rejoignez notre communauté — tips, cours courts, lives et offres exclusives.
            Plus vous nous suivez, plus vous gagnez en opportunités&nbsp;!
          </p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          @for (r of socials; track r.name) {
            <a
              [href]="r.url"
              target="_blank"
              rel="noopener"
              class="group bg-white/10 hover:bg-white backdrop-blur rounded-2xl p-5 text-center
                     transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
                     border border-white/10 hover:border-transparent"
            >
              <div
                class="w-12 h-12 mx-auto rounded-xl flex items-center justify-center text-white shadow-lg mb-3
                       group-hover:scale-110 transition-transform"
                [style.background]="r.color"
              >
                @switch (r.name) {
                  @case ('Facebook') {
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z"/></svg>
                  }
                  @case ('TikTok') {
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.43V13.1a8.26 8.26 0 005.58 2.15V11.8a4.85 4.85 0 01-2.55-.74 4.84 4.84 0 002.55-4.37z"/></svg>
                  }
                  @case ('YouTube') {
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.5 31.5 0 000 12a31.5 31.5 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.5 31.5 0 0024 12a31.5 31.5 0 00-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
                  }
                  @case ('Instagram') {
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.5 1 .4.4.7.9 1 1.5.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-1 1.5-.4.4-.9.7-1.5 1-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.5-1-.4-.4-.7-.9-1-1.5-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 1-1.5.4-.4.9-.7 1.5-1 .4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2m0 5.3A4.5 4.5 0 1016.5 12 4.5 4.5 0 0012 7.5m0 7.4A2.9 2.9 0 1114.9 12 2.9 2.9 0 0112 14.9m5.7-7.6a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1z"/></svg>
                  }
                  @case ('LinkedIn') {
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77A1.75 1.75 0 000 1.73v20.54C0 23.24.78 24 1.77 24h20.45c.98 0 1.78-.76 1.78-1.73V1.73C24 .76 23.2 0 22.23 0z"/></svg>
                  }
                  @case ('WhatsApp') {
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12 2a10 10 0 00-8.6 15.06L2 22l5.06-1.33A10 10 0 1012 2z"/></svg>
                  }
                }
              </div>
              <div class="font-bold text-sm group-hover:text-navy transition-colors">{{ r.name }}</div>
              <div class="text-[11px] text-white/70 group-hover:text-gray-500 mt-0.5 truncate">{{ r.handle }}</div>
              <div class="text-[10px] text-orange group-hover:text-orange mt-1 font-semibold">{{ r.description }}</div>
            </a>
          }
        </div>

        <p class="text-center text-white/60 text-xs mt-8">
          💡 Astuce monétisation : publiez régulièrement sur TikTok & YouTube pour attirer des leads,
          puis convertissez via WhatsApp et le formulaire de contact.
        </p>
      </div>
    </section>

    <!-- Barre sociale flottante (desktop) -->
    <aside
      class="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-2"
      aria-label="Réseaux sociaux"
    >
      @for (r of socials; track r.name) {
        @if (r.name !== 'WhatsApp') {
          <a
            [href]="r.url"
            target="_blank"
            rel="noopener"
            [attr.aria-label]="r.name"
            class="w-11 h-11 rounded-full flex items-center justify-center text-white shadow-lg
                   hover:scale-110 hover:translate-x-1 transition-all"
            [style.background]="r.color"
            [title]="r.name"
          >
            @switch (r.name) {
              @case ('Facebook') {
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z"/></svg>
              }
              @case ('TikTok') {
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.43V13.1a8.26 8.26 0 005.58 2.15V11.8a4.85 4.85 0 01-2.55-.74 4.84 4.84 0 002.55-4.37z"/></svg>
              }
              @case ('YouTube') {
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.5 31.5 0 000 12a31.5 31.5 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.5 31.5 0 0024 12a31.5 31.5 0 00-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
              }
              @case ('Instagram') {
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.5 1 .4.4.7.9 1 1.5.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-1 1.5-.4.4-.9.7-1.5 1-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.5-1-.4-.4-.7-.9-1-1.5-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 1-1.5.4-.4.9-.7 1.5-1 .4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2m0 5.3A4.5 4.5 0 1016.5 12 4.5 4.5 0 0012 7.5m0 7.4A2.9 2.9 0 1114.9 12 2.9 2.9 0 0112 14.9m5.7-7.6a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1z"/></svg>
              }
              @case ('LinkedIn') {
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77A1.75 1.75 0 000 1.73v20.54C0 23.24.78 24 1.77 24h20.45c.98 0 1.78-.76 1.78-1.73V1.73C24 .76 23.2 0 22.23 0z"/></svg>
              }
            }
          </a>
        }
      }
    </aside>
  `,
})
export class SocialsComponent {
  socials: SocialLink[] = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/maglinguainstitut',
      handle: '@Mag Lingua Institut',
      color: '#1877F2',
      description: 'Actualités & communauté',
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@maglinguainstitut',
      handle: '@maglinguainstitut',
      color: '#010101',
      description: 'Cours courts & tips',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@maglinguainstitut',
      handle: '@maglinguainstitut',
      color: '#FF0000',
      description: 'Vidéos & tutoriels',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/maglinguainstitut',
      handle: '@maglinguainstitut',
      color: '#E4405F',
      description: 'Stories & coulisses',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/maglinguainstitut',
      handle: 'Mag Lingua Institut',
      color: '#0A66C2',
      description: 'Formations & carrières',
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/237679800266?text=Bonjour%20MAG%20LINGUA%20INSTITUT',
      handle: '679 800 266',
      color: '#25D366',
      description: 'Contact rapide',
    },
  ];
}
