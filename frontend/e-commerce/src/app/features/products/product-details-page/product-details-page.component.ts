import { Component, ElementRef, ViewChild } from '@angular/core';
import { databaseWatchDetails } from '../../../core/models/watch-details';
import { ProductManagementService } from '../../../shared/services/productServices/product-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { CartService } from '../../../shared/services/cartServices/cart.service';
import {
  faHeart,
  faPlus,
  faMinus,
  faChartBar,
} from '@fortawesome/free-solid-svg-icons';
import { UserManagementService } from '../../../shared/services/userServices/user-management.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FavouriteService } from '../../../shared/services/favouriteService/favourite.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, FontAwesomeModule],
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss'],
})
export class ProductDetailsPageComponent {
  productData!: any;
  selectedImage: string = '';
  quantity: number = 1;
  fullStars: number[] = [1, 2, 3, 4, 5];
  halfStar: boolean = false;
  emptyStars: number[] = [1, 2, 3, 4, 5];
  isLogin: boolean = false;
  discount: number = 0;
  heart = faHeart;
  plus = faPlus;
  minus = faMinus;
  chart = faChartBar;

  @ViewChild('cardImage', { static: false }) cardImage!: ElementRef;
  @ViewChild('zoomImage', { static: false }) zoomImage!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductManagementService,
    private cartService: CartService,
    private userService: UserManagementService,
    private router: Router,
    private favouriteService: FavouriteService
  ) {
    this.checkIfUserLogin();
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (res: any) => {
          this.productData = res;
          this.selectedImage = this.productData.images[0];
          this.calculateDiscount();
          console.log(this.productData);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
  ngAfterViewInit() {
    // Ensure the DOM is ready before adding event listeners
    this.setupEventListeners();
  }
  private setupEventListeners() {
    const cardImage = this.cardImage.nativeElement as HTMLElement;
    const zoomImage = this.zoomImage.nativeElement as HTMLElement;

    cardImage.addEventListener('mousemove', (e: MouseEvent) => {
      const { offsetWidth: width, offsetHeight: height } = cardImage;
      const { offsetX: x, offsetY: y } = e;

      const xPercent = (x / width) * 100;
      const yPercent = (y / height) * 100;

      zoomImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
      zoomImage.style.transform = 'scale(1.5)';
    });

    cardImage.addEventListener('mouseleave', () => {
      zoomImage.style.transform = 'scale(1)';
    });
  }

  calculateDiscount(): void {
    this.discount = Math.max(
      this.productData.price - (this.productData.price * 10) / 100,
      0
    );
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(productId: string): void {
    if (this.isLogin) {
      // If user is logged in, add to server-side cart
      this.cartService.addCart(productId, this.quantity).subscribe(
        (res: any) => {
          if (res) {
            this.router.navigateByUrl('/cart');
          }
        },
        (err: any) => {
          console.error(err);
        }
      );
    } else {
      // If not logged in, add to local storage
      this.addProductToLocalCart(productId);
      Swal.fire(
        'Dear User',
        'Product added to cart. Please log in to sync your cart.',
        'info'
      );
      // alert('Product added to cart. Please log in to sync your cart.');
    }
  }

  addProductToLocalCart(productId: string): void {
    const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct = localCart.find(
      (item: any) => item.productId === productId
    );
    if (existingProduct) {
      existingProduct.quantity += this.quantity;
    } else {
      localCart.push({ productId, quantity: this.quantity });
    }
    localStorage.setItem('cart', JSON.stringify(localCart));
  }

  syncLocalCartToServer(): void {
    const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (localCart.length > 0) {
      localCart.forEach((item: any) => {
        this.cartService.addCart(item.productId, item.quantity).subscribe(
          (res: any) => {
            // Successfully synced, clear local storage cart
            localStorage.removeItem('cart');
          },
          (err: any) => {
            console.error('Error syncing cart', err);
          }
        );
      });
    }
  }

  checkIfUserLogin(): void {
    this.userService.isLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLogin = loggedIn;
      if (this.isLogin) {
        this.syncLocalCartToServer(); // Sync local cart if user logs in
      }
    });
  }

  addToFavourite(productId: string): void {
    if (this.isLogin) {
      // If user is logged in, add to server-side cart
      this.favouriteService.addFavourite(productId).subscribe(
        (res: any) => {
          if (res) {
            this.router.navigateByUrl('/favourite');
          }
        },
        (err: any) => {
          console.error(err);
        }
      );
    } else {
      Swal.fire('Dear User', 'You should login to have favourite list', 'info');
      // alert('You Must Login First');
    }
  }
}
