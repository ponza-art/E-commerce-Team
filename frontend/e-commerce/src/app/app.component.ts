import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductDetailsComponent } from "./product-details/product-details.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'E-commerce';
}
