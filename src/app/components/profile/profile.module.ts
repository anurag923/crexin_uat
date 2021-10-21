import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MybookingsComponent } from './mybookings/mybookings.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { PaymentsComponent } from './payments/payments.component';
import { AddressComponent } from './address/address.component';
import { ProfileFiledComponent } from './profile-filed/profile-filed.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CouponsComponent } from './coupons/coupons.component';

@NgModule({
  declarations: [
    ProfileComponent,
    MybookingsComponent,
    SidenavComponent,
    FavouritesComponent,
    PaymentsComponent,
    AddressComponent,
    ProfileFiledComponent,
    CouponsComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
