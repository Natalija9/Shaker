import { Component, OnInit } from '@angular/core';
import { Globals } from '../../common/globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSignUp() {
    Globals.shouldDisplaySignUp = true;
    Globals.shouldDisplayLogin = false;
  }

  shouldDisplay() {
    return Globals.shouldDisplayLogin;
  }

}
