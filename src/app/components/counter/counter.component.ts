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
export class CounterComponent implements AfterViewInit {
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
            this.animate();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(this.el.nativeElement);
  }

  private animate(): void {
    const start = performance.now();
    const target = this.end();
    const dur = this.duration();

    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      this.current.set(target * eased);
      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        this.current.set(target);
      }
    };
    requestAnimationFrame(step);
  }
}
