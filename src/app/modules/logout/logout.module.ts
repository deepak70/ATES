import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';

const googleLoginOptions = {
  oneTapEnabled: false,
  scope: 'profile email'
};

@NgModule({
  declarations: [LogoutComponent],
  imports: [
    CommonModule,
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
  exports: [LogoutComponent]
})
export class LogoutModule { }
