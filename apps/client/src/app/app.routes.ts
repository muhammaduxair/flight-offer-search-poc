import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((x) => x.HomeComponent),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/home',
  },
];
