import { Component, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Card } from '../card/card';
import { Skill } from '../interfaces/skill';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skill-list',
  imports: [Card, CommonModule],
  templateUrl: './skill-list.html',
  styleUrl: './skill-list.scss'
})
export class SkillList implements AfterViewInit {
  @ViewChild('skillContainer') skillContainer!: ElementRef<HTMLDivElement>;

  isDragging = false;
  startX = 0;
  scrollLeftPos = 0;
  canScrollLeft = false;
  canScrollRight = false;

  constructor(private cdr: ChangeDetectorRef) {}

  skills: Skill[] = [
    {
      imageUrl: '/skill_icons/angular_gradient.png',
      title: 'Angular',
      skillLevel: 'intermediate'
    },
    {
      imageUrl: '/skill_icons/MongoDB.png',
      title: 'MongoDB',
      skillLevel: 'expert'
    },
    {
      imageUrl: '/skill_icons/angular_gradient.png',
      title: 'Python',
      skillLevel: 'expert'
    },
    {
      imageUrl: '/skill_icons/angular_gradient.png',
      title: 'Node.js',
      skillLevel: 'intermediate'
    },
    {
      imageUrl: '/skill_icons/angular_gradient.png',
      title: 'Flutter',
      skillLevel: 'intermediate'
    },
    {
      imageUrl: '/skill_icons/angular_gradient.png',
      title: 'JavaScript',
      skillLevel: 'advanced'
    },
    {
      imageUrl: '/skill_icons/angular_gradient.png',
      title: 'Docker',
      skillLevel: 'intermediate'
    },
    {
      imageUrl: '/skill_icons/angular_gradient.png',
      title: 'AWS',
      skillLevel: 'intermediate'
    },
    {
      imageUrl: '/skill_icons/angular_gradient.png',
      title: 'LangGraph',
      skillLevel: 'intermediate'
    },
    {
      imageUrl: '/skill_icons/angular_gradient.png',
      title: 'Express.js',
      skillLevel: 'intermediate'
    }
  ];

  ngAfterViewInit() {
    // Delay to ensure DOM is fully rendered
    setTimeout(() => {
      this.updateScrollButtons();

      // Add scroll event listener to update button visibility
      const container = this.skillContainer.nativeElement;
      container.addEventListener('scroll', () => this.updateScrollButtons());
    }, 100);
  }

  updateScrollButtons() {
    const container = this.skillContainer.nativeElement;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    this.canScrollLeft = scrollLeft > 1;
    this.canScrollRight = scrollLeft < (scrollWidth - clientWidth - 1);

    // Trigger change detection in zoneless mode
    this.cdr.markForCheck();
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.isDragging = true;
    const container = this.skillContainer.nativeElement;
    this.startX = event.pageX;
    this.scrollLeftPos = container.scrollLeft;
    container.style.cursor = 'grabbing';
    container.style.scrollBehavior = 'auto';
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    event.preventDefault();
    const container = this.skillContainer.nativeElement;
    const x = event.pageX;
    const walk = this.startX - x;
    container.scrollLeft = this.scrollLeftPos + walk;
  }

  onMouseUp() {
    this.isDragging = false;
    const container = this.skillContainer.nativeElement;
    container.style.cursor = 'grab';
    container.style.scrollBehavior = 'smooth';
  }

  onMouseLeave() {
    if (this.isDragging) {
      this.isDragging = false;
      const container = this.skillContainer.nativeElement;
      container.style.cursor = 'grab';
      container.style.scrollBehavior = 'smooth';
    }
  }

  scrollRight() {
    const container = this.skillContainer.nativeElement;
    container.scrollBy({ left: 324, behavior: 'smooth' });
  }

  scrollToPrev() {
    const container = this.skillContainer.nativeElement;
    container.scrollBy({ left: -324, behavior: 'smooth' });
  }
}
