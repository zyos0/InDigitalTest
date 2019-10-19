import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './containers/app/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import {AppHeaderComponent} from './components/app-header/app-header.component';
import {AppRoutingModule} from './app.routing.module';
import {CoreModule} from '../core/core.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {WelcomeComponent} from './containers/welcome/welcome.component';
import {NotFoundComponent} from './containers/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    WelcomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,


    CoreModule,
    FlexLayoutModule,




    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
