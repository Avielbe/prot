import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { AboutComponent } from './pages/about.component';
import { ProjectsComponent } from './pages/projects.component';
import { ContactComponent } from './pages/contact.component';
import { VideoComponent } from './pages/video.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Aviel Ben | Full-Stack Developer & Product Builder' },
    { path: 'about', component: AboutComponent, title: 'About' },
    { path: 'projects', component: ProjectsComponent, title: 'Projects' },
    { path: 'video', component: VideoComponent, title: 'Video' },
    { path: 'contact', component: ContactComponent, title: 'Contact' },
];
