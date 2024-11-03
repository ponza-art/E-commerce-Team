import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductManagementService } from '../../../shared/services/productServices/product-management.service';
import { databaseWatchDetails } from '../../../core/models/watch-details';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import {
  faTrash,
  faPenToSquare,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
  RouterLink,
    CurrencyPipe,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    FontAwesomeModule,
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent implements OnInit {
  public allProductsDetails: databaseWatchDetails[] = [];
  public filteredProducts: databaseWatchDetails[] = [];
  public selectedProduct: any = {} as databaseWatchDetails;
  trash = faTrash;
  edit = faPenToSquare;
  view = faEye;

  pageSize = 10;
  currentP = 1;
  searchTerm = '';

  constructor(
    public _router: Router,
    public _productManagement: ProductManagementService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getAllProducts();
  }

  getAllProducts() {
    this._productManagement.getAllProducts().subscribe(
      (res: databaseWatchDetails[]) => {
        this.allProductsDetails = res;
        this.filteredProducts = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  filterProducts() {
    this.filteredProducts = this.allProductsDetails.filter((product) =>
      product.productName
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }


  editProduct(id: string) {
    this._productManagement.getProductById(id).subscribe((res: any) => {
      this.selectedProduct = res;
      const editProductModal = new Modal(
        document.getElementById('editProductModal')!
      );
      editProductModal.show();
    });
  }

  viewProduct(id: string) {
    this._productManagement.getProductById(id).subscribe((res: any) => {
      this.selectedProduct = res;
      console.log(res);

      const viewProductModal = new Modal(
        document.getElementById('viewProductModal')!
        
      );
      viewProductModal.show();
      this.searchTerm=''

    });
  }

  updateProduct() {
    this._productManagement.updateProduct(this.selectedProduct).subscribe(
      (res) => {
        this.getAllProducts();
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Product updated successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        const editProductModal = Modal.getInstance(
          document.getElementById('editProductModal')!
        ) as bootstrap.Modal;
        editProductModal.hide();
        this.searchTerm=''
      },
      (err) => {
        console.error('Error updating product: ', err);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while updating the product.',
          icon: 'error',
          confirmButtonColor: '#c03f00',
        });
      }
    );
  }

  deleteProduct(productId: string) {
    this.selectedProduct.ProductId;
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#c03f00',
      cancelButtonColor: '#c00000',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._productManagement.deleteOneProduct(productId).subscribe(
          (res) => {
            this.getAllProducts();
            Swal.fire({
              title: 'Deleted!',
              text: 'Product has been deleted.',
              icon: 'success',
              confirmButtonColor: '#c03f00',
            });
          },
          (err) => {
            console.error(err);
            Swal.fire({
              title: 'Error!',
              text: 'An error occurred while deleting the product.',
              icon: 'error',
              confirmButtonColor: '#c03f01',
            });
          }
        );
      } else {
        this.selectedProduct.productId;
      }
    });
  }
}
