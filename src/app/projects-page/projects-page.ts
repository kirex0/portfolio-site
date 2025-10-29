import { Component, ElementRef, ViewChild, AfterViewInit, signal, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  selectedProject = signal<Project | null>(null);
  isModalOpen = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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
      description: 'This portfolio site is developed using the Angular framework creating a centralized location for me to upload projets, show of skills, and hold my resume. This website will act as a living page for my projects as I develop more and in the future host projects as well.',
      imageUrl: 'assets/project_images/website.png',
      technologies: ['Angular', 'TypeScript', 'SCSS', 'HTML', 'Docker'],
      repoUrl: "https://github.com/kirex0/portfolio-site/tree/main"
    },
    {
      name: 'Spiderbyte',
      subtitle: 'Capstone Project',
      description: 'Spiderbyte is a full-stack web application that generates personalized coding challenges tailored to developers\' specific skill sets and learning goals. Built with React, Node.js, and MongoDB, featuring AI-powered challenge generation through Gemini API based on user-selected tags and difficulty levels. Implemented a RabbitMQ queue system for secure code execution in isolated Docker containers, enabling real-time code evaluation and feedback. The platform validates challenge integrity by generating solutions alongside problems and evaluating the solution on test sets.',
      imageUrl: 'assets/project_images/SpiderByteLogo1.png',
      technologies: ['python', 'MongoDB', 'Node.js', 'RabbitMQ', 'Gemini-API', 'React', 'RESTful APIs', 'Websockets', 'Docker'],
      repoUrl: "https://github.com/kirex0/spiderbyte-server"
    },
    {
      name: "Roadrunner Connect",
      subtitle: "Internship",
      description: 'Roadrunner Connect is a cross-platform mobile application that gamifies campus engagement at Metropolitan State University. Worked with a team of 5 students to build a comprehensive event platform featuring geofence-based check-ins, automated event parsing from university calendars, and a point-based reward system with leaderboards and giveaways. Implemented cron AWS Lambda functions for event synchronization, and auto-renewing JWT authentication for seamless security using Firebase. Developed in an Agile Scrum environment with feature-based full-stack development.',
      imageUrl: "assets/project_images/RoadrunnerConnectLogo.png",
      technologies: ['MongoDB', 'Flutter/Dart', 'Node.js', 'python', 'AWS S3', 'RESTful APIs', 'Docker'],
      deployedUrl: "https://roadrunnerconnect.co/"
    },
    {
      name: "Lucent",
      subtitle: "Hackathon-Project",
      description: 'Lucent is a Campuse wellness app developed during the CU-MSU-DU Hackathon, taking first place in the hackathon. This application created a way for anyone on campus to easily access wellness resources, view counselors on the listed campuses, interact with a chatbot based on peer reviewed research, and engaged the user with streaks enabling users to check into their wellness. This was developed in 24 hours, featuring a LOT of caffeine. This may not be the prettiest code, but it was a great experience and a ton of fun!',
      imageUrl: "assets/project_images/Lucent.png",
      technologies: ['Supabase', 'Flutter/Dart', 'python', 'Fast API', 'OpenAI-API', 'Docker'],
      repoUrl: "https://github.com/orgs/Bit-Happens-Hackathon/repositories"
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
    if (isPlatformBrowser(this.platformId) && this.projectsContainer?.nativeElement) {
      this.projectsContainer.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  openProjectModal(project: Project) {
    this.selectedProject.set(project);
    this.isModalOpen.set(true);
    // Prevent body scroll when modal is open
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedProject.set(null);
    // Restore body scroll
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }
}
