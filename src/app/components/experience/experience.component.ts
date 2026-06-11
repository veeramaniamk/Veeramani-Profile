import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface TimelineItem {
  role: string;
  category: string;
  points: string[];
  icon: string;
  color: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  timeline: TimelineItem[] = [
    {
      role: 'Android Development',
      category: 'Mobile Applications Development',
      points: [
        'Developing high-performance Native Android Applications using Kotlin and Java',
        'Implementing clean code principles and architecture layouts using MVVM Architecture',
        'Integrating network endpoints and backend services via REST API Integration',
        'Setting up Firebase Integration (Firestore, Authentication, Realtime Database)',
        'Delivering instant updates and marketing triggers with Firebase Push Notifications'
      ],
      icon: 'smartphone',
      color: '#3DDC84'
    },
    {
      role: 'Backend Development',
      category: 'Full Stack & APIs Engineering',
      points: [
        'Building secure, enterprise-ready Web APIs using Spring Boot frameworks',
        'Creating microservices and lightweight runtime apps in Node.js Applications',
        'Implementing token-based secure endpoints and JWT Authentication Systems',
        'Designing relational and document layouts for Database Design (MySQL, MongoDB)'
      ],
      icon: 'server',
      color: '#8b5cf6'
    }
  ];
}
