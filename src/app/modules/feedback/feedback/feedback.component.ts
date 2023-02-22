import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  isError: boolean = false;
  modal: any = { display: 'block', heading: 'Error!', body: 'Unable To Fetch Quetions, Please Try Again.', btnClass: 'btn btn-danger' };
  userType: any = '';
  semisterId: any = '';
  acadmicYear: any = '';
  feedback: any[] = [];

  constructor(private feedbackServ: FeedbackService, private router: Router) { }

  data: any = {}

  ngOnInit(): void {
    this.userType = window.sessionStorage.getItem('userType') ? window.sessionStorage.getItem('userType') : '';
    this.semisterId = window.sessionStorage.getItem('semisterId') ? window.sessionStorage.getItem('semisterId') : 0;
    this.acadmicYear = window.sessionStorage.getItem('acadmicYear') ? window.sessionStorage.getItem('acadmicYear') : '';
    this.feedbackServ.getFeedbackQuestions(this.userType.toString()).subscribe((response: any) => {
      if (response.success === true && response.data) {
        this.data = response;
      }
      else {
        this.isError = true;
        this.modal = { display: 'block', heading: 'Error!', body: 'Unable To Fetch Quetions, Please Try Again.', btnClass: 'btn btn-danger' };
      }
    });
  }

  setAnswer(event: any, qId: any) {
    this.feedback.filter(quesion => quesion.qId == qId)
    this.feedback.push({ questionId: Number(qId), selectedOptionId: Number(event.target.value) });
  }

  submitFeedback(event: any) {
    this.semisterId=(!this.semisterId || this.semisterId==0)?0:this.semisterId;
    this.feedbackServ.submitFeedback({ year: this.acadmicYear, semesterId: this.semisterId, saveOptionVMS: this.feedback }).subscribe((res:any)=>{
      console.log(JSON.stringify(res));
    });
    this.isError = true;
    this.modal = { display: 'block', heading: 'Success!', body: 'Feedback Submitted Successfully...!.', btnClass: 'btn btn-success' };
    this.feedback = [];
  }
}
