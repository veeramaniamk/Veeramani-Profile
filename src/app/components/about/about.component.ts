import { Component, OnInit, OnDestroy, ElementRef, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface Counter {
  label: string;
  count: number;
  target: number;
  suffix: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);

  aboutPoints = [
    { text: 'Android Developer with practical industry experience', icon: 'smartphone' },
    { text: 'Strong knowledge of Kotlin and Java', icon: 'code' },
    { text: 'Experience developing healthcare, eCommerce, education, and enterprise apps', icon: 'layers' },
    { text: 'Skilled in backend development using Spring Boot, Node.js, Express.js, and PHP', icon: 'server' },
    { text: 'Experience with Firebase services and push notifications', icon: 'bell' },
    { text: 'Familiar with Git, GitHub, REST APIs, and modern development workflows', icon: 'git-branch' }
  ];

  counters: Counter[] = [
    { label: 'Projects Completed', count: 0, target: 15, suffix: '+' },
    { label: 'Technologies Used', count: 0, target: 12, suffix: '+' },
    { label: 'GitHub Repositories', count: 0, target: 20, suffix: '+' },
    { label: 'Learning Experience', count: 0, target: 4, suffix: ' Years' }
  ];

  private observer: IntersectionObserver | null = null;
  private hasAnimated = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.animateCounters();
          if (this.observer) {
            this.observer.unobserve(this.elementRef.nativeElement);
          }
        }
      });
    }, {
      threshold: 0.2
    });

    this.observer.observe(this.elementRef.nativeElement);
  }

  private animateCounters(): void {
    const duration = 2000; // 2 seconds total animation time
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      this.counters.forEach(counter => {
        // Use an easeOutQuad easing function for premium feel
        const easeValue = progress * (2 - progress);
        counter.count = Math.floor(easeValue * counter.target);
      });

      if (frame === totalFrames) {
        // Ensure exact target numbers are set at the end
        this.counters.forEach(counter => {
          counter.count = counter.target;
        });
        clearInterval(timer);
      }
    }, frameRate);
  }
}
