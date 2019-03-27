import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { PageToolComponent } from './pagetool';
import { AuthGuard } from './guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'formbuilder', component: PageToolComponent},
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes);