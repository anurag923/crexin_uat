import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './config/header/header.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { FooterComponent } from './config/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrexinService } from './services/crexin.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { CrexinInterceptor } from './interceptor/crexin.interceptor';
import { SubcategoriesModule } from './components/subcategories/subcategories.module';
import { CategoriesModule } from './components/categories/categories.module';
import { TermsandconditionsComponent } from './components/termsandconditions/termsandconditions.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AESEncryptDecryptServiceService } from './services/aesencrypt-decrypt-service.service';
import { ConfirmLeaveComponent } from './config/header/confirm-leave/confirm-leave.component';
import { CustomsuccesstoastComponent } from './components/customsuccesstoast/customsuccesstoast.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HelpcenterComponent } from './components/helpcenter/helpcenter.component';
import { HelpqueryComponent } from './components/helpquery/helpquery.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { RememberComponent } from './components/remember/remember.component';
import { ResetComponent } from './components/reset/reset.component';
import { ProfileModule } from './components/profile/profile.module';
import { PrivacypolicyComponent } from './components/privacypolicy/privacypolicy.component';
import { TermsofservicesComponent } from './components/termsofservices/termsofservices.component';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingpageComponent,
    FooterComponent,
    TermsandconditionsComponent,
    ConfirmLeaveComponent,
    CustomsuccesstoastComponent,
    AboutusComponent,
    ConfirmationComponent,
    HelpqueryComponent,
    HelpcenterComponent,
    ForgotComponent,
    RememberComponent,
    ResetComponent,
    PrivacypolicyComponent,
    TermsofservicesComponent,
  ],
  imports: [
    BrowserModule,
    // MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    SubcategoriesModule,
    NgxSpinnerModule,
    CategoriesModule,
    NgxMaterialTimepickerModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    ProfileModule,
    ToastrModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    CrexinService,
    AuthService,
    AESEncryptDecryptServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CrexinInterceptor,
      multi: true,
    },
    // {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
