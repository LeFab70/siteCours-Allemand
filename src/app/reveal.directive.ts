import { Directive, ElementRef, inject, OnInit } from '@angular/core';

/**
 * Ajoute la classe `in-view` lorsque l'élément entre dans le viewport,
 * déclenchant l'animation de révélation définie dans styles.css (.reveal).
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit {
  private el = inject(ElementRef<HTMLElement>);

  ngOnInit(): void {
    const node = this.el.nativeElement as HTMLElement;
    node.classList.add('reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
  }
}
