import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './security';
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', canActivate: [AuthGuard], pathMatch: 'full' },
    {
        path: '404',
        component: P404Component,
        data: {
            title: 'Page 404'
        }
    },
    {
        path: '500',
        component: P500Component,
        data: {
            title: 'Page 500'
        }
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Login Page'
        }
    },
    {
        path: 'register',
        component: RegisterComponent,
        data: {
            title: 'Register Page'
        }
    },
    {
        path: '',
        component: DefaultLayoutComponent,
        data: {
            title: 'Home'
        },
        canActivate: [AuthGuard],
        children: [
            {
                path: 'administration',
                loadChildren: './views/administration/administration.module#AdministrationModule'
            },
            {
                path: 'buttons',
                loadChildren: './views/buttons/buttons.module#ButtonsModule'
            },
            {
                path: 'dashboard',
                loadChildren: './views/dashboard/dashboard.module#DashboardModule'
            }
        ]
    },
    { path: '**', component: P404Component }
];

export const Routing = RouterModule.forRoot(appRoutes);