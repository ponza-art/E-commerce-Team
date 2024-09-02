import { Injectable } from '@angular/core';
import * as AOS from 'aos'

@Injectable({
  providedIn: 'root'
})
export class AosService {

  constructor() {
    AOS.init({
      duration: 450,
      delay: 150,
      easing: 'ease-in-out',
      // easing: 'ease-out-back',
      once: true
    });
  }

  refresh() {
    AOS.refresh();
  }
}
