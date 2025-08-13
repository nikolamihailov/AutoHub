// app.routes.ts
import { Routes } from '@angular/router';
import { isAdminGuard, isAuthGuard, isGuestGuard } from './core/guards';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  {
    path: 'contacts',
    loadComponent: () => import('./pages/contacts/contacts').then((m) => m.Contacts),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about-us/about-us').then((m) => m.AboutUs),
  },

  {
    path: 'profile',
    canActivate: [isAuthGuard],
    loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile),
  },

  {
    path: 'profile-edit',
    canActivate: [isAuthGuard],
    loadComponent: () => import('./pages/profile-edit/profile-edit').then((m) => m.ProfileEdit),
  },

  {
    path: 'login',
    canActivate: [isGuestGuard],
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },

  {
    path: 'register',
    canActivate: [isGuestGuard],
    loadComponent: () => import('./pages/register/register').then((m) => m.Register),
  },

  { path: 'logout', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'car-offers',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/car-offers/car-offers').then((m) => m.CarOffers),
      },
      {
        path: 'mine',
        canActivate: [isAuthGuard],
        loadComponent: () =>
          import('./pages/my-car-offers/my-car-offers').then((m) => m.MyCarOffers),
      },
      {
        path: 'saved',
        canActivate: [isAuthGuard],
        loadComponent: () =>
          import('./pages/car-offers-saved/car-offers-saved').then((m) => m.CarOffersSaved),
      },
      {
        path: 'add',
        canActivate: [isAuthGuard],
        loadComponent: () =>
          import('./pages/car-offers-create/car-offers-create').then((m) => m.CarOffersCreate),
      },
      {
        path: 'edit/:id',
        canActivate: [isAuthGuard],
        loadComponent: () =>
          import('./pages/car-offers-edit/car-offers-edit').then((m) => m.CarOffersEdit),
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./pages/car-offer-details/car-offer-details').then((m) => m.CarOfferDetails),
      },
    ],
  },

  {
    path: 'admin-dashboard',
    canActivateChild: [isAuthGuard, isAdminGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/admin-dashboard/admin-dashboard').then((m) => m.AdminDashboard),
      },
      {
        path: 'car-offers',
        loadComponent: () =>
          import('./pages/admin-car-offers/admin-car-offers').then((m) => m.AdminCarOffers),
      },
      {
        path: 'categories',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/admin-categories/admin-categories').then((m) => m.AdminCategories),
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./pages/admin-categories-add/admin-categories-add').then(
                (m) => m.AdminCategoriesAdd,
              ),
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./pages/admin-categories-edit/admin-categories-edit').then(
                (m) => m.AdminCategoriesEdit,
              ),
          },
        ],
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/admin-users/admin-users').then((m) => m.AdminUsers),
      },
    ],
  },

  {
    path: 'not-found',
    loadComponent: () => import('./pages/error-page/error-page').then((m) => m.ErrorPage),
  },
  { path: '**', redirectTo: 'not-found' },
];

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
