import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';
import { AppModule } from 'src/app/app.module';
import { ErrorModalModule } from 'src/app/error-modal/error-modal.module';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
const googleLoginOptions = {
    oneTapEnabled: false,
    scope: 'profile email'
  };
@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        ErrorModalModule,
        SocialLoginModule
    ],
    providers: [
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(
                  '223310660195-e1jhvl63cu0h3ab1scr7lp32vqtruc7j.apps.googleusercontent.com',googleLoginOptions
                )
              }
            ]
          } as SocialAuthServiceConfig,
        }    
      ],
})
export class LoginModule { }
