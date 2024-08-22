import { Component } from '@angular/core';
import { ProductRequestService } from '../service/product-request.service';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
   product:any
   totalprice:any
   countcart:any
  constructor(private router: Router){}
  
  

 
  ngOnInit(){
  this.product=JSON.parse(localStorage.getItem("cartItems")as any)||[]
  this.totalprice=JSON.parse(localStorage.getItem("totalprice")as any)||[]
  this.countcart=JSON.parse(localStorage.getItem("cartCount")as any)||[]
  console.log(this.product)
  console.log(this.totalprice)
 }
}
