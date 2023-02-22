import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DteComponent } from './dte/dte.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  {
    path:'user-detail',
    component: UserDetailComponent
  },
  {
    path:'dte',
    component: DteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
