import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductListComponent } from './product-list/product-list.component';

export const routes: Routes = [
    
    {
        
        path:"product",
        component:ProductListComponent,
        title:"Product"
    },
    {

        path:"cart",
        component:CartComponent,
        title:"Cart"
    },
    {
        path:"checkout",
        component:CheckoutComponent,
        title:"Checkout"
    }
];
