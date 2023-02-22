import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class EligibilityService {

  constructor(private httpServ: HttpService) { }

  validateEligibility(userType: string, eligibilityNumber: string): Observable<any> {
    return this.httpServ.validateEligibility(userType, eligibilityNumber);
  }
}
