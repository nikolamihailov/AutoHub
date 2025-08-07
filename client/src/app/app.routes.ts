import { Routes } from '@angular/router';
import {
  AdminCarOffers,
  AdminCategories,
  AdminCategoriesAdd,
  AdminCategoriesEdit,
  AdminDashboard,
  AdminUsers,
  ErrorPage,
  Home,
  Login,
  Profile,
  ProfileEdit,
  Register,
} from './pages';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'profile', component: Profile },
  { path: 'profile-edit', component: ProfileEdit },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'logout', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'admin-dashboard',
    children: [
      { path: '', component: AdminDashboard },
      { path: 'car-offers', component: AdminCarOffers },
      {
        path: 'categories',
        children: [
          { path: '', component: AdminCategories },
          { path: 'add', component: AdminCategoriesAdd },
          { path: 'edit/:id', component: AdminCategoriesEdit },
        ],
      },
      { path: 'users', component: AdminUsers },
    ],
  },

  { path: 'not-found', component: ErrorPage },
  { path: '**', redirectTo: 'not-found' },
  /*  ,
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
    }, */
];
