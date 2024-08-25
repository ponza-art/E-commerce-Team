import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductTableComponent } from "./product-table/product-table.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductTableComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'E-commerce';
}
