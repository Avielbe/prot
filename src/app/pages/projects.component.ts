import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  constructor(private el: ElementRef) {}

  onGridClick(event: Event) {
    // 1. Did we click an “Explore” button?
    const toggleBtn = (event.target as HTMLElement)
      .closest('[data-action="toggle-details"]') as HTMLElement;
    if (!toggleBtn) return;

    // 2. Find its card
    const card = toggleBtn.closest('.project-card') as HTMLElement;
    if (!card) return;

    // 3. If opening, trigger glitch overlay
    if (!card.classList.contains('active')) {
      const imgWrap = card.querySelector('.project-image-wrapper')!;
      const overlay = document.createElement('div');
      overlay.className = 'glitch-overlay';
      imgWrap.appendChild(overlay);
      overlay.addEventListener('animationend', () => overlay.remove(), { once: true });
    }

    // 4. Close any other open cards
    this.el.nativeElement
      .querySelectorAll('.project-card.active')
      .forEach((other: HTMLElement) => {
        if (other !== card) other.classList.remove('active');
      });

    // 5. Toggle this one
    card.classList.toggle('active');
  }
}



// // src/app/pages/projects.component.ts  (repeat for about, projectss, …)
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-projects',                 // unique tag name
//   standalone: true,                     // no NgModule needed
//   templateUrl: './projects.component.html',
//   styleUrls: ['./projects.component.css']   // can stay empty for Tailwind-only
// })
// export class ProjectsComponent {}


// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-projects',
//   imports: [],
//   templateUrl: './projects.component.html',
//   styleUrl: './projects.component.css'
// })
// export class ProjectsComponent {

// }
