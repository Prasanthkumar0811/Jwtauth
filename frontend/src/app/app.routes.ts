import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authguardGuard } from './_guard/authguard.guard';
import { CreateoreditComponent } from './pages/createoredit/createoredit.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { ResetComponent } from './pages/reset/reset.component';
import { ViewDialogComponent } from './pages/view-dialog/view-dialog.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { QrUserDetailsComponent } from './pages/qr-user-details/qr-user-details.component';
import { SignOutComponent } from './pages/sign-out/sign-out.component';

export const routes: Routes = [
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'dashboard',
        component:DashboardComponent,
        canActivate:[authguardGuard],
        children:[
            {
                path:':id',
                component:ViewUserComponent
            }
        ]
    },
    { 
        path:'add-user',
        component:CreateoreditComponent,
        canActivate:[authguardGuard] 
    },
    {
        path:'qr-user/:id',
        component:QrUserDetailsComponent
    },
    {
        path:'edit-user/:id',
        component:CreateoreditComponent,
        canActivate:[authguardGuard]
    },
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'forgotpass',
        component:ForgotComponent
    },
    {
        path:'resetpass/:token',
        component:ResetComponent
    },
    {
        path:'sign-out',
        component:SignOutComponent,
    }
];
