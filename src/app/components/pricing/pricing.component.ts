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

        <!-- Tableau des tarifs par niveau -->
        <div class="mt-14 text-center" appReveal>
          <h3 class="text-2xl font-extrabold text-navy">Nos tarifs par niveau</h3>
          <p class="text-gray-500 mt-2">Scolarité et manuel (en FCFA).</p>
        </div>

        <div class="mt-8 hidden md:block rounded-2xl overflow-hidden shadow-lg" appReveal>
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-navy text-white">
                <th class="px-6 py-4 font-bold">Niveau</th>
                <th class="px-6 py-4 font-bold">Scolarité (FCFA)</th>
                <th class="px-6 py-4 font-bold">Manuel (FCFA)</th>
                <th class="px-6 py-4 font-bold">Durée</th>
              </tr>
            </thead>
            <tbody>
              @for (t of tarifs; track t.niveau) {
                <tr
                  class="border-b border-gray-100 transition-colors"
                  [class]="t.popular ? 'bg-orange/10' : 'bg-white hover:bg-gray-50'"
                >
                  <td class="px-6 py-4 font-extrabold text-navy">
                    {{ t.niveau }}
                    @if (t.popular) {
                      <span class="ml-2 text-[10px] font-bold uppercase bg-orange text-white px-2 py-0.5 rounded-full align-middle">Populaire</span>
                    }
                  </td>
                  <td class="px-6 py-4 font-semibold text-gray-700">{{ t.scolarite }}</td>
                  <td class="px-6 py-4 text-gray-600">{{ t.manuel }}</td>
                  <td class="px-6 py-4 text-gray-600">{{ t.duree }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <div class="mt-8 md:hidden grid gap-4">
          @for (t of tarifs; track t.niveau) {
            <div
              appReveal
              class="rounded-2xl p-5 shadow-md border"
              [class]="t.popular ? 'border-orange bg-orange/5' : 'border-gray-100 bg-white'"
            >
              <div class="flex items-center justify-between">
                <span class="text-2xl font-extrabold text-navy">{{ t.niveau }}</span>
                <span class="text-sm text-gray-500">{{ t.duree }}</span>
              </div>
              <div class="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div class="bg-gray-50 rounded-xl p-3">
                  <div class="text-gray-500">Scolarité</div>
                  <div class="font-bold text-navy">{{ t.scolarite }} FCFA</div>
                </div>
                <div class="bg-gray-50 rounded-xl p-3">
                  <div class="text-gray-500">Manuel</div>
                  <div class="font-bold text-navy">{{ t.manuel }} FCFA</div>
                </div>
              </div>
            </div>
          }
        </div>

        <p class="text-center text-navy font-semibold text-lg mt-12" appReveal>
          Des langues, des compétences, des opportunités pour un avenir sans frontières !
        </p>
      </div>
    </section>
  `,
})
export class PricingComponent {
  tarifs = [
    { niveau: 'A1', scolarite: '100 000', manuel: '15 000', duree: '10 semaines', popular: false },
    { niveau: 'A2', scolarite: '100 000', manuel: '15 000', duree: '10 semaines', popular: false },
    { niveau: 'B1', scolarite: '115 000', manuel: '20 000', duree: '12 semaines', popular: true },
    { niveau: 'B2', scolarite: '115 000', manuel: '20 000', duree: '12 semaines', popular: false },
    { niveau: 'C1', scolarite: '110 000', manuel: '20 000', duree: '12 semaines', popular: false },
  ];
}
