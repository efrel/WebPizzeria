import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/orders/order-list/order-list.component')
            .then(m => m.OrderListComponent),
      },
      // {
      //   path: 'products',
      //   loadComponent: () =>
      //     import('./features/')
      //       .then(m => m.ProductListComponent)
      // },
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full'
      }
    ]
  }
];
