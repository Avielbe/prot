// src/app/pages/homcontacte.component.ts  (repeat for about, projects, …)
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',                 // unique tag name
  standalone: true,                     // no NgModule needed
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']   // can stay empty for Tailwind-only
})
export class ContactComponent {}

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-contact',
//   imports: [],
//   templateUrl: './contact.component.html',
//   styleUrl: './contact.component.css'
// })
// export class ContactComponent {

// }
