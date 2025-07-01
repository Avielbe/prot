// src/app/pages/home.component.ts  (repeat for about, projects, …)
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',                 // unique tag name
  standalone: true,                     // no NgModule needed
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']   // can stay empty for Tailwind-only
})
export class HomeComponent { }

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   imports: [],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.css'
// })
// export class HomeComponent {

// }
