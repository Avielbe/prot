// src/app/app.component.ts  – overwrite the file
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent }     from './pages/home.component';
import { AboutComponent }    from './pages/about.component';
import { ProjectsComponent } from './pages/projects.component';
import { VideoComponent }    from './pages/video.component';
import { ContactComponent }  from './pages/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,            // ngIf, ngFor, etc.
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    VideoComponent,
    ContactComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { }


// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HomeComponent }     from './pages/home.component';
// import { AboutComponent }    from './pages/about.component';
// import { ProjectsComponent } from './pages/projects.component';
// import { VideoComponent }    from './pages/video.component';
// import { ContactComponent }  from './pages/contact.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [
//     CommonModule,            // ngIf, ngFor, etc.
//     HomeComponent,
//     AboutComponent,
//     ProjectsComponent,
//     VideoComponent,
//     ContactComponent
//   ],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent { }
