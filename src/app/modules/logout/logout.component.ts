import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.socialAuthService.signOut();
    //this,this.router.navigate(['/login']);
  }
}
