import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { MybookingsComponent } from './mybookings/mybookings.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileFiledComponent } from './profile-filed/profile-filed.component';
import { CouponsComponent } from './coupons/coupons.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  { path: 'bookings', component: MybookingsComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'coupons', component: CouponsComponent },
  { path: 'address', component: AddressComponent },
  { path: 'address', component: AddressComponent },
  { path: 'profile', component: ProfileFiledComponent },
  { path: '', component: MybookingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
