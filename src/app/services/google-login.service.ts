import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleLoginService {

  constructor(private httpServ: HttpService) { }

  signUp(obj: any) {
    return this.httpServ.signUp(obj);
  }

  setToken(){
    this.httpServ.setToken();
  }
}
