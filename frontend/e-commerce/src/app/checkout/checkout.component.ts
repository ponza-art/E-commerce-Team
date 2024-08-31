import { Component } from '@angular/core';
import { ProductRequestService } from '../service/product-request.service';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderprocessService } from '../service/orderProcess.service';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
   product:any
   totalprice:any
   countcart:any
  constructor(private router: Router,
     private route: ActivatedRoute,
    private orderService: OrderprocessService
    
  ){}
  
  

 //orderList:any=[]
  ngOnInit(){
  const token =localStorage.getItem("Token")
  this.product=JSON.parse(localStorage.getItem("cartItems")as any)||[]
  this.totalprice=JSON.parse(localStorage.getItem("totalprice")as any)||[]
  this.countcart=JSON.parse(localStorage.getItem("cartCount")as any)||[]
  console.log(this.product)
  console.log(this.totalprice)
  // this.orderService.getOrder().subscribe((res)=>{this.orderList=res})
 }
   
}
