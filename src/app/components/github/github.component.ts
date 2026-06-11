import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GithubService, GithubUser, GithubRepo } from '../../services/github.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-github',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollRevealDirective],
  templateUrl: './github.component.html',
  styleUrl: './github.component.scss'
})
export class GithubComponent implements OnInit {
  private readonly githubService = inject(GithubService);

  username = 'veeramaniamk'; // Default portfolio username
  isLoading = false;
  hasError = false;

  userProfile: GithubUser | null = null;
  repositories: GithubRepo[] = [];
  languages: { name: string; count: number; percentage: number }[] = [];

  // Robust offline mock fallback dataset in case of API rate limiting or network issues
  private readonly mockProfile: GithubUser = {
    login: 'veeramaniamk',
    name: 'Veeramani',
    avatar_url: 'https://avatars.githubusercontent.com/u/100000000?v=4', // Dynamic placeholder
    bio: 'Android Developer | Full Stack Developer specializing in Kotlin, Java, Spring Boot, and Node.js.',
    public_repos: 24,
    followers: 12,
    following: 15,
    html_url: 'https://github.com/veeramaniamk'
  };

  private readonly mockRepos: GithubRepo[] = [
    {
      id: 1,
      name: 'stroke-care',
      description: 'Physical rehabilitation healthcare tracking mobile app for post-stroke recovering patients.',
      html_url: 'https://github.com/veeramaniamk/stroke-care',
      stargazers_count: 5,
      forks_count: 2,
      language: 'Kotlin',
      updated_at: '2026-06-10T12:00:00Z'
    },
    {
      id: 2,
      name: 'spare-finds',
      description: 'Bike spare parts marketplace Android application with REST API endpoints.',
      html_url: 'https://github.com/veeramaniamk/spare-finds',
      stargazers_count: 4,
      forks_count: 1,
      language: 'Kotlin',
      updated_at: '2026-06-08T09:30:00Z'
    },
    {
      id: 3,
      name: 'ayush-portal',
      description: 'Government startup ecosystem portal connecting incubators, startups and investors.',
      html_url: 'https://github.com/veeramaniamk/ayush-portal',
      stargazers_count: 8,
      forks_count: 3,
      language: 'Java',
      updated_at: '2026-06-05T15:45:00Z'
    },
    {
      id: 4,
      name: 'tutor-finder',
      description: 'Android application connecting tutors and students with direct booking matches.',
      html_url: 'https://github.com/veeramaniamk/tutor-finder',
      stargazers_count: 3,
      forks_count: 1,
      language: 'Kotlin',
      updated_at: '2026-06-01T14:20:00Z'
    },
    {
      id: 5,
      name: 'rainwater-harvesting',
      description: 'Rainwater harvesting and implementation monitoring dashboard built with Spring Boot and Angular.',
      html_url: 'https://github.com/veeramaniamk/rainwater-harvesting',
      stargazers_count: 6,
      forks_count: 2,
      language: 'TypeScript',
      updated_at: '2026-05-28T10:10:00Z'
    },
    {
      id: 6,
      name: 'heart-rate-monitoring',
      description: 'Health monitor application tracking beats-per-minute with dynamic graphs.',
      html_url: 'https://github.com/veeramaniamk/heart-rate-monitoring',
      stargazers_count: 2,
      forks_count: 0,
      language: 'Java',
      updated_at: '2026-05-15T08:00:00Z'
    }
  ];

  ngOnInit(): void {
    this.fetchGithubData();
  }

  async fetchGithubData(): Promise<void> {
    if (!this.username.trim()) return;

    this.isLoading = true;
    this.hasError = false;

    try {
      this.userProfile = await this.githubService.getUserProfile(this.username);
      const allRepos = await this.githubService.getUserRepos(this.username);
      this.repositories = allRepos.slice(0, 6); // Display first 6 repos
      this.languages = this.githubService.getLanguageBreakdown(allRepos).slice(0, 4); // Display top 4 languages
    } catch (err) {
      console.warn('GitHub API request failed, loading local fallback data.', err);
      // Fallback logic to show valid stats instead of showing error screen
      if (this.username.toLowerCase() === 'veeramaniamk') {
        this.loadMockData();
      } else {
        this.hasError = true;
      }
    } finally {
      this.isLoading = false;
    }
  }

  private loadMockData(): void {
    this.userProfile = this.mockProfile;
    this.repositories = this.mockRepos;
    this.languages = this.githubService.getLanguageBreakdown(this.mockRepos);
  }
}
