import { Component, AfterViewInit, Inject, PLATFORM_ID, HostListener, signal } from '@angular/core';
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
    styleUrls: ['./landing.component.css']
})
export class LandingComponent implements AfterViewInit {
    constructor(
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: object
    ) { }
    // class toggles
    navHidden = signal(false);    // hide when scrolling down
    navOpaque = signal(false);    // add glass bg after leaving hero

    private lastY = 0;
    private ticking = false;

    @HostListener('window:scroll')
    onScroll() {
        if (!isPlatformBrowser(this.platformId)) return; // SSR safety :contentReference[oaicite:5]{index=5}

        const y = window.scrollY || document.documentElement.scrollTop;

        if (!this.ticking) {
            requestAnimationFrame(() => {                 // throttle to frames  :contentReference[oaicite:6]{index=6}
                const goingDown = y > this.lastY;
                const pastHero = y > 80;                    // adjust as needed

                this.navHidden.set(goingDown && pastHero);  // hide while scrolling down
                this.navOpaque.set(pastHero);               // add glass after leaving hero

                this.lastY = y <= 0 ? 0 : y;
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            const slug = this.router.url.replace('/', '');
            if (slug) setTimeout(() => document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth' }));
        }
    }
}



// import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
// import { Router } from '@angular/router';
// import { isPlatformBrowser } from '@angular/common';

// import { HomeComponent } from './home.component';
// import { AboutComponent } from './about.component';
// import { ProjectsComponent } from './projects.component';
// import { VideoComponent } from './video.component';
// import { ContactComponent } from './contact.component';

// @Component({
//     selector: 'app-landing',
//     standalone: true,
//     imports: [
//         HomeComponent, AboutComponent, ProjectsComponent, VideoComponent, ContactComponent
//     ],
//     templateUrl: './landing.component.html',
//     styleUrls: []
// })
// export class LandingComponent implements AfterViewInit {
//     constructor(
//         private router: Router,
//         @Inject(PLATFORM_ID) private platformId: object
//     ) { }

//     /** Scroll to the section whose name matches the current path. */
//     ngAfterViewInit(): void {
//         if (isPlatformBrowser(this.platformId)) {
//             const slug = this.router.url.replace('/', '');          // '' | 'about' | …
//             if (slug) {
//                 setTimeout(() =>
//                     document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth' })
//                 );
//             }
//         }
//     }
// }
