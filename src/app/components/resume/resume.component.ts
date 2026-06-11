import { Component, ElementRef, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent {
  private readonly platformId = inject(PLATFORM_ID);
  
  @ViewChild('tiltCard') tiltCard!: ElementRef;

  // Handles 3D Tilt orientation variables based on mouse location inside card bounds
  onMouseMove(e: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId) || !this.tiltCard) return;

    const card = this.tiltCard.nativeElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentages
    const percentX = x / rect.width;
    const percentY = y / rect.height;
    
    // Map to angles (-15deg to 15deg)
    const rotateX = (0.5 - percentY) * 20;
    const rotateY = (percentX - 0.5) * 20;

    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
  }

  // Resets card orientation
  onMouseLeave(): void {
    if (!isPlatformBrowser(this.platformId) || !this.tiltCard) return;
    
    const card = this.tiltCard.nativeElement;
    card.style.setProperty('--rotate-x', `0deg`);
    card.style.setProperty('--rotate-y', `0deg`);
  }
}
