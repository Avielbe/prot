import {
  Component, Inject, PLATFORM_ID, AfterViewInit, OnDestroy, signal
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    :host {
      position: fixed; top: 0; left: 0; right: 0; z-index: 50;
      display: block;
    }
    header {
      /* Avoid 'transparent' keyword during transitions to prevent flash */
      background: rgba(17,24,39,0); /* slate-900 @ 0 */
      transform: translate3d(0,0,0);
      opacity: 1;
      will-change: transform, opacity;
      backface-visibility: hidden;
      transition: transform .28s ease, opacity .20s ease;
      border-bottom: 0;
    }
    .nav-opaque {
      background: rgba(17,24,39,.60);
      border-bottom: 1px solid rgba(255,255,255,.08);
      backdrop-filter: blur(10px) saturate(1.1);
      transition: transform .28s ease, opacity .20s ease,
                  background-color .20s ease, backdrop-filter .20s ease, border-color .20s ease;
    }
    .nav-hidden {
      transform: translate3d(0,-110%,0);
      opacity: 0;
      pointer-events: none;
      background: rgba(17,24,39,0);
      backdrop-filter: none;
      border-color: transparent;
    }
    nav {
      max-width: 1100px; margin-inline: auto;
      padding: clamp(.75rem, 2.5vw, 1rem);
      display: flex; gap: 1rem; align-items: center;
    }
    a {
      text-decoration: none; color: #e5e7eb; opacity: .9;
    }
    a:hover { opacity: 1; color: #34d399; } /* emerald-400 */
    @media (prefers-reduced-motion: reduce){ header{ transition: none; } }
  `],
  template: `
    <header [class.nav-hidden]="navHidden()" [class.nav-opaque]="navOpaque()">
      <nav>
        <!-- Use in-page anchors (single-page layout) -->
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <!-- <a href="#video">Video</a> -->
        <a href="#contact">Contact</a>
      </nav>
    </header>
  `
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  navHidden = signal(false);
  navOpaque = signal(false);

  private isBrowser = false;
  private lastY = 0;
  private ticking = false;
  private rafId = 0;
  private onScrollRef?: () => void;
  private io?: IntersectionObserver;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const onScroll = () => {
      if (this.ticking) return;
      this.ticking = true;
      this.rafId = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const dy = y - this.lastY;
        const threshold = 8;

        if (y < threshold) {
          this.navHidden.set(false);
        } else if (Math.abs(dy) > threshold) {
          this.navHidden.set(dy > 0); // hide on down, show on up
        }

        // fallback: make opaque after leaving top
        this.navOpaque.set(y > 8);

        this.lastY = y;
        this.ticking = false;
      });
    };

    this.onScrollRef = onScroll;
    window.addEventListener('scroll', onScroll, { passive: true });

    // Prefer IntersectionObserver when the hero sentinel exists
    const sentinel = document.getElementById('hero-sentinel');
    if ('IntersectionObserver' in window && sentinel) {
      this.io = new IntersectionObserver(entries => {
        this.navOpaque.set(!entries[0].isIntersecting);
      });
      this.io.observe(sentinel);
    }

    // kick once
    onScroll();
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;
    if (this.onScrollRef) window.removeEventListener('scroll', this.onScrollRef);
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.io?.disconnect();
  }
}
