import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard'; 

export const routes: Routes = [
  // home or landing page
  {
    path: '',
    title: 'Home',
    loadComponent: () =>
      import('./features/home-page/home-page.component').then(
        (c) => c.HomePageComponent
      ),
  },

  // products routes
  {
    path: 'products',
    title: 'Products',
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './features/products/products-page/products-page.component'
          ).then((c) => c.ProductsPageComponent),
      },
      {
        // path: 'watch/:id',
        path: 'watch/:productId',
        title: 'Products details',
        loadComponent: () =>
          import(
            './features/products/product-details-page/product-details-page.component'
          ).then((c) => c.ProductDetailsPageComponent),
      },
    ],
  },

 

  // contact page
  {
    path: 'contact',
    title: 'Contact',
    loadComponent: () =>
      import('./features/contact-page/contact-page.component').then(
        (c) => c.ContactPageComponent
      ),
  },

  // loged in user routes with auth guard
  {
    path: 'user',
    title: 'User',
    // guard to check if user is logged in
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/user/profile-page/profile-page.component').then(
            (c) => c.ProfilePageComponent
          ),
      },
    ],
  },

  // cart
  // loged in user routes with auth guard
  {
    path: 'cart',
    title: 'Cart',
    // guard to check if user is logged in
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/user/cart-page/cart-page.component').then(
        (c) => c.CartPageComponent
      ),
  },
  {
    path: 'favourite',
    title: 'favourite',
    // guard to check if user is logged in
    // canActivate: [authGuard],
    loadComponent: () =>
      import('./features/user/favourite-page/favourite-page.component').then(
        (c) => c.FavouritePageComponent
      ),
  },
 

  //   auth routes , login and signup
  {
    path: 'signup',
    title: 'Sign UP',
    // write auth guard to check if user has already log in
    loadComponent: () =>
      import('./features/user/auth/signup-page/signup-page.component').then(
        (c) => c.SignupPageComponent
      ),
  },

  // login path
  {
    path: 'login',
    title: 'Login',
    // write auth guard to check if user has already log in
    loadComponent: () =>
      import('./features/user/auth/login-page/login-page.component').then(
        (c) => c.LoginPageComponent
      ),
  },

  // admin routes
  {
    path: 'admin',
    title: 'Admin',
    canActivateChild: [adminGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/admin/admin-panel/admin-panel.component').then(
            (c) => c.AdminPanelComponent
          ),
      },
      {
        path: 'add-product',
        title: '',
        loadComponent: () =>
          import('./features/admin/add-product/add-product.component').then(
            (c) => c.AddProductComponent
          ),
      },
      

      {
        path: 'orders',
        title: 'Orders',
        loadComponent: () =>
          import('./features/admin/orders/orders.component').then(
            (c) => c.OrdersComponent
          ),
      },
    ],
  },

  { path: '**', redirectTo: '' },
];
