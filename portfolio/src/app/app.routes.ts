import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
          return import('./home-page/home-page').then((m) => m.HomePage);
        },
      },
    {
        path: 'projects',
        loadComponent: () => {
          return import('./projects-page/projects-page').then((m) => m.ProjectsPage);
        },
      },
    {
        path: 'cv_resume',
        loadComponent: () => {
          return import('./cv-resume-page/cv-resume-page').then((m) => m.CvResumePage);
        },
      },
    {
        path: 'connect',
        loadComponent: () => {
          return import('./connect-page/connect-page').then((m) => m.ConnectPage);
        },
      },
];
