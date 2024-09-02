import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  databaseWatchDetails,
  ProductParams,
} from '../../../core/models/watch-details';
import { ProductManagementService } from '../../../shared/services/productServices/product-management.service';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cartServices/cart.service';
import { AosService } from '../../../shared/services/aosService/aos.service';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
import { UserManagementService } from '../../../shared/services/userServices/user-management.service';
import { DataService } from '../../../shared/services/passingDataService/data.service';
import { FormsModule } from '@angular/forms';
import { ProductsSectionComponent } from '../../home-page/products-section/products-section.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgxPaginationModule,
    CurrencyPipe,
    FormsModule,
    ProductsSectionComponent,
  ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  @ViewChild('targetDiv') proudcts!: ElementRef;

  slectedGender = 'Gender';
  slectedBrand = 'Brand';
  slectedCategory = 'Category';
  selectedDropdown!: string;
  allProducts: databaseWatchDetails[] = [];
  allBrands: any;
  allCategories: any;
  allColors: any;
  params: ProductParams = {};
  isLogin: boolean = false;
  // pagination
  pageSize = 9;
  currentP = 1;

  min!: number;
  max!: number;

  constructor(
    public _productManagement: ProductManagementService,
    private _userService: UserManagementService,
    private _cartService: CartService,
    private _aosService: AosService,
    private _dataService: DataService,
    private router: Router
  ) {}

  // when select a gender
  selectGender(gender: string) {
    // console.log(gender);
    this.slectedGender = gender;
    if (gender !== 'Gender') {
      if (gender) {
        this.params.gender = gender;
      }
    } else {
      this.params.gender = '';
    }
    this.currentP = 1;
    this.displayProducts();
    // hide dropdown
    this.toggleGenderDropdown(this.selectedDropdown);
  }

  displayBrands() {
    this._productManagement.getfilters('brand').subscribe(
      (res) => {
        this.allBrands = res;
        // console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // when select a brand
  selectBrand(brand: string) {
    // console.log(brand);
    this.slectedBrand = brand;
    if (brand !== 'Brand') {
      if (brand) {
        this.params.brand = brand;
      }
    } else {
      this.params.brand = '';
    }
    this.currentP = 1;
    this.displayProducts();
    // hide dropdown
    this.toggleGenderDropdown(this.selectedDropdown);
  }

  displayColors() {
    this._productManagement.getfilters('color').subscribe(
      (res) => {
        this.allColors = res;
        // console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // when select a brand
  selectColor(color: string) {
    // console.log(brand);
    this.slectedBrand = color;
    if (color !== 'Color') {
      if (color) {
        this.params.color = color;
      }
    } else {
      this.params.color = '';
    }
    this.currentP = 1;
    this.displayProducts();
    // hide dropdown
    this.toggleGenderDropdown(this.selectedDropdown);
  }

  displayCategories() {
    this._productManagement.getfilters('category').subscribe(
      (res) => {
        this.allCategories = res;
        // console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // when select a category
  selectCategory(category: string) {
    // console.log(category);
    this.slectedCategory = category;
    if (category !== 'Category') {
      if (category) {
        this.params.category = category;
      }
    } else {
      this.params.category = '';
    }
    this.currentP = 1;
    this.displayProducts();
    // hide dropdown
    this.toggleGenderDropdown(this.selectedDropdown);
  }

  selectPrice() {
    this._productManagement.priceFilter(this.min, this.max).subscribe(
      (res) => {
        this.allProducts = res;
        this.currentP = 1;
        // console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // method to display products
  displayProducts() {
    // console.log(this.params); //
    this._productManagement.getAllProducts(this.params).subscribe(
      (res) => {
        this.allProducts = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logProductwithId(id: string) {
    this._productManagement.getProductById(id).subscribe((res) => {
      console.log(res);
    });
  }

  // when add cart button clicked
  addCart(productId: string): void {
    if (this.isLogin) {
      this._cartService.addCart(productId).subscribe(
        (res) => {
          // check if respose coming or true
          if (res) {
            Swal.fire({
              toast: true,
              position: 'top',
              icon: 'success',
              title: 'Product added to cart!',
              showConfirmButton: false,
              timer: 2500,
              timerProgressBar: false,
            });
            this.router.navigateByUrl('/cart');
          }
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  // to toggle gender dropdown
  toggleGenderDropdown(dropdown: string) {
    if (this.selectedDropdown && this.selectedDropdown !== dropdown) {
      const currentOpenDropdown = document.querySelector(this.selectedDropdown);
      currentOpenDropdown?.classList.add('select-hide');
    }
    this.selectedDropdown = dropdown;
    const selectItems = document.querySelector(this.selectedDropdown);
    selectItems?.classList.toggle('select-hide');
  }

  // to close dropdown
  hideDropDown() {
    const selectItems = document.querySelectorAll('.select-items');
    selectItems.forEach((item) => item.classList.add('select-hide'));
  }

  onPageChange(event: number) {
    this.currentP = event;
    const position = window.innerHeight * 0.4;
    window.scrollTo({ top: position, behavior: 'smooth' });
  }

  checkIfUserLogin() {
    this._userService.isLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLogin = loggedIn;
    });
  }

  // when click anywhere on screen
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.products-container__select')) {
      this.hideDropDown();
    }
  }

  ngAfterViewChecked() {
    this._aosService.refresh();
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.checkIfUserLogin();

    this._dataService.currentData.subscribe((data) => {
      if (data !== '') {
        this.selectGender(`${data}`);
      } else {
        this.displayProducts();
        this.displayCategories();
        this.displayBrands();
        this.displayColors();
      }
    });
  }

  ngOnDestroy(): void {
    this._dataService.changeData('');
  }
}
