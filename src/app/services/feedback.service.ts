import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private httpServ: HttpService) { }

  getFeedbackQuestions(userType: string) {
    return this.httpServ.getFeedbackQuestions(userType);
  }

  submitFeedback(obj: any) {
    return this.httpServ.submitFeedback(obj);
  }
}
