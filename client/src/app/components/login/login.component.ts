import { Component, OnInit } from '@angular/core';
import { Globals } from '../../common/globals';
import { User } from 'src/app/models/user.model'
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  sub: Subscription = new Subscription();
  loginForm: FormGroup;
  user: User;


  constructor(private formBuilder: FormBuilder,private auth:AuthService) {
    this.user = new User('peraperic', 'pera123', 22);

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

  onLogin(): void {

    const data = this.loginForm.value;

    this.formValidation();

    this.sub = this.auth.login(data.username, data.password).subscribe((user: User | null) => {
      if(user !== null){
        console.log(user);
        Globals.shouldDisplayMainPage = true;
        Globals.shouldDisplayLogin = false;
        Globals.shouldDisplaySignUp = false;
      }
      else{
        this.loginForm.reset();
      }
    });

  }

  private formValidation(){

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

  }



}
