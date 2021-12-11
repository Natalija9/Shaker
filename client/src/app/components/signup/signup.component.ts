import { Component, OnInit } from '@angular/core';
import { Globals } from '../../common/globals';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onLogin() {
    Globals.shouldDisplaySignUp = false;
    Globals.shouldDisplayLogin = true;
  }

  shouldDisplay() {
    return Globals.shouldDisplaySignUp;
  }
}
