import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './modules/login/login.module';
import { LogoutComponent } from './modules/logout/logout.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { UserModule } from './modules/user/user.module';
import { ErrorModalModule } from './error-modal/error-modal.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule { }
