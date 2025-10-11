import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from '../interfaces/page';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss'
})
export class NavBar {
  profileImage = 'https://0.gravatar.com/avatar/b2b42f5a4e86a86ee363116e2968961beca23dad3fc3a73b35f98ca3e824183d?s=256&d=initials';
 
  // Pages for the nav bar
  pages: Page[] = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Resume/CV', path: '/cv_resume' },
    { name: 'Connect', path: '/connect' }
  ];
  
  // Set the current page as the first page
  current_page: Page = this.pages[0];

  constructor(private router: Router) { }

  navigateTo(page: Page) {
    this.current_page = page;
    this.router.navigate([page.path]);
  }
}

