import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthorizationService} from './services/authorization/authorization.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {LocalStorageService} from './services/local-storage/local-storage.service';
import {Store} from './store/store';
import {CustomerService} from './services/customer/customer.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {AuthGuard} from './guards/auth.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FlexLayoutModule,
    SweetAlert2Module.forRoot()
  ],
  exports: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    AuthorizationService,
    AuthGuard,
    LocalStorageService,
    CustomerService,
    Store
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
      parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        `Core Module has already been loaded. Import Core modules in the AppModule only.`
      );
    }
  }
}
