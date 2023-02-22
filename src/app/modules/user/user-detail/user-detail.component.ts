import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CLASS, DEPARTMENT, USER_TYPES } from 'src/app/constants/constant.constants';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private userInforServ: UserInfoService, private router: Router) { }
  //CSS Variable
  deptFormSelectCSS: string = 'form-select';
  classFormSelectCSS: string = 'form-select';
  semisterFormSelectCSS: string = 'form-select';
  acadmicYearFormSelectCSS: string = 'form-select';

  //Department Variables
  dept: any = {};
  departments: any = [DEPARTMENT];
  selectedDept: any = {};
  disableDept = false;

  //Classes Variables
  classes: any = [CLASS];
  classObj: any = {};
  selectedClass: any = {};
  disableClass = false;

  //Semister Variables
  semisters: any = [{
    "semisterId": 0,
    "semister": "Select Semister"
  }];
  semister: any = {};

  //Acadmic Year Variables
  acadmicYears: any = [{ "year": "Select Acadmic Year" }];
  acadmicYear: any = {};

  //user Variables
  userEmail: any = '';
  userName: any = '';
  userType: any = '';

  //Error variables
  isError: boolean = false;
  modal: any = { display: 'block', heading: 'Error!', body: 'Please Enter Valid Data, Try Again!', btnClass: 'btn btn-danger' };

  isShow1 = false;
  isShow2 = false;
  isShow3 = false;

  ngOnInit(): void {
    this.dept = 0;
    this.classObj = 0;
    this.semister = 0;
    this.acadmicYear = 'Select Acadmic Year';
    this.userEmail = window.sessionStorage.getItem('email') ? window.sessionStorage.getItem('email') : '';
    this.userName = window.sessionStorage.getItem('name') ? window.sessionStorage.getItem('name') : '';
    this.userType = window.sessionStorage.getItem('userType') ? window.sessionStorage.getItem('userType') : '';
    if (window.sessionStorage.getItem('selectedDept')) {
      this.selectedDept = window.sessionStorage.getItem('selectedDept');
      this.disableDept = true;
    }
    else {
      this.selectedDept = DEPARTMENT.id;
      this.disableDept = false;
    }
    if (window.sessionStorage.getItem('selectedClass')) {
      this.selectedClass = window.sessionStorage.getItem('selectedClass');
      this.disableClass = true;
    }
    else {
      this.selectedClass = CLASS.id;
      this.disableClass = false;
    }
    this.setFieldsVisibility();
    this.getDepartment();
    this.getClass();
    this.getSemisters();
    this.getAcadmicYears();
  }

  setFieldsVisibility() {
    if (this.userType.toLowerCase() === USER_TYPES.STUDENT_ABOUT_TEACHER.toLowerCase()) {
      this.isShow1 = true;
    }
    else if (this.userType.toLowerCase() === USER_TYPES.PARENT.toLowerCase()) {
      this.isShow2 = true;
    }
    else {
      this.isShow3 = true;
    }
  }

  getDepartment() {
    this.userInforServ.getDepartment().subscribe((response: any) => {
      if (response.success === true) {
        if (response.data && response.data.departmentVMS) {
          for (let dept of response.data.departmentVMS) {
            this.departments.push(dept);
          }
        }
      }
      else {
        this.departments = [];
      }
    });
  }

  getClass() {
    this.userInforServ.getClass().subscribe((response: any) => {
      if (response.success === true) {
        if (response.data && response.data.classVM) {
          for (let classObj of response.data.classVM) {
            this.classes.push(classObj);
          }
        }
      }
      else {
        this.classes = [];
      }
    });
  }

  getSemisters() {
    this.userInforServ.getSemisters().subscribe((response: any) => {
      if (response.success === true) {
        if (response.data && response.data.semisters) {
          for (let semister of response.data.semisters) {
            this.semisters.push(semister);
          }
        }
      }
      else {
        this.semisters = [];
      }
    });
  }

  getAcadmicYears() {
    this.userInforServ.getAcadmicYears().subscribe((response: any) => {
      if (response.success === true) {
        if (response.data && response.data.year) {
          for (let year of response.data.year) {
            this.acadmicYears.push(year);
          }
        }
      }
      else {
        this.acadmicYears = [];
      }
    });
  }

  setDept(val: any) {
    this.deptFormSelectCSS = (val == 0) ? 'form-select form-select-error' : 'form-select';
    this.dept = val;
    this.selectedDept = val;
  }

  setClass(val: any) {
    this.classFormSelectCSS = (val == 0) ? 'form-select form-select-error' : 'form-select';
    this.classObj = val;
    this.selectedClass = val;
  }

  setSemister(val: any) {
    this.semisterFormSelectCSS = (val == 0) ? 'form-select form-select-error' : 'form-select';
    this.semister = val;
  }

  setAcadmicYear(val: any) {
    if (val == 'Select Acadmic Year') {
      this.acadmicYearFormSelectCSS = 'form-select form-select-error';
    }
    else {
      this.acadmicYear = val;
      this.acadmicYearFormSelectCSS = 'form-select';
    }
  }

  submitStudInfo(event: any) {
    if ((this.userType.toLowerCase() == USER_TYPES.STUDENT_ABOUT_TEACHER.toLowerCase() && (this.dept != 0 && this.classObj != 0 && this.semister != 0 && this.acadmicYear != 'Select Acadmic Year')) ||
      (this.userType.toLowerCase() != USER_TYPES.STUDENT_ABOUT_TEACHER.toLowerCase() && (this.acadmicYear != 'Select Acadmic Year'))) {
      let reqObj = {
        'email': this.userEmail,
        'name': this.userName,
        'departmentId': this.dept,
        'classId': this.classObj,
        'semisterId': this.semister,
        'year': this.acadmicYear
      };
      window.sessionStorage.setItem('acadmicYear', this.acadmicYear);
      if (this.semister)
        window.sessionStorage.setItem('semisterId', this.semister);
      this.userInforServ.sendStudentInfo(reqObj).subscribe((response: any) => {
        if (response.success === true && response.data === true) {
          this.userInforServ.checkFeedbackStatus(this.userType,this.acadmicYear).subscribe((res: any) => {
            if (res && !res.success && res.message) {
              this.modal = { display: 'block', heading: 'Alert!', body: res.message, btnClass: 'btn btn-success' };
            }
            else {
              this.router.navigate(['/feedback/feedback']);
            }
          });
        }
        else {
          this.isError = true;
          this.modal = { display: 'block', heading: 'Error!', body: 'Data Not Added. Please Try Again!', btnClass: 'btn btn-danger' };
        }
      });
      return false;
    }
    else {
      this.isError = true;
      this.modal = { display: 'block', heading: 'Error!', body: 'Fill All Details And Try Again!', btnClass: 'btn btn-danger' };
      return false;
    }
  }
}
