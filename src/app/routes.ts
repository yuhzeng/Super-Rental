import { Routes } from '@angular/router';
import { LoginXComponent } from './public/login-x/login-x.component';
import { RegisterXComponent } from './public/register-x/register-x.component';
import { PublicComponent } from './public/public.component';
import { AuthXGuardClientService} from './services/service-export';
import { AuthXGuardAdminService} from './services/service-export';
import { LeaseComponent } from './public/lease/lease.component';
import { EnquiryComponent } from './public/enquiry/enquiry.component';
import { ForgotXComponent } from './public/forgot-x/forgot-x.component';
import { ReviewsComponent} from './public/reviews/reviews.component';
import { ReviewGaurdService } from './services/review/review-gaurd.service';
import { AppointmentComponent } from './public/appointment/appointment.component';


export const appRoutes: Routes = [
    {
        path : '',
        component : PublicComponent
    },
    {
        path : 'login',
        component : LoginXComponent
    },
    {
        path : 'register',
        component : RegisterXComponent
    },
    {
        path : 'forgot',
        component : ForgotXComponent
    },
    {
        path: 'lease',
        component: LeaseComponent,
        canActivate: [AuthXGuardClientService]
    },
    {
        path : 'enquiry',
        component: EnquiryComponent
    },
    {
        path: 'client',
        loadChildren: './client/client.module#ClientModule',
        canActivateChild: [AuthXGuardClientService]
    },
    {
        // Admin Dashboard Controls
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        canActivateChild: [AuthXGuardAdminService]
    },
    {
        path: 'reviews/:aptID',
        component: ReviewsComponent,
        canActivate: [ReviewGaurdService]
    },
    {
        path: 'appointment',
        component: AppointmentComponent,
    }
];
