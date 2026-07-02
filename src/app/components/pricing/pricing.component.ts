import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section class="py-24 bg-white" id="tarifs">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" appReveal>
          <span class="text-orange font-semibold uppercase tracking-widest text-sm">Inscription</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-navy mt-2">Rejoignez-nous dès maintenant</h2>
          <div class="w-20 h-1.5 bg-orange rounded-full mx-auto mt-4"></div>
        </div>

        <div class="grid sm:grid-cols-2 gap-8">
          <div
            appReveal
            class="rounded-2xl border-2 border-orange p-8 text-center bg-gradient-to-br from-orange/5
                   to-white hover:shadow-xl transition-shadow duration-300"
          >
            <span class="text-4xl">📝</span>
            <p class="text-gray-500 font-medium mt-3">Frais d'inscription</p>
            <p class="text-4xl font-extrabold text-orange mt-2">15 000 <span class="text-lg">FCFA</span></p>
          </div>

          <div
            appReveal
            style="transition-delay: 120ms"
            class="rounded-2xl border-2 border-teal p-8 text-center bg-gradient-to-br from-teal/5
                   to-white hover:shadow-xl transition-shadow duration-300"
          >
            <span class="text-4xl">📅</span>
            <p class="text-gray-500 font-medium mt-3">Début d'inscription</p>
            <p class="text-4xl font-extrabold text-teal mt-2">15 Juillet</p>
          </div>
        </div>

        <p class="text-center text-navy font-semibold text-lg mt-12" appReveal>
          Des langues, des compétences, des opportunités pour un avenir sans frontières !
        </p>
      </div>
    </section>
  `,
})
export class PricingComponent {}
