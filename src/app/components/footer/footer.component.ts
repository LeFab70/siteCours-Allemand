import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-navy-dark text-white/70 pt-14 pb-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-10">
        <div>
          <p class="text-white font-extrabold text-lg">MAG LINGUA INSTITUT</p>
          <p class="text-orange text-sm font-semibold mb-3">Formation Professionnelle · Langues & Informatique</p>
          <p class="text-sm leading-relaxed">
            Yassa, Immeuble voisin à l'Institut Supérieur la Perle, Chez Mag Lingua Institut.
          </p>
        </div>

        <div>
          <p class="text-white font-semibold mb-3">Liens rapides</p>
          <ul class="space-y-2 text-sm">
            <li><a href="#langues" class="hover:text-orange transition-colors">Cours de langues</a></li>
            <li><a href="#examens" class="hover:text-orange transition-colors">Préparation aux examens</a></li>
            <li><a href="#visa" class="hover:text-orange transition-colors">Assistance visa</a></li>
            <li><a href="#tarifs" class="hover:text-orange transition-colors">Inscription</a></li>
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
}
