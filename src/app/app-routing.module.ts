import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'; 
import { AuthGuard } from './guard/auth.guard';
const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryPageModule)
  },
  {
    path: 'choose-address',
    loadChildren: () => import('./pages/choose-address/choose-address.module').then(m => m.ChooseAddressPageModule)
  },
  {
    path: 'add-new-address',
    loadChildren: () => import('./pages/add-new-address/add-new-address.module').then(m => m.AddNewAddressPageModule)
  },
  {
    path: 'add-card',
    loadChildren: () => import('./pages/add-card/add-card.module').then(m => m.AddCardPageModule)
  },
  {
    path: 'stripe-payments',
    loadChildren: () => import('./pages/stripe-payments/stripe-payments.module').then(m => m.StripePaymentsPageModule)
  },
  {
    path: 'history-detail',
    loadChildren: () => import('./pages/history-detail/history-detail.module').then(m => m.HistoryDetailPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./pages/history/history.module').then(m => m.HistoryPageModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./pages/payments/payments.module').then(m => m.PaymentsPageModule)
  },
  {
    path: 'add-review',
    loadChildren: () => import('./pages/add-review/add-review.module').then(m => m.AddReviewPageModule)
  },
  {
    path: 'choose-restaurant',
    loadChildren: () => import('./pages/choose-restaurant/choose-restaurant.module').then(m => m.ChooseRestaurantPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
  },
  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
