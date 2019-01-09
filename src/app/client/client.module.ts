import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidenavComponent } from './sidenav/sidenav.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { StatementComponent } from './statement/statement.component';
import { PaymentComponent } from './payment/payment.component';
import { ServiceComponent } from './service/service.component';
import { ServiceHistoryComponent } from './service-history/service-history.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from '../client/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AddEventComponent } from 'app/shared/community/add-event/add-event.component';
import { CommunityComponent } from 'app/shared/community/community-page/community.component';
import { LeaseComponent } from './lease/lease.component';
import { ApartmentEditComponent } from './lease/apartment/apartment.component';
import { AmenitiesLeaseComponent } from './lease/amenities/amenities.component';
import { LeaseInfoComponent } from './lease/lease-info/lease-info.component';




/**
 * Client Module Comprises of the following Features
 *
 *  Bootstrap Component : Dashboard Component
 *
 *  Welcome : WelcomeComponent
 *
 *  Statement : StatementComponent
 *
 *  Request Service : Service Component
 *
 *  Payment : Payment Component
 *
 *  View Statement : StatementComponent
 *
 *  View Service History : ServiceHistoryComponent
 *
 */
const routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'community',
        component: CommunityComponent,
      },
      {
        path: 'community/add-event',
        component: AddEventComponent
      },
      {
        path: 'pay',
        component: PaymentComponent
      },
      {
        path: 'statement',
        component: StatementComponent
      },
      {
        path: 'request',
        component: ServiceComponent
      },
      {
        path: 'history',
        component: ServiceHistoryComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'lease',
        component: LeaseComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(routes),
  ],
  declarations: [SidenavComponent,
    ApartmentEditComponent,
    AmenitiesLeaseComponent,
    LeaseInfoComponent,
    DashboardComponent,
    WelcomeComponent,
    StatementComponent,
    PaymentComponent,
    ServiceComponent,
    ServiceHistoryComponent,
    ProfileComponent,
    LeaseComponent],
  exports: []
})
export class ClientModule { }
