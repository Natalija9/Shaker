import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Globals } from './../../common/globals';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User;
  signUpForm: FormGroup;


  constructor(private formBuilder: FormBuilder) {
    this.user = new User('peraperic', 'pera123', 22);

    this.signUpForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(new RegExp("[a-zA-Z]{1,}[a-zA-Z0-9_-]{4,}"))]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.pattern(new RegExp("[0-9]+"))])
    })

   }
  ngOnInit(): void {
  }

  onLogin() {
    Globals.shouldDisplaySignUp = false;
    Globals.shouldDisplayLogin = true;
  }

  onSignUp() {

    const data = this.signUpForm.value;

    const usernameErrors: ValidationErrors | null | undefined = this.signUpForm.get('username')?.errors;

    if(usernameErrors !== null ){
      window.alert('Invalid username');
      return;
    }

    const passwordErrors: ValidationErrors | null | undefined = this.signUpForm.get('password')?.errors;

    if( passwordErrors !== null ){
      window.alert('Password should contain at least 5 characters');
      return;
    }

    const confirmErrors: ValidationErrors | null | undefined = this.signUpForm.get('confirmPassword')?.errors;

    if( confirmErrors !== null ){
      window.alert('Confirm password');
      return;
    }

    if(data.password !== data.confirmPassword){
      window.alert('Password and confirmed password do not match');
      return;
    }

    const ageErrors: ValidationErrors | null | undefined = this.signUpForm.get('age')?.errors;

    if( ageErrors !== null ){
      window.alert('Invalid age');
      return;
    }

    if(this.signUpForm.invalid){
      window.alert('Invalid input');
      return;
    }

    Globals.shouldDisplayMainPage = true;
    Globals.shouldDisplayLogin = false;
    Globals.shouldDisplaySignUp = false;
  }

}
