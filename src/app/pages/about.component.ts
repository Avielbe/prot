// src/app/pages/about.component.ts  (repeat for about, projects, …)
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',                 // unique tag name
  standalone: true,                     // no NgModule needed
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']   // can stay empty for Tailwind-only
})
export class AboutComponent {}

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-about',
//   imports: [],
//   templateUrl: './about.component.html',
//   styleUrl: './about.component.css'
// })
// export class AboutComponent {

// }
