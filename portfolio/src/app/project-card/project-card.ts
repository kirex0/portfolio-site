import { Component, Input, ElementRef, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-card',
  imports: [CommonModule],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss'
})
export class ProjectCard implements AfterViewInit {
  @Input({required: true}) name!: string;
  @Input({required: true}) subtitle!: string;
  @Input({required: true}) imageUrl!: string;
  @Input({required: true}) technologies!: string[];
  @Input() deployedUrl?: string;
  @Input() repoUrl?: string;

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    // Only run animation in the browser, not during SSR
    if (isPlatformBrowser(this.platformId)) {
      const cardElement = this.elementRef.nativeElement.querySelector('.project-card') as HTMLElement;
      if (cardElement) {
        // Get the card index from the host element
        const hostElement = this.elementRef.nativeElement as HTMLElement;
        const cardIndex = parseInt(getComputedStyle(hostElement).getPropertyValue('--card-index') || '0', 10);
        const delay = cardIndex * 150 + 800; // 0.15s * index + 0.8s initial delay

        // Trigger fade-in animation
        setTimeout(() => {
          cardElement.classList.add('visible');
        }, delay);
      }
    }
  }
}
