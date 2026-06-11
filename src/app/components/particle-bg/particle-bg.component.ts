import { Component, ElementRef, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  fadeSpeed: number;
}

@Component({
  selector: 'app-particle-bg',
  standalone: true,
  templateUrl: './particle-bg.component.html',
  styleUrl: './particle-bg.component.scss'
})
export class ParticleBgComponent implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId!: number;
  private particles: Particle[] = [];
  private maxParticles = 60;
  private mouse = { x: -1000, y: -1000 };

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.canvas = this.elementRef.nativeElement.querySelector('canvas');
      this.ctx = this.canvas.getContext('2d')!;
      this.resizeCanvas();
      this.initParticles();
      this.animate();

      window.addEventListener('resize', this.onResize);
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseout', this.onMouseLeave);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.onResize);
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseout', this.onMouseLeave);
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private onResize = (): void => {
    this.resizeCanvas();
    this.initParticles();
  };

  private onMouseMove = (e: MouseEvent): void => {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  };

  private onMouseLeave = (): void => {
    this.mouse.x = -1000;
    this.mouse.y = -1000;
  };

  private resizeCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private initParticles(): void {
    this.particles = [];
    const colorOptions = ['#3b82f6', '#8b5cf6', '#d946ef', '#06b6d4', '#f97316'];
    
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle(colorOptions));
    }
  }

  private createParticle(colors: string[]): Particle {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.1,
      fadeSpeed: 0.005 + Math.random() * 0.005
    };
  }

  private animate = (): void => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw particles
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      // Handle boundaries
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fill();

      // Interactive link lines with mouse
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.strokeStyle = p.color;
        this.ctx.globalAlpha = (1 - dist / 120) * 0.2;
        this.ctx.lineWidth = 0.5;
        this.ctx.stroke();
      }
    });

    this.ctx.globalAlpha = 1.0;
    this.animationFrameId = requestAnimationFrame(this.animate);
  };
}
