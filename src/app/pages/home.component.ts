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
// src/app/pages/home.component.ts


// Claude version
import { Component, HostListener, OnInit, OnDestroy,Inject, PLATFORM_ID } from '@angular/core';
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

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

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


// export class HomeComponent implements OnInit, OnDestroy {
//   private animationFrameId: number | null = null;
//   private lastX: number = 0;
//   private lastY: number = 0;
//   private isAnimating: boolean = false;

//   ngOnInit() {
//     // Initialize spotlight at center
//     this.updateSpotlight(window.innerWidth / 2, window.innerHeight / 2);
//   }

//   ngOnDestroy() {
//     if (this.animationFrameId) {
//       cancelAnimationFrame(this.animationFrameId);
//     }
//   }

//   @HostListener('pointermove', ['$event'])
//   onPointerMove(e: PointerEvent) {
//     if (!this.isAnimating) {
//       this.isAnimating = true;
//       this.animationFrameId = requestAnimationFrame(() => {
//         this.updateSpotlight(e.clientX, e.clientY);
//         this.isAnimating = false;
//       });
//     }
//   }

//   @HostListener('pointerleave', ['$event'])
//   onPointerLeave(e: PointerEvent) {
//     // Smoothly transition spotlight to center when mouse leaves
//     this.updateSpotlight(window.innerWidth / 2, window.innerHeight / 2);
//   }

//   @HostListener('window:resize', ['$event'])
//   onWindowResize(e: Event) {
//     // Update spotlight position on window resize
//     this.updateSpotlight(window.innerWidth / 2, window.innerHeight / 2);
//   }

//   private updateSpotlight(x: number, y: number) {
//     // Smooth interpolation for better performance
//     const smoothX = this.lastX + (x - this.lastX) * 0.1;
//     const smoothY = this.lastY + (y - this.lastY) * 0.1;

//     this.lastX = smoothX;
//     this.lastY = smoothY;

//     document.documentElement.style.setProperty('--spot-x', `${smoothX}px`);
//     document.documentElement.style.setProperty('--spot-y', `${smoothY}px`);
//   }

//   // Form handling methods
//   onSubmit(event: Event) {
//     event.preventDefault();
//     const formData = new FormData(event.target as HTMLFormElement);
//     const email = formData.get('email');
//     const password = formData.get('password');

//     // Add your login logic here
//     console.log('Login attempt:', { email, password });

//     // Example: Add loading state, validation, etc.
//     this.handleLogin(email as string, password as string);
//   }

//   private handleLogin(email: string, password: string) {
//     // Implement your authentication logic
//     // This could include API calls, validation, etc.
//     console.log('Handling login for:', email);

//     // Example loading state management
//     // You can add loading spinners, disable buttons, etc.
//   }

//   onSocialLogin(provider: string) {
//     console.log('Social login with:', provider);
//     // Implement social login logic
//   }

//   onForgotPassword() {
//     console.log('Forgot password clicked');
//     // Implement forgot password logic
//   }

//   onSignUp() {
//     console.log('Sign up clicked');
//     // Navigate to sign up page or show sign up form
//   }
// }
