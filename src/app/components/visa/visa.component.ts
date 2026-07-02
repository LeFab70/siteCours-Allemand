import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { VisaStep } from '../../models/institut.models';

@Component({
  selector: 'app-visa',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section class="py-24 bg-navy relative overflow-hidden" id="visa">
      <div class="absolute -top-20 -right-20 w-72 h-72 bg-orange/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 -left-24 w-80 h-80 bg-teal/10 rounded-full blur-3xl"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" appReveal>
          <span class="text-orange font-semibold uppercase tracking-widest text-sm">Accompagnement</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Procédure voyage & assistance visa
          </h2>
          <div class="w-20 h-1.5 bg-orange rounded-full mx-auto mt-4"></div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (step of steps; track step.text; let i = $index) {
            <div
              appReveal
              [style.transition-delay.ms]="i * 100"
              class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6
                     hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 text-center"
            >
              <div
                class="w-16 h-16 mx-auto rounded-full bg-orange flex items-center justify-center
                       text-2xl mb-4 shadow-lg"
              >
                {{ step.icon }}
              </div>
              <p class="text-white/90 text-sm leading-relaxed">{{ step.text }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class VisaComponent {
  steps: VisaStep[] = [
    { icon: '✈️', text: 'Conseils personnalisés pour vos projets de voyage' },
    { icon: '📋', text: 'Assistance dans la constitution de vos dossiers' },
    { icon: '🛂', text: 'Prise de rendez-vous et suivi des démarches' },
    { icon: '🛡️', text: "Accompagnement jusqu'à l'obtention de votre visa" },
  ];
}
