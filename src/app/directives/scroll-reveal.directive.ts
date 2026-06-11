import { Directive, ElementRef, Renderer2, AfterViewInit, OnDestroy, Input, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);

  @Input() revealClass = 'reveal-up'; // Options: reveal-up, reveal-fade, reveal-left, reveal-right, reveal-stagger
  @Input() revealDelay = 0; // Delay in milliseconds
  @Input() threshold = 0.1; // Intersection threshold

  private observer: IntersectionObserver | null = null;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add initial reveal styles
      this.renderer.addClass(this.el.nativeElement, 'reveal');
      if (this.revealClass) {
        this.renderer.addClass(this.el.nativeElement, this.revealClass);
      }

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              this.renderer.addClass(this.el.nativeElement, 'visible');
            }, this.revealDelay);
            
            // Once revealed, we can stop observing this element
            if (this.observer) {
              this.observer.unobserve(this.el.nativeElement);
            }
          }
        });
      }, {
        threshold: this.threshold,
        rootMargin: '0px 0px -50px 0px' // Offset triggers slightly early before entering viewport fully
      });

      this.observer.observe(this.el.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
