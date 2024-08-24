import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  fullStars: number[] = [];
  halfStar: boolean = false;
  emptyStars: number[] = [];
  cardData: any = {
    rating: 3.5,
  };
  updateStars() {
    const fullStarCount = Math.floor(this.cardData.rating);
    const hasHalfStar = this.cardData.rating % 1 > 0;
    this.fullStars = Array(fullStarCount).fill(0);
    this.halfStar = hasHalfStar;
    this.emptyStars = Array(5 - fullStarCount - (hasHalfStar ? 1 : 0)).fill(0);
  }
}
