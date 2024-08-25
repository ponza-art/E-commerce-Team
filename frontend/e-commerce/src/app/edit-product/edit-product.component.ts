import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent {
  product: any = null;
  id: number = 0;

  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.http.getProduct(this.id).subscribe((res: any) => {
      this.product = res;
    });
  }

  saveProduct() {
    console.log('Saving product:', this.product);
    this.router.navigate(['']);
  }
  cancel() {
    this.router.navigate(['']);
  }
}
