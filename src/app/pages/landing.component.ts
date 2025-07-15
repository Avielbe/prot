import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { ProjectsComponent } from './projects.component';
import { VideoComponent } from './video.component';
import { ContactComponent } from './contact.component';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [
        HomeComponent, AboutComponent, ProjectsComponent, VideoComponent, ContactComponent
    ],
    templateUrl: './landing.component.html',
    styleUrls: []
})
export class LandingComponent implements AfterViewInit {
    constructor(
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: object
    ) { }

    /** Scroll to the section whose name matches the current path. */
    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            const slug = this.router.url.replace('/', '');          // '' | 'about' | …
            if (slug) {
                setTimeout(() =>
                    document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth' })
                );
            }
        }
    }
}
