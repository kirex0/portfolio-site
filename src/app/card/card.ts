import { Component, Input, ElementRef, AfterViewInit, PLATFORM_ID, Inject, input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrls: ['./card.scss']
})
export class Card implements AfterViewInit {
  @Input({required: true}) imageUrl!: string;
  @Input({required: true}) title!: string;
  @Input({required: true}) skillLevel!: string;

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    // Only initialize VanillaTilt in the browser, not during SSR
    if (isPlatformBrowser(this.platformId)) {
      const cardElement = this.elementRef.nativeElement.querySelector('[data-tilt]') as HTMLElement;
      if (cardElement) {
        // Get the card index from the host element (app-card)
        const hostElement = this.elementRef.nativeElement as HTMLElement;
        const cardIndex = parseInt(getComputedStyle(hostElement).getPropertyValue('--card-index') || '0', 10);
        const delay = cardIndex * 150 + 800; // 0.15s * index + 0.8s initial delay

        // Trigger fade-in animation
        setTimeout(() => {
          cardElement.classList.add('visible');
        }, delay);

        // Initialize VanillaTilt after the fade-in completes
        setTimeout(() => {
          VanillaTilt.init(cardElement, {
            max: 20,
            speed: 200,
            glare: true,
            'max-glare': 0.3,
          });

          // Ensure transform-style: preserve-3d is maintained for child translateZ to work
          cardElement.style.transformStyle = 'preserve-3d';
        }, delay + 600); // delay + transition duration
      }
    }
  }

  getSkillColor(): string {
    const levelMap: { [key: string]: string } = {
      'beginner': '#64748B',      // Gray
      'intermediate': '#3B82F6',  // Blue
      'advanced': '#8B5CF6',      // Purple
      'expert': '#10B981',        // Green
      'master': '#F59E0B'         // Orange/Gold
    };
    return levelMap[this.skillLevel.toLowerCase()] || '#64748B';
  }
}

