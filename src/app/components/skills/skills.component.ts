import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface Skill {
  name: string;
  level: number; // Percentage
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  skillCategories: SkillCategory[] = [
    {
      title: 'Mobile Development',
      icon: 'smartphone',
      skills: [
        { name: 'Kotlin', level: 90 },
        { name: 'Java', level: 85 },
        { name: 'Android SDK', level: 90 },
        { name: 'Jetpack Compose', level: 85 },
        { name: 'XML UI', level: 90 },
        { name: 'MVVM Architecture', level: 85 },
        { name: 'Room Database', level: 80 },
        { name: 'Retrofit', level: 85 }
      ]
    },
    {
      title: 'Backend Development',
      icon: 'server',
      skills: [
        { name: 'Spring Boot', level: 80 },
        { name: 'Node.js', level: 75 },
        { name: 'Express.js', level: 75 },
        { name: 'PHP', level: 65 }
      ]
    },
    {
      title: 'Databases',
      icon: 'database',
      skills: [
        { name: 'MySQL', level: 85 },
        { name: 'MongoDB', level: 70 },
        { name: 'Firebase Firestore', level: 85 }
      ]
    },
    {
      title: 'Tools & Technologies',
      icon: 'cpu',
      skills: [
        { name: 'Git & GitHub', level: 85 },
        { name: 'Android Studio', level: 90 },
        { name: 'Postman', level: 85 },
        { name: 'VS Code', level: 80 },
        { name: 'Firebase Services', level: 85 }
      ]
    }
  ];
}
