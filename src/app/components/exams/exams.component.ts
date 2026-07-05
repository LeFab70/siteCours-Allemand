import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { Exam } from '../../models/institut.models';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section class="py-24 bg-gray-50" id="examens">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" appReveal>
          <span class="text-orange font-semibold uppercase tracking-widest text-sm">Certifications</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-navy mt-2">Préparation aux examens</h2>
          <div class="w-20 h-1.5 bg-orange rounded-full mx-auto mt-4"></div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          @for (exam of exams; track exam.code; let i = $index) {
            <div
              appReveal
              [style.transition-delay.ms]="i * 80"
              class="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl border border-gray-100
                     hover:border-orange/40 transition-all duration-300 hover:-translate-y-1.5 flex items-center gap-4"
            >
              <div
                class="w-14 h-14 shrink-0 rounded-full bg-navy/5 flex items-center justify-center
                       font-extrabold text-navy group-hover:bg-orange group-hover:text-white
                       transition-colors duration-300 text-sm"
              >
                {{ exam.code }}
              </div>
              <div>
                <h3 class="font-bold text-navy">{{ exam.label }}</h3>
                <p class="text-gray-500 text-sm">{{ exam.description }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ExamsComponent {
  exams: Exam[] = [
    { code: 'TCF', label: 'TCF', description: 'Test de Connaissance du Français' },
    { code: 'telc', label: 'TELC', description: "Certification officielle d'allemand" },
    { code: 'GZ', label: 'Goethe Zertifikat', description: "Certification officielle d'allemand" },
    { code: 'ECL', label: 'ECL', description: "Certification européenne d'allemand" },
    { code: 'ÖSD', label: 'ÖSD', description: "Certification officielle d'allemand (autrichienne)" },
    { code: 'IELTS', label: 'IELTS', description: 'International English Language Testing System' },
    { code: 'TOEFL', label: 'TOEFL', description: 'Test of English as a Foreign Language' },
    { code: 'CILS', label: 'CILS', description: "Certification officielle d'italien" },
    { code: 'PLIDA', label: 'PLIDA', description: "Certification officielle d'italien" },
  ];
}
