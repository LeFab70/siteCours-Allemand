import { Component, HostListener, signal } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { ExamsComponent } from './components/exams/exams.component';
import { VisaComponent } from './components/visa/visa.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    LanguagesComponent,
    ExamsComponent,
    VisaComponent,
    PricingComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterComponent,
    ChatbotComponent,
  ],
  template: `
    <app-navbar [scrolled]="scrolled()" />
    <main>
      <app-hero id="accueil" />
      <app-languages id="langues" />
      <app-exams id="examens" />
      <app-visa id="visa" />
      <app-pricing id="tarifs" />
      <app-testimonials id="avis" />
      <app-contact id="contact" />
    </main>
    <app-footer />

    <app-chatbot />

    @if (showBackToTop()) {
      <button
        (click)="scrollToTop()"
        class="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-orange text-white shadow-lg
               flex items-center justify-center hover:bg-orange-light hover:scale-110
               transition-all duration-300 animate-fade-in"
        aria-label="Retour en haut"
      >
        ↑
      </button>
    }
  `,
})
export class AppComponent {
  scrolled = signal(false);
  showBackToTop = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    const y = window.scrollY;
    this.scrolled.set(y > 20);
    this.showBackToTop.set(y > 500);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
