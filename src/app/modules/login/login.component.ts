import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginService } from 'src/app/services/google-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isError:boolean = false;
  modal:any = {display:'block',heading:'Error!',body:'Login Failed, Please Try Again.'};
  socialUser!: SocialUser;
  isLoggedin: boolean = false;

  constructor(private router: Router,private gLoginServ: GoogleLoginService,private socialAuthService: SocialAuthService) { }
  
  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      if(user && user.idToken){
        window.sessionStorage.setItem('email',user.email);
        window.sessionStorage.setItem('name',user.name);
        this.isError=false;
        this.signUp(user.email,user.name);
        this.router.navigate(['/user/dte']);
      }
      else{
        this.isError = true;
        this.modal = {display:'block',heading:'Error!',body:'Login Failed, Please Try Again.'};
      }
    });
  }

  signUp(email:string,name:string){
    this.gLoginServ.signUp({email:email,name:name}).subscribe((res:any) => {
      if(res && res.data){
        if(res.data.jwtToken){
        const token = res.data.jwtToken;
        window.sessionStorage.setItem('token',token);
      }
      if(res.data.classList && res.data.classList.classVM){
        let classObj = res.data.classList.classVM[0];
        window.sessionStorage.setItem('selectedClass',classObj.id);
      }
      if(res.data.departmentListVM && res.data.departmentListVM.departmentVMS){
        let deptObj = res.data.departmentListVM.departmentVMS[0];
        window.sessionStorage.setItem('selectedDept',deptObj.id);
      }
      this.gLoginServ.setToken();
    }
    });
  }
}
