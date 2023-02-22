import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry, throwError } from 'rxjs';
import { USER_TYPES } from '../constants/constant.constants';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  BASE_URL = "http://localhost:9090/api";
  CHECK_ELIGIBILITY_URL = "/common/check-eligibility";
  GET_DEPARTMENT_URL = "/common/get-department";
  GET_CLASS_URL = "/common/get-class";
  GET_SEMISTER_URL = "/common/get-semester";
  GET_ACADMIC_YEAR_URL = "/common/get-year";
  SEND_STUDENT_INFO = "/common/stud-info";
  FEEDBACK_QUESTIOINS = "/feedback";
  CHECK_FEEDBACK_STATUS = "/feedback/check-already-submit";
  SUBMIT_FEEDBACK = "/feedback/save";
  SIGNUP_URL = "/auth/signup";
  token: string | string[] = '';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.token
  });

  constructor(private http: HttpClient) { }

  setToken() {
    this.token = "Bearer "+window.sessionStorage.getItem('token') as string | string[];
    console.log("token "+this.token);
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token
    });
  }

  validateEligibility(userType: string, eligibilityNumber: string) {
    return this.http.get(this.BASE_URL+this.CHECK_ELIGIBILITY_URL,{ headers: this.headers,params:{eligibilityNumber:eligibilityNumber,userType:userType} }).pipe(retry(1), catchError(this.handleError));
    // return this.http.get(this.validateEli(userType, eligibilityNumber), { headers: this.headers, params: { eligibilityNumber: eligibilityNumber, userType: userType } }).pipe(retry(1), catchError(this.handleError));
  }

  getDepartment() {
    return this.http.get(this.BASE_URL+this.GET_DEPARTMENT_URL,{ headers: this.headers }).pipe(retry(1), catchError(this.handleError));
    // return this.http.get('./assets/getdept.json', { headers: this.headers }).pipe(retry(1), catchError(this.handleError));
  }

  getClass() {
    return this.http.get(this.BASE_URL+this.GET_CLASS_URL,{headers:this.headers}).pipe(retry(1), catchError(this.handleError));
    // return this.http.get('./assets/getclass.json').pipe(retry(1), catchError(this.handleError));
  }

  getSemisters() {
    return this.http.get(this.BASE_URL+this.GET_SEMISTER_URL,{headers:this.headers}).pipe(retry(1), catchError(this.handleError));
    // return this.http.get('./assets/getsemister.json').pipe(retry(1), catchError(this.handleError));
  }

  getAcadmicYears() {
    return this.http.get(this.BASE_URL+this.GET_ACADMIC_YEAR_URL,{headers:this.headers}).pipe(retry(1), catchError(this.handleError));
    // return this.http.get('./assets/getacadmicyear.json').pipe(retry(1), catchError(this.handleError));
  }

  sendStudentInfo(obj: any) {
    return this.http.post(this.BASE_URL+this.SEND_STUDENT_INFO,obj,{headers:this.headers}).pipe(retry(1), catchError(this.handleError));
    // return this.http.get('./assets/eligibilitysuccess.json').pipe(retry(1), catchError(this.handleError));
  }

  getFeedbackQuestions(userType: string) {
    return this.http.get(this.BASE_URL+this.FEEDBACK_QUESTIOINS,{headers:this.headers,params:{feedbackType:userType}}).pipe(retry(1), catchError(this.handleError));
    // return this.http.get('./assets/feedbackq.json', { headers: this.headers, params: { userType: userType } }).pipe(retry(1), catchError(this.handleError));
  }

  checkFeedbackStatus(userType: string,year :number) {
    return this.http.get(this.BASE_URL+this.CHECK_FEEDBACK_STATUS,{headers:this.headers,params:{userType:userType,year:year}}).pipe(retry(1), catchError(this.handleError));
    // return this.http.get('./assets/feedbackq.json', { headers: this.headers, params: { feedbackType: userType } }).pipe(retry(1), catchError(this.handleError));
  }

  submitFeedback(obj: any) {
    return this.http.post(this.BASE_URL+this.SUBMIT_FEEDBACK,obj,{headers:this.headers}).pipe(retry(1), catchError(this.handleError));
    // return this.http.get('./assets/feedbackq.json', { headers: this.headers }).pipe(retry(1), catchError(this.handleError));
  }
  signUp(obj: any) {
    return this.http.post(this.BASE_URL+this.SIGNUP_URL,obj,{headers:this.headers}).pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }

  validateEli(userType: string, eligibilityNum: string) {
    if (userType.toLowerCase() == USER_TYPES.STUDENT_ABOUT_TEACHER.toLowerCase() && eligibilityNum == '12345')
      return './assets/eligibilitysuccess.json';
    else
      return './assets/eligibility.json';
  }

  getGLOginRes() {
    return "success";
  }
}
