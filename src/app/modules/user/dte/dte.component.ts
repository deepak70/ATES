import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USER_TYPES } from 'src/app/constants/constant.constants';
import { EligibilityService } from 'src/app/services/eligibility.service';

@Component({
  selector: 'app-dte',
  templateUrl: './dte.component.html',
  styleUrls: ['./dte.component.css']
})
export class DteComponent implements OnInit {

  userType: string = USER_TYPES.STUDENT_ABOUT_INSTITUTE;
  eligibilityNumber: string = '';
  isError: boolean = false;
  modal: any = { display: 'block', heading: 'Error!', body: 'Invalid Eligibility', btnClass: 'btn btn-danger' };
  userTypes = USER_TYPES;

  constructor(private router: Router, private eligibilityServ: EligibilityService) { }

  ngOnInit(): void {
    window.sessionStorage.setItem('userType', this.userType);
  }

  setUserType(event: any) {
    this.userType = event.target.value;
    window.sessionStorage.setItem('userType', this.userType);
  }

  setEligibilityNum(val: string) {
    this.eligibilityNumber = val;
  }
  // window.sessionStorage.setItem('token',response.data.jwtToken);
  validateEligibilityNum(event: any) {
    this.eligibilityServ.validateEligibility(this.userType, this.eligibilityNumber).subscribe((response: any) => {
      if (response.success === true && response.data === true) {
        window.sessionStorage.setItem('userType', this.userType);
        if (response.data.department)
          window.sessionStorage.setItem('department', response.data.department.id);
        if (response.data.class)
          window.sessionStorage.setItem('class', response.data.class.id);
        this.router.navigate(['/user/user-detail']);
      }
      else {
        this.isError = true;
        this.modal = { display: 'block', heading: 'Error!', body: response.message, btnClass: 'btn btn-danger' };
      }
    });
  }
}
