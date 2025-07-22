// // src/app/pages/home.component.ts 
// import { Component, HostListener} from '@angular/core';

// @Component({
//   selector: 'app-home',                 
//   // standalone: true,
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']  
// })
// // export class HomeComponent { }
// export class HomeComponent {
//   @HostListener('pointermove', ['$event'])
//   onPointerMove(e: PointerEvent) {
//     document.documentElement.style.setProperty('--spot-x', `${e.clientX}px`);
//     document.documentElement.style.setProperty('--spot-y', `${e.clientY}px`);
//   }
// }


// Claude version
import { Component, HostListener, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit, OnDestroy {
  private animationFrameId: number | null = null;
  private lastX = 0;
  private lastY = 0;
  private isAnimating = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize spotlight at center only in browser
      this.updateSpotlight(
        window.innerWidth / 2,
        window.innerHeight / 2
      );
    }
  }

  ngOnDestroy() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  @HostListener('pointermove', ['$event'])
  onPointerMove(e: PointerEvent) {
    if (!this.isAnimating && isPlatformBrowser(this.platformId)) {
      this.isAnimating = true;
      this.animationFrameId = requestAnimationFrame(() => {
        this.updateSpotlight(e.clientX, e.clientY);
        this.isAnimating = false;
      });
    }
  }

  @HostListener('pointerleave')
  onPointerLeave() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateSpotlight(
        window.innerWidth / 2,
        window.innerHeight / 2
      );
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateSpotlight(
        window.innerWidth / 2,
        window.innerHeight / 2
      );
    }
  }

  private updateSpotlight(x: number, y: number) {
    // Smooth interpolation
    const smoothX = this.lastX + (x - this.lastX) * 0.1;
    const smoothY = this.lastY + (y - this.lastY) * 0.1;

    this.lastX = smoothX;
    this.lastY = smoothY;

    document.documentElement.style.setProperty(
      '--spot-x',
      `${smoothX}px`
    );
    document.documentElement.style.setProperty(
      '--spot-y',
      `${smoothY}px`
    );
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    console.log('Login attempt:', { email, password });
    this.handleLogin(email, password);
  }

  private handleLogin(email: string, password: string) {
    console.log('Handling login for:', email);
    // your auth logic here
  }

  onSocialLogin(provider: string) {
    console.log('Social login with:', provider);
  }

  onForgotPassword() {
    console.log('Forgot password clicked');
  }

  onSignUp() {
    console.log('Sign up clicked');
  }
}
