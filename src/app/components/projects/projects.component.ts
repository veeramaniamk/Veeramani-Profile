import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface Project {
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  category: 'android' | 'fullstack';
  gradient: string;
  githubUrl: string;
  demoUrl?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  selectedFilter: 'all' | 'android' | 'fullstack' = 'all';

  projects: Project[] = [
    {
      title: 'Stroke Care',
      description: 'A comprehensive healthcare application offering personalized physical rehabilitation support and tracking.',
      features: ['Physiotherapy guidance', 'Progress tracking', 'Doctor-patient interaction', 'Personalized support'],
      technologies: ['Android', 'Kotlin', 'Firebase'],
      category: 'android',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      githubUrl: 'https://github.com/veeramaniamk/stroke-care'
    },
    {
      title: 'SpareFinds',
      description: 'A secure peer-to-peer bike spare parts marketplace application supporting product discovery and orders.',
      features: ['Product browsing', 'Spare part search', 'Order management', 'User-friendly interface'],
      technologies: ['Android', 'Kotlin', 'REST API', 'MySQL'],
      category: 'android',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      githubUrl: 'https://github.com/veeramaniamk/spare-finds'
    },
    {
      title: 'Tutor Finder',
      description: 'An educational matches platform designed to seamlessly connect local students with matching academic tutors.',
      features: ['Tutor discovery', 'Search and filtering', 'User management', 'Interactive booking'],
      technologies: ['Android', 'Firebase'],
      category: 'android',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
      githubUrl: 'https://github.com/veeramaniamk/tutor-finder'
    },
    {
      title: 'Heart Rate Monitoring',
      description: 'A health tracking application supporting real-time data visualizers and cardiac analytics.',
      features: ['Heart rate tracking', 'Data visualization', 'User analytics', 'Weekly progress reporting'],
      technologies: ['Android', 'Java'],
      category: 'android',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
      githubUrl: 'https://github.com/veeramaniamk/heart-rate-monitoring'
    },
    {
      title: 'AYUSH Startup Portal',
      description: 'Government ecosystem platform facilitating onboarding, investor matching, and incubator collaboration.',
      features: ['Startup onboarding', 'Investor interaction', 'Incubator collaboration', 'Government support integration'],
      technologies: ['Java', 'Spring Boot', 'MySQL'],
      category: 'fullstack',
      gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
      githubUrl: 'https://github.com/veeramaniamk/ayush-portal'
    },
    {
      title: 'Rainwater Harvesting System',
      description: 'Government monitoring web application tracking rainwater implementation layouts, vendor contracts, and analytics.',
      features: ['Project tracking', 'Vendor management', 'Monitoring dashboard', 'GIS layout previews'],
      technologies: ['Spring Boot', 'MySQL', 'Angular'],
      category: 'fullstack',
      gradient: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
      githubUrl: 'https://github.com/veeramaniamk/rainwater-harvesting'
    }
  ];

  get filteredProjects(): Project[] {
    if (this.selectedFilter === 'all') {
      return this.projects;
    }
    return this.projects.filter(p => p.category === this.selectedFilter);
  }

  setFilter(filter: 'all' | 'android' | 'fullstack'): void {
    this.selectedFilter = filter;
  }
}
