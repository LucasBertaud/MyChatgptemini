import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./core/layouts/layouts.routes').then((m) => m.LAYOUT_ROUTES),
  },
  {
    path: 'callback',
    loadComponent: () =>
      import('./features/callback/callback.component').then(
        (m) => m.CallbackComponent
      ),
  },
];
