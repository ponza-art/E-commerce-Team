import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const routes: Routes = [
  {
    path: '',
    // component: ProductAPPComponent,
    title: 'Home',
  },

  {
    path: 'product-detales/:id',
    component: ProductDetailsComponent,
    title: 'Product detales',
  },

//   {
//     path: 'card',
//     component: CardComponent,
//     title: 'card',
//   },




];
