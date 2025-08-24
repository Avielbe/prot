import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements AfterViewInit {
  @ViewChild('wrapper', { static: true }) wrapper!: ElementRef<HTMLElement>;
  @ViewChild('scaler',  { static: true }) scaler!:  ElementRef<HTMLElement>;

  ngAfterViewInit() {
    // no setup needed here
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    // skip on small widths
    if (window.innerWidth <= 900) return;

    const wrapEl = this.wrapper.nativeElement;
    const scalerEl = this.scaler.nativeElement;
    const rect = wrapEl.getBoundingClientRect();

    // Center of wrapper relative to viewport:
    const wrapperCenterY = rect.top + rect.height / 2;
    const viewportCenterY = window.innerHeight / 2;

    // Absolute distance from wrapper center to viewport center
    const dist = Math.abs(viewportCenterY - wrapperCenterY);

    // Maximum possible distance we care about (half viewport + half wrapper)
    const maxDist = (window.innerHeight + rect.height) / 2;

    // Normalize [0…1]
    const t = Math.min(1, dist / maxDist);

    // Scale from 1.0 (t=0) down to 0.6 (t=1)
    const minScale = 0.6;
    const scale = minScale + (1 - minScale) * (1 - t);

    scalerEl.style.transform = `scale(${scale})`;
  }
}
