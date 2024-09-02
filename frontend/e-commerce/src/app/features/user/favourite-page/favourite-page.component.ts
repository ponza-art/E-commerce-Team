import { Component } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FavouriteService } from '../../../shared/services/favouriteService/favourite.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductsSectionComponent } from '../../home-page/products-section/products-section.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-favourite-page',
  standalone: true,
  imports: [FontAwesomeModule, ProductsSectionComponent, RouterLink],
  templateUrl: './favourite-page.component.html',
  styleUrl: './favourite-page.component.css',
})
export class FavouritePageComponent {
  favouriteProducts: any;
  trash = faTrash;
  isLogin: boolean = false;

  constructor(
    private _favouriteService: FavouriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFavourites();
  }

  getFavourites() {
    this._favouriteService.getFavourite().subscribe(
      (res) => {
        this.favouriteProducts = res;
      },
      (err) => {
        console.error('Error fetching favourites:', err);
        Swal.fire('Error', 'Failed to fetch favourites.', 'error');
      }
    );
  }

  removeItems(productId: string) {
    console.log(productId);
    this._favouriteService.removeFavouriteItem(productId).subscribe(
      () => {
        this.getFavourites();
        Swal.fire('Deleted!', 'Product has been removed.', 'success');
      },
      (err) => {
        console.error('Error removing favourite item:', err);
        Swal.fire('Error', 'Failed to remove the product.', 'error');
      }
    );
  }
  productDetailsLink(dataLink: string) {
    this.router.navigate([dataLink]);
  }
}
