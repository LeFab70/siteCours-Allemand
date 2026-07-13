import { Component } from '@angular/core';

interface SocialIcon {
  name: string;
  url: string;
  color: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-navy-dark text-white/70 pt-14 pb-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-10">
        <div>
          <div class="flex items-center gap-3 mb-3">
            <img
              src="assets/logo.png"
              alt="Logo MAG LINGUA INSTITUT"
              width="44"
              height="44"
              class="w-11 h-11 rounded-full object-cover shadow-md bg-white"
            />
            <div>
              <p class="text-white font-extrabold text-lg leading-tight">MAG LINGUA INSTITUT</p>
              <p class="text-orange text-sm font-semibold">Formation Professionnelle · Langues & Informatique</p>
            </div>
          </div>
          <p class="text-sm leading-relaxed">
            Yassa, Immeuble voisin à l'Institut Supérieur la Perle, Chez Mag Lingua Institut.
          </p>
          <div class="flex flex-wrap gap-2 mt-5">
            @for (s of socials; track s.name) {
              <a
                [href]="s.url"
                target="_blank"
                rel="noopener"
                [attr.aria-label]="s.name"
                class="w-10 h-10 rounded-full flex items-center justify-center text-white
                       hover:scale-110 hover:-translate-y-0.5 transition-all shadow-md"
                [style.background]="s.color"
                [title]="s.name"
              >
                @switch (s.name) {
                  @case ('Facebook') {
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z"/></svg>
                  }
                  @case ('TikTok') {
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.43V13.1a8.26 8.26 0 005.58 2.15V11.8a4.85 4.85 0 01-2.55-.74 4.84 4.84 0 002.55-4.37z"/></svg>
                  }
                  @case ('YouTube') {
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.5 31.5 0 000 12a31.5 31.5 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.5 31.5 0 0024 12a31.5 31.5 0 00-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
                  }
                  @case ('Instagram') {
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.5 1 .4.4.7.9 1 1.5.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-1 1.5-.4.4-.9.7-1.5 1-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.5-1-.4-.4-.7-.9-1-1.5-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 1-1.5.4-.4.9-.7 1.5-1 .4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2m0 5.3A4.5 4.5 0 1016.5 12 4.5 4.5 0 0012 7.5m0 7.4A2.9 2.9 0 1114.9 12 2.9 2.9 0 0112 14.9m5.7-7.6a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1z"/></svg>
                  }
                  @case ('LinkedIn') {
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77A1.75 1.75 0 000 1.73v20.54C0 23.24.78 24 1.77 24h20.45c.98 0 1.78-.76 1.78-1.73V1.73C24 .76 23.2 0 22.23 0z"/></svg>
                  }
                  @case ('WhatsApp') {
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12 2a10 10 0 00-8.6 15.06L2 22l5.06-1.33A10 10 0 1012 2z"/></svg>
                  }
                }
              </a>
            }
          </div>
        </div>

        <div>
          <p class="text-white font-semibold mb-3">Liens rapides</p>
          <ul class="space-y-2 text-sm">
            <li><a href="#langues" class="hover:text-orange transition-colors">Cours de langues</a></li>
            <li><a href="#examens" class="hover:text-orange transition-colors">Préparation aux examens</a></li>
            <li><a href="#visa" class="hover:text-orange transition-colors">Assistance visa</a></li>
            <li><a href="#tarifs" class="hover:text-orange transition-colors">Inscription</a></li>
            <li><a href="#reseaux" class="hover:text-orange transition-colors">Réseaux sociaux</a></li>
            <li><a href="#contact" class="hover:text-orange transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <p class="text-white font-semibold mb-3">Contact</p>
          <ul class="space-y-2 text-sm">
            <li>📞 679 800 266 / 696 649 878</li>
            <li>✉️ maglinguainstitut&#64;gmail.com</li>
            <li>🌐 www.maglinguainstitut.com</li>
          </ul>
        </div>
      </div>

      <div class="border-t border-white/10 mt-10 pt-6 text-center text-sm">
        <p class="text-orange font-semibold">
          Des langues, des compétences, des opportunités pour un avenir sans frontières !
        </p>
        <p class="mt-2">© {{ year }} Mag Lingua Institut — Tous droits réservés.</p>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  year = new Date().getFullYear();

  socials: SocialIcon[] = [
    { name: 'Facebook', url: 'https://www.facebook.com/maglinguainstitut', color: '#1877F2' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@maglinguainstitut', color: '#010101' },
    { name: 'YouTube', url: 'https://www.youtube.com/@maglinguainstitut', color: '#FF0000' },
    { name: 'Instagram', url: 'https://www.instagram.com/maglinguainstitut', color: '#E4405F' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/maglinguainstitut', color: '#0A66C2' },
    { name: 'WhatsApp', url: 'https://wa.me/237679800266?text=Bonjour%20MAG%20LINGUA%20INSTITUT', color: '#25D366' },
  ];
}
