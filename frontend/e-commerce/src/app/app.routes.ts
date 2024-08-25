import { Routes } from '@angular/router';
import { ProductTableComponent } from './product-table/product-table.component';
import { LoginComponent } from './login/login.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { UserTableComponent } from './user-table/user-table.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
  { path: 'admin/products', component: ProductTableComponent, title: 'Home' },
  {
    path: 'admin/view-product/:id',
    component: ViewProductComponent,
    title: 'product details',
  },
  { path: 'admin', component: LoginComponent, title: 'Login' },
  { path: 'admin/edit-product/:id', component: EditProductComponent },
  { path: 'admin/orders', component: OrderTableComponent },
  { path: 'admin/orders/:id', component: OrderViewComponent },
  { path: 'admin/customers', component: UserTableComponent },
  { path: 'admin/customers/:id', component: UserProfileComponent },

];
