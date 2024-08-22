import { Component, Input } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { NgFor, NgIf } from '@angular/common';
import { PriceAfterDiscountPipe } from '../pipes/price-after-discount.pipe';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgFor,NgIf,PriceAfterDiscountPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  
  data: any;

  @Input() id: string = '';

  fullStars: number[] = [];
  halfStar: boolean = false;
  emptyStars: number[] = [];
  selectedImage: string = '';
  index: number = 0;

  cardItems: number = 1;
  ProductDetales!: Object;
  Router: any;
  constructor(
    // private counterService: CounterService,
    private AppRequestService: ProductServiceService
  ) {}
  ngOnInit() {
    this.AppRequestService.getRequestDetails(this.id).subscribe( (res) => 
      {

       (this.data = res)      
        console.log(this.data);
       this.updateStars(); 
       this.selectedImage = this.data.images[this.index] || '';
      this.index++;
      }
      
      
    );
    // safaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

    // this.counterService
    // .getCounter()
    // .subscribe((item) => (this.cardItems = item));
  }

  updateStars () {
    const fullStarCount = Math.floor(this.data.rating);
    const hasHalfStar = this.data.rating % 1 > 0;
    this.fullStars = Array(fullStarCount).fill(0);
    this.halfStar = hasHalfStar;
    this.emptyStars = Array(5 - fullStarCount - (hasHalfStar ? 1 : 0)).fill(0);
  }  

  add() {
    // this.counterService.setCounter(this.cardItems + 1);
  }

  minus() {
  //   if (this.cardItems) this.counterService.setCounter(this.cardItems - 1);
  }

  selectedImages(image: any) {
    this.selectedImage = image;
  } 

}
