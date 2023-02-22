import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit {

  constructor() { }
  
  @Input()
  modal:any;

  ngOnInit(): void {
  }

  close(){
    this.modal.display='none';
  }

  
}
