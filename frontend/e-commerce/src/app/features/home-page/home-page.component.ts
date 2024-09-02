import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductsSectionComponent } from './products-section/products-section.component';
import { AosService } from '../../shared/services/aosService/aos.service';
import { DataService } from '../../shared/services/passingDataService/data.service';
import { UserManagementService } from '../../shared/services/userServices/user-management.service';
import { CommonModule } from '@angular/common';
import { databaseWatchDetails } from '../../core/models/watch-details';
import { ProductManagementService } from '../../shared/services/productServices/product-management.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterLink,
    ProductsSectionComponent,
    
    CommonModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  isAdmin: boolean = false;
  allProducts: databaseWatchDetails[] = [];
  allBrands: any;

  constructor(
    public _router: Router,
    private _aosService: AosService,
    private _userService: UserManagementService,
    private _productManagement: ProductManagementService,
    private dataService: DataService,
    private router: Router
  ) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    const authData = this._userService.getAuthData();
    if (authData && authData.role) {
      if (authData.role === 'admin') {
        this.isAdmin = true;
      }
    }

    this._productManagement.getfilters('brand').subscribe(
      (res: any) => {
        this.allBrands = res;
      },
      (error) => {
        console.log(error);
      }
    );

    this._productManagement.getSomeProducts().subscribe(
      (res) => {
        this.allProducts = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // navigate to admin page
  navigateAdmin() {
    this._router.navigateByUrl('admin');
  }

  ngAfterViewInit(): void {
    this._aosService.refresh();
  }

  sendGender(gender: string) {
    this.dataService.changeData(gender);
    this.router.navigateByUrl('/products');
  }
}
