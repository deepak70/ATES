import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path:'dte',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path:'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path:'feedback',
    loadChildren: () => import('./modules/feedback/feedback.module').then(m => m.FeedbackModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
