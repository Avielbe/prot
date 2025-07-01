// src/app/pages/projects.component.ts  (repeat for about, projectss, …)
import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',                 // unique tag name
  standalone: true,                     // no NgModule needed
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']   // can stay empty for Tailwind-only
})
export class ProjectsComponent {}


// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-projects',
//   imports: [],
//   templateUrl: './projects.component.html',
//   styleUrl: './projects.component.css'
// })
// export class ProjectsComponent {

// }
