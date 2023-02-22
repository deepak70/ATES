import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private httpServ: HttpService) { }

  getDepartment(): Observable<any> {
    return this.httpServ.getDepartment();
  }

  getClass(): Observable<any> {
    return this.httpServ.getClass();
  }

  getSemisters(): Observable<any> {
    return this.httpServ.getSemisters();
  }

  getAcadmicYears(): Observable<any> {
    return this.httpServ.getAcadmicYears();
  }

  sendStudentInfo(obj: any) {
    return this.httpServ.sendStudentInfo(obj);
  }

  checkFeedbackStatus(userType: string,year:number) {
    return this.httpServ.checkFeedbackStatus(userType,year);
  }
}
