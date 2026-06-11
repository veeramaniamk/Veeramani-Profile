import { Component, OnInit, OnDestroy, HostListener, inject, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  readonly themeService = inject(ThemeService);
  private readonly platformId = inject(PLATFORM_ID);

  scrollPercent = 0;
  isScrolled = false;
  isMobileMenuOpen = false;

  navLinks = [
    { label: 'About', target: 'about' },
    { label: 'Skills', target: 'skills' },
    { label: 'Projects', target: 'projects' },
    { label: 'Experience', target: 'experience' },
    { label: 'GitHub', target: 'github' },
    { label: 'Contact', target: 'contact' }
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.calculateScroll();
    }
  }

  ngOnDestroy(): void {
    // Standard cleanup if needed
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.calculateScroll();
    }
  }

  calculateScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    this.isScrolled = scrollTop > 20;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Prevent body scroll when menu is open
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = 'auto';
  }

  scrollToSection(targetId: string): void {
    this.closeMobileMenu();
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
