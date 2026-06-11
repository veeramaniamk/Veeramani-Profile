import { Injectable } from '@angular/core';

export interface GithubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  
  async getUserProfile(username: string): Promise<GithubUser> {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) {
      throw new Error(`GitHub user ${username} not found`);
    }
    return res.json();
  }

  async getUserRepos(username: string): Promise<GithubRepo[]> {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`);
    if (!res.ok) {
      throw new Error(`Failed to fetch repositories for ${username}`);
    }
    return res.json();
  }

  // Processes languages breakdown from repository list
  getLanguageBreakdown(repos: GithubRepo[]): { name: string; count: number; percentage: number }[] {
    const languageCounts: { [key: string]: number } = {};
    let totalCount = 0;

    repos.forEach(repo => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
        totalCount++;
      }
    });

    return Object.entries(languageCounts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: totalCount > 0 ? Math.round((count / totalCount) * 100) : 0
      }))
      .sort((a, b) => b.count - a.count);
  }
}
