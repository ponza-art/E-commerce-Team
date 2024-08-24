import { NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  navBarFixed: boolean = false;
  @HostListener('window:scroll', ['event']) onScroll() {
    if (window.scrollY > 90) {
      this.navBarFixed = true;
    } else {
      this.navBarFixed = false;
    }
  }
}
