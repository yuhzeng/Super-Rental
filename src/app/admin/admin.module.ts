import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from 'app/admin/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceHistoryComponent } from './service-history/service-history.component';
import { EditServiceComponent } from './service-history/edit-service/edit-service.component';
import { EnquiryHistoryComponent } from './enquiry-history/enquiry-history.component';
import { EditComponent } from './enquiry-history/edit/edit.component';
import { ApartmentComponent } from './apartment/apartment.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { LeaseComponent } from './lease/lease.component';
import { EditApartmentComponent } from './apartment/edit-apartment/edit-apartment.component';
import { EditAmenitiesComponent } from './amenities/edit-amenities/edit-amenities.component';
import { EditLeaseComponent } from './lease/edit-lease/edit-lease.component';
import { ApartmentEditComponent} from './lease/edit-lease/apartment/apartment.component';
import { AmenitiesLeaseComponent } from './lease/edit-lease/amenities/amenities.component';
import { LeaseInfoComponent } from './lease/edit-lease/lease-info/lease-info.component';
import { CommunityComponent } from 'app/shared/community/community-page/community.component';
import { AddEventComponent } from 'app/shared/community/add-event/add-event.component';
import { ManageComponent } from './manage/manage.component';
import { BillHistoryComponent } from './bill-history/bill-history.component';
import { AppointmentComponent } from './appointment/appointment.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: [
          {
            path: '',
            component: WelcomeComponent
          },
          {
            path: 'profile',
            component: ProfileComponent
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
            path: 'manage',
            component: ServiceHistoryComponent
          },
          {
            path: 'manage/:id',
            component: EditServiceComponent
          },
          {
            path: 'enquiry',
            component: EnquiryHistoryComponent
          },
          {
            path: 'enquiry/:id',
            component: EditComponent
          },
          {
            path: 'apartment',
            component: ApartmentComponent
          },
          {
            path: 'apartment/:id',
            component: EditApartmentComponent
          },
          {
            path: 'amenities',
            component: AmenitiesComponent
          },
          {
            path: 'amenities/:id',
            component: EditAmenitiesComponent
          },
          {
            path: 'lease',
            component: LeaseComponent
          },
          {
            path: 'lease/:id',
            component: EditLeaseComponent
          },
          {
            path: 'clients',
            component: ManageComponent
          },
          {
            path: 'clients/:id',
            component: EditLeaseComponent
          },
          {
            path: 'tours',
            component: AppointmentComponent
          },
          {
            path: 'request',
            component: ServiceHistoryComponent
          }
        ]
      }
    ])
  ],
  declarations: [DashboardComponent,
     WelcomeComponent,
      SidenavComponent,
      ProfileComponent,
      ServiceHistoryComponent,
      EditServiceComponent,
      EnquiryHistoryComponent,
      EditComponent,
      EditApartmentComponent,
      ApartmentComponent,
      AmenitiesComponent,
      LeaseComponent,
      EditAmenitiesComponent,
      ApartmentEditComponent,
      AmenitiesLeaseComponent,
      LeaseInfoComponent,
      EditLeaseComponent,
      BillHistoryComponent,
      ManageComponent,
      AppointmentComponent]
})

export class AdminModule { }
