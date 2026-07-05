import {
  AfterViewInit,
  Component,
  ElementRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

/**
 * Affiche un nombre qui s'anime de 0 vers `end` lorsqu'il entre dans le viewport.
 * Prend en charge les décimales et un suffixe (ex: "%", "/5").
 */
@Component({
  selector: 'app-counter',
  standalone: true,
  template: `{{ display() }}`,
})
export class Counter implements AfterViewInit {
  private el = inject(ElementRef<HTMLElement>);

  readonly end = input(0);
  readonly decimals = input(0);
  readonly suffix = input('');
  readonly duration = input(1700);

  private current = signal(0);
  protected display = computed(() => this.current().toFixed(this.decimals()) + this.suffix());

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animer();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(this.el.nativeElement);
  }

  private animer(): void {
    const debut = performance.now();
    const cible = this.end();
    const duree = this.duration();

    const etape = (maintenant: number) => {
      const p = Math.min((maintenant - debut) / duree, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      this.current.set(cible * eased);
      if (p < 1) {
        requestAnimationFrame(etape);
      } else {
        this.current.set(cible);
      }
    };
    requestAnimationFrame(etape);
  }
}
