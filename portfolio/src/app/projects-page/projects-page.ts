import { Component, ElementRef, ViewChild, AfterViewInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCard } from '../project-card/project-card';
import { Project } from '../interfaces/project';

@Component({
  selector: 'app-projects-page',
  imports: [CommonModule, ProjectCard],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.scss'
})
export class ProjectsPage implements AfterViewInit {
  @ViewChild('projectsContainer') projectsContainer!: ElementRef<HTMLDivElement>;

  currentPageSignal = signal(0);

  get currentPage(): number {
    return this.currentPageSignal();
  }

  set currentPage(value: number) {
    this.currentPageSignal.set(value);
  }

  // List of Projects
  projects: Project[] = [
    {
      name: 'Portfolio Website',
      subtitle: 'Personal Project',
      imageUrl: '/project_images/portfolio.png',
      technologies: ['Angular', 'TypeScript', 'SCSS', 'HTML', 'AWS', 'Docker'],
      repoUrl: "https://github.com/kirex0/portfolio-site/blob/main/portfolio/README.md"
    },
    {
      name: 'Spiderbyte',
      subtitle: 'Capstone Project',
      imageUrl: '/project_images/portfolio.png',
      technologies: ['python', 'MongoDB', 'Node.js', 'RabbitMQ', 'Gemini-API', 'React', 'RESTful APIs', 'Websockets', 'Docker'],
      repoUrl: "https://github.com/kirex0/spiderbyte-server"
    },
    {
      name: "Roadrunner Connect",
      subtitle: "Internship",
      imageUrl: "",
      technologies: ['MongoDB', 'Flutter/Dart', 'Node.js', 'python', 'AWS S3', 'RESTful APIs', 'Docker'],
      deployedUrl: "https://roadrunnerconnect.co/"
    }
  ];

  ngAfterViewInit() {
    this.updateArrowVisibility();
  }

  get totalPages(): number {
    return Math.ceil(this.projects.length / 3);
  }

  get visibleProjects(): Project[] {
    const start = this.currentPage * 3;
    return this.projects.slice(start, start + 3);
  }

  get canScrollDown(): boolean {
    return this.currentPage < this.totalPages - 1;
  }

  scrollToNextSet() {
    if (this.canScrollDown) {
      this.currentPage++;
      this.updateArrowVisibility();
    }
  }

  scrollToPrevSet() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateArrowVisibility();
    }
  }

  private updateArrowVisibility() {
    // Scroll to top of the page smoothly
    if (this.projectsContainer) {
      this.projectsContainer.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
