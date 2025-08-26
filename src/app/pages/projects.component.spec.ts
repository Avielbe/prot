// import {
//   Component,
//   AfterViewInit,
//   ElementRef,
//   Renderer2
// } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-projects',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './projects.component.html',
//   styleUrls: ['./projects.component.css'],
// })
// export class ProjectsComponent implements AfterViewInit {
//   constructor(
//     private el: ElementRef,
//     private renderer: Renderer2
//   ) {}

//   ngAfterViewInit() {
//     const grid: HTMLElement = this.el.nativeElement.querySelector(
//       '.projects-grid'
//     );

//     this.renderer.listen(grid, 'click', (event: Event) => {
//       const btn = (event.target as HTMLElement).closest(
//         '[data-action="toggle-details"]'
//       ) as HTMLElement;
//       if (!btn) return;

//       const card = btn.closest('.project-card') as HTMLElement;
//       if (!card) return;

//       // glitch effect on open
//       if (!card.classList.contains('active')) {
//         const imgWrap = card.querySelector(
//           '.project-image-wrapper'
//         ) as HTMLElement;
//         const overlay = this.renderer.createElement('div');
//         this.renderer.addClass(overlay, 'glitch-overlay');
//         this.renderer.appendChild(imgWrap, overlay);

//         // remove overlay after animation
//         this.renderer.listen(overlay, 'animationend', () => {
//           this.renderer.removeChild(imgWrap, overlay);
//         }, { once: true });
//       }

//       // toggle detail panel
//       const isActive = card.classList.contains('active');
//       // close any other open card
//       this.el.nativeElement
//         .querySelectorAll('.project-card.active')
//         .forEach((other: HTMLElement) =>
//           this.renderer.removeClass(other, 'active')
//         );
//       // toggle this one
//       if (!isActive) {
//         this.renderer.addClass(card, 'active');
//       }
//     });
//   }
// }


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
