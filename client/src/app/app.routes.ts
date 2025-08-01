import { Routes } from '@angular/router';
import { ErrorPage, Home } from './pages';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'not-found', component: ErrorPage },
  { path: '**', redirectTo: 'not-found' },

  /*  { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'logout', redirectTo: 'home', pathMatch: 'full' },
    { path: 'profile', component: ProfileComponent },
    {
      path: 'car-offers',
      children: [
        { path: '', component: CarOffers },
        { path: 'add', component: CarOfferAddComponent },
        { path: 'edit', component: CarOfferEditComponent },
        { path: 'saved', component: CarOffersSavedComponent },
        { path: 'user/:userId', component: CarOffersUserComponent },
        { path: ':id', component: CarOfferComponent },
      ],
    },
    {
      path: 'categories',
      children: [
        { path: '', component: CategoriesComponent },
        { path: ':id', component: CategoryComponent },
      ],
    },
    {
      path: 'admin-dashboard',
      children: [
        { path: '', component: AdminDashboardComponent },
        { path: 'users', component: AdminUsersComponent },
        { path: 'categories', component: AdminCategoriesComponent },
        { path: 'car-offers', component: AdminCarOffersComponent },
      ],
    }, */
];
