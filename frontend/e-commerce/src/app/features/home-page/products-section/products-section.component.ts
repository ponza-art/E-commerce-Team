import { Component, Input, OnInit } from '@angular/core';
import { ProductManagementService } from '../../../shared/services/productServices/product-management.service';
import { databaseWatchDetails } from '../../../core/models/watch-details';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  faBagShopping,
  faHeart,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartService } from '../../../shared/services/cartServices/cart.service';
import { FavouriteService } from '../../../shared/services/favouriteService/favourite.service';
import Swal from 'sweetalert2';
import { UserManagementService } from '../../../shared/services/userServices/user-management.service';

@Component({
  selector: 'app-products-section',
  standalone: true,
  imports: [DecimalPipe, CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './products-section.component.html',
  styleUrl: './products-section.component.css',
})
export class ProductsSectionComponent implements OnInit {
  featuredProducts: databaseWatchDetails[] = [];
  @Input() productData: any;
  @Input() withRemoveFav: boolean = false;
  isLogin: boolean = false;
  trash = faTrash;
  heart = faHeart;
  bag = faBagShopping;

  constructor(
    public _productManagement: ProductManagementService,
    private router: Router,
    // private cartService: CartService,
    private favouriteService: FavouriteService,
    private userService: UserManagementService
  ) {}

  ngOnInit(): void {
    this.checkIfUserLogin();
    this._productManagement.getSomeProducts().subscribe(
      (res) => {
        this.featuredProducts = res;
        // console.log(res);
      },
      (error) => {
        console.error(error);
      }
    );
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
  checkIfUserLogin(): void {
    this.userService.isLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLogin = loggedIn;
    });
  }
}
