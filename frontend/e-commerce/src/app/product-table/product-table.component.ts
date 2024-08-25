import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpService } from '../services/http.service';
import { faPenToSquare, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ViewProductComponent } from '../view-product/view-product.component';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [FontAwesomeModule, NgxPaginationModule, NgIf, NgFor, FormsModule,ViewProductComponent,RouterLink],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent {
  productsArray: any[] = [];
  filteredProductsArray: any[] = [];
  edit = faPenToSquare;
  testArray: any[] = [];
  view = faEye;
  delete = faTrash;
  p: number = 1;
  itemsPerPage: number = 10;
  searchTerm: string = '';

  constructor(private httpList: HttpService,private router: Router) {}

  ngOnInit() {
    this.httpList.getList().subscribe((res: any) => {
      this.productsArray = res.products;
      this.filteredProductsArray = this.productsArray;
      
    });
    this.httpList.getproductList().subscribe((res: any) => {
      this.testArray = res;
      console.log(res);
      
   
    });
  }

  editProduct(id:number) {
    this.router.navigate(['/edit-product', id]);
  }

  viewProduct(id: number) {
    this.router.navigate(['/view-product', id]);
    
  }

  deleteProduct(product: any) {
    this.productsArray = this.productsArray.filter(p => p.id !== product.id);
    this.onSearch(); 
  }

  onSearch() {
    this.filteredProductsArray = this.productsArray.filter((product: any) =>
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onItemsPerPageChange(event: any) {
    this.itemsPerPage = event.target.value;
  }

  addProduct() {
    const newProduct = {
      id: this.productsArray.length + 1,
      title: 'New Product',
      description: 'New Product Description',
      category: 'New Category',
      stock: 100,
      price: 99.99,
      thumbnail: 'https://via.placeholder.com/80'
    };
    this.productsArray.push(newProduct);
    this.onSearch(); 
  }

  exportToCSV() {
    const csvData = this.filteredProductsArray.map((product: any) => ({
      ID: product.id,
      Product: product.title,
      Category: product.category,
      Stock: product.stock,
      Price: product.price,
    }));
    
    const csvContent = 'data:text/csv;charset=utf-8,'
      + Object.keys(csvData[0]).join(',') + '\n'
      + csvData.map(row => Object.values(row).join(',')).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'products.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


}
