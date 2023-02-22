import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DteComponent } from './dte/dte.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { LogoutComponent } from '../logout/logout.component';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';
import { ErrorModalModule } from 'src/app/error-modal/error-modal.module';
import { LogoutModule } from '../logout/logout.module';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserComponent,
    DteComponent,
    UserDetailComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ErrorModalModule,
    LogoutModule,
    SocialLoginModule,
    FormsModule
  ]
})
export class UserModule { }
