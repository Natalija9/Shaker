import { Component, OnInit } from '@angular/core';
import { Globals } from '../../common/globals';
import { User } from 'src/app/models/user.model'
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user: User;
  loginForm: FormGroup;


  constructor(private formBuilder: FormBuilder) {
    this.user = new User('1','peraperic', 'pera123', 22);

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })

   }

  ngOnInit(): void {
  }

  onSignUp() {
    Globals.shouldDisplaySignUp = true;
    Globals.shouldDisplayLogin = false;
  }

  onLogin() {

    const data = this.loginForm.value;

    const usernameErrors: ValidationErrors | null | undefined = this.loginForm.get('username')?.errors;

    if(usernameErrors !== null ){
      window.alert('Invalid username');
      return;
    }

    const passwordErrors: ValidationErrors | null | undefined = this.loginForm.get('password')?.errors;

    if( passwordErrors !== null ){
      window.alert('Invalid password');
      return;
    }


    if(this.loginForm.invalid){
      window.alert('Invalid input');
      return;
    }

    Globals.shouldDisplayMainPage = true;
    Globals.shouldDisplayLogin = false;
    Globals.shouldDisplaySignUp = false;
  }



}
