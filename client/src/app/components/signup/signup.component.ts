import { CocktailService } from './../../services/cocktail.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, Subscription } from 'rxjs';
;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {
  sub: Subscription = new Subscription();
  user: User | undefined;
  signUpForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
            private cocktailService: CocktailService,
            private auth:AuthService,
            private router: Router) {
    //this.user = new User('peraperic', 'pera123', 22);

    this.signUpForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(new RegExp("[a-zA-Z]{1,}[a-zA-Z0-9_-]{4,}"))]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.pattern(new RegExp("[0-9]+"))])
    })

   }
  ngOnInit(): void {
  }

  ngOnDestroy() : void {
    if(this.sub)
      this.sub.unsubscribe();
  }

  onLogin() {
    this.router.navigateByUrl('');
  }

  onSignUp() {

    const data = this.signUpForm.value;

    this.formValidation();

    const obs:Observable<User|null> = this.auth.registerUser(data.username,data.password,data.age);

    this.sub = obs.subscribe((user:User|null)=>{
      console.log(user);
      if(user !== null){
        this.cocktailService.username = user.username;
        this.cocktailService.getRatedCocktails();
      }

      this.router.navigateByUrl('main-page');

    });
  }

  private formValidation(){

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
    console.log(data.age)
    if( ageErrors !== null ){
      window.alert('Invalid age');
      return;
    }

    if(this.signUpForm.invalid){
      window.alert('Invalid input');
      return;
    }
  }

}
