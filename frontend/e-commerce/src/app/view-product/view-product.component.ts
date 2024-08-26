import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../services/http.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [FontAwesomeModule, NgClass, FormsModule, NgFor, RouterLink, NgIf],
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
  selectedImage = '';
  faStar = faStar;
  productDetails: any = null;

  @Input() id: number = 0;

  constructor(private router: Router, private http: HttpService) {}

  ngOnInit() {
    if (this.id) {
      this.http.getProduct(this.id).subscribe((res: any) => {
        this.productDetails = res;
        console.log(this.productDetails);

        this.selectedImage = this.productDetails.thumbnail;
      });
    }
  }

  navigateHome() {
    this.router.navigate(['/admin/products']);
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }
}
