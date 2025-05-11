import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts.component';
import { messageResolver } from '../../features/discussion/message/message.resolver';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../../features/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: ':id',
        resolve: {
          messages: messageResolver,
        },
        loadComponent: () =>
          import('../../features/discussion/discussion.component').then(
            (m) => m.DiscussionComponent
          ),
      },
    ],
  },
];
