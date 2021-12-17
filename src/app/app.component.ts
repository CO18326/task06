import { Component } from '@angular/core';

import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  //isLoggedIn = false;
  

  constructor(public loginservice:LoginService) { }

  ngOnInit(): void {
    if(! window.sessionStorage.getItem('logged_in_name')){
      //window.location.href=window.location.href.split('/')[0]+"/login";
      this.loginservice.loggedIn=false;
    }
    else{
      this.loginservice.loggedIn=true;
    }
  }

  logout(): void {
    window.sessionStorage.removeItem('logged_in_name');
    this.loginservice.loggedIn=false;

    window.location.href=window.location.href.split('//')[0]+'//'+window.location.href.split('//')[1].split('/')[0]+'/'+window.location.href.split('//')[1].split('/')[1]+"/login";
  }
}
