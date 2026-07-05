import { Component, Input, signal } from '@angular/core';

interface NavItem {
  label: string;
  href: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <header
      class="fixed top-0 left-0 w-full z-40 transition-all duration-300"
      [class.bg-white]="scrolled"
      [class.shadow-lg]="scrolled"
      [class.py-2]="scrolled"
      [class.bg-transparent]="!scrolled"
      [class.py-4]="!scrolled"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <!-- Logo -->
        <a href="#accueil" class="flex items-center gap-3 group">
          <div class="w-11 h-11 rounded-full bg-navy flex items-center justify-center
                      shadow-md group-hover:animate-pulse-soft">
            <span class="text-orange font-extrabold text-lg">ML</span>
          </div>
          <div class="leading-tight">
            <p class="font-extrabold text-navy text-lg tracking-tight" [class.text-white]="!scrolled">
              MAG LINGUA
            </p>
            <p class="text-orange text-xs font-semibold tracking-wide">INSTITUT</p>
          </div>
        </a>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-8">
          @for (item of navItems; track item.href) {
            <a
              [href]="item.href"
              class="nav-link font-medium text-sm transition-colors duration-200"
              [class.text-navy]="scrolled"
              [class.text-white]="!scrolled"
            >
              {{ item.label }}
            </a>
          }
          <a
            href="#contact"
            class="bg-orange hover:bg-orange-light text-white text-sm font-semibold px-5 py-2.5
                   rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            Nous contacter
          </a>
        </nav>

        <!-- Mobile toggle -->
        <button
          class="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 relative z-50"
          (click)="toggleMenu()"
          aria-label="Menu"
        >
          <span
            class="block w-7 h-0.5 rounded transition-all duration-300"
            [class.bg-navy]="scrolled || menuOpen()"
            [class.bg-white]="!scrolled && !menuOpen()"
            [class.rotate-45]="menuOpen()"
            [class.translate-y-2]="menuOpen()"
          ></span>
          <span
            class="block w-7 h-0.5 rounded transition-all duration-300"
            [class.bg-navy]="scrolled || menuOpen()"
            [class.bg-white]="!scrolled && !menuOpen()"
            [class.opacity-0]="menuOpen()"
          ></span>
          <span
            class="block w-7 h-0.5 rounded transition-all duration-300"
            [class.bg-navy]="scrolled || menuOpen()"
            [class.bg-white]="!scrolled && !menuOpen()"
            [class.-rotate-45]="menuOpen()"
            [class.-translate-y-2]="menuOpen()"
          ></span>
        </button>
      </div>

      <!-- Mobile menu -->
      @if (menuOpen()) {
        <nav
          class="md:hidden absolute top-full left-0 w-full bg-white shadow-xl
                 flex flex-col items-center py-6 gap-5 animate-fade-in-up"
        >
          @for (item of navItems; track item.href) {
            <a
              [href]="item.href"
              (click)="closeMenu()"
              class="text-navy font-medium text-base"
            >
              {{ item.label }}
            </a>
          }
          <a
            href="#contact"
            (click)="closeMenu()"
            class="bg-orange text-white font-semibold px-6 py-2.5 rounded-full shadow-md"
          >
            Nous contacter
          </a>
        </nav>
      }
    </header>
  `,
})
export class NavbarComponent {
  @Input() scrolled = false;

  menuOpen = signal(false);

  navItems: NavItem[] = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Services', href: '#services' },
    { label: 'Langues', href: '#langues' },
    { label: 'Examens', href: '#examens' },
    { label: 'Visa', href: '#visa' },
    { label: 'Tarifs', href: '#tarifs' },
    { label: 'Avis', href: '#avis' },
    { label: 'Contact', href: '#contact' },
  ];

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
