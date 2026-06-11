import { Component, OnInit, OnDestroy, HostListener, ElementRef, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);

  // Typewriter options
  titles = ['Android Developer', 'Full Stack Developer', 'Mobile Application Developer'];
  currentTitle = '';
  private titleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typewriterTimeout: any;

  // Floating technology icons (represented as SVGs or symbols)
  techIcons = [
    { name: 'Android', color: '#3DDC84', class: 'icon-android' },
    { name: 'Kotlin', color: '#7F52FF', class: 'icon-kotlin' },
    { name: 'Java', color: '#007396', class: 'icon-java' },
    { name: 'Spring', color: '#6DB33F', class: 'icon-spring' },
    { name: 'Node.js', color: '#339933', class: 'icon-node' },
    { name: 'Angular', color: '#DD0031', class: 'icon-angular' }
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.runTypewriter();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.typewriterTimeout) {
      clearTimeout(this.typewriterTimeout);
    }
  }

  // Mouse follow glow effect tracker
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (isPlatformBrowser(this.platformId)) {
      const rect = this.elementRef.nativeElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      this.elementRef.nativeElement.style.setProperty('--mouse-x', `${x}px`);
      this.elementRef.nativeElement.style.setProperty('--mouse-y', `${y}px`);
    }
  }

  private runTypewriter(): void {
    const currentWord = this.titles[this.titleIndex];
    
    if (this.isDeleting) {
      // Deleting character
      this.currentTitle = currentWord.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      // Typing character
      this.currentTitle = currentWord.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let typingSpeed = 100;
    if (this.isDeleting) {
      typingSpeed = 50; // Deletes faster
    }

    if (!this.isDeleting && this.charIndex === currentWord.length) {
      // Pause at full word
      typingSpeed = 1800;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.titleIndex = (this.titleIndex + 1) % this.titles.length;
      typingSpeed = 400; // Pause before typing next word
    }

    this.typewriterTimeout = setTimeout(() => {
      this.runTypewriter();
    }, typingSpeed);
  }

  scrollToSection(targetId: string): void {
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
