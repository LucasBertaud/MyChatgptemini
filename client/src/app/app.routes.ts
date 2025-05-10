import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/home/home.component').then(
        (load) => load.HomeComponent
      ),
  },
  {
    path: 'callback',
    loadComponent: () =>
      import('./features/callback/callback.component').then(
        (load) => load.CallbackComponent
      ),
  },
];
