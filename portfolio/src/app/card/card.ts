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
      const cardElement = this.elementRef.nativeElement.querySelector('[data-tilt]');
      if (cardElement) {
        VanillaTilt.init(cardElement, {
          max: 25,
          speed: 400,
          glare: true,
          'max-glare': 0.1,
        });
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

