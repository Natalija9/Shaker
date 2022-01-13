import { Router } from '@angular/router';
import { CocktailService } from 'src/app/services/cocktail.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model'
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  sub: Subscription = new Subscription();
  loginForm: FormGroup;
  user: User;


  constructor(private formBuilder: FormBuilder, private auth:AuthService,
    private cocktailService: CocktailService,
    private router:Router) {

    this.user = new User('peraperic', 'pera123', 22);

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })

   }

  ngOnInit(): void {
  }

  onSignUp() {
    this.router.navigateByUrl('register');
  }

  onLogin(): void {

    const data = this.loginForm.value;

    if(!this.formValidation()){
      this.loginForm.reset();
      return;
    }

    this.sub = this.auth.login(data.username, data.password).subscribe((user: User | null) => {
      if(user !== null){
        this.cocktailService.username = user.username;
        this.cocktailService.isAdult = user.age >= 18;
        this.cocktailService.getRatedCocktails();
        this.router.navigateByUrl('main-page');
      }
      else{
        this.loginForm.reset();
      }
    });

  }

  private formValidation() : boolean {

    const usernameErrors: ValidationErrors | null | undefined = this.loginForm.get('username')?.errors;
    if(usernameErrors !== null ){
      window.alert('Invalid username');
      return false;
    }

    const passwordErrors: ValidationErrors | null | undefined = this.loginForm.get('password')?.errors;
    if( passwordErrors !== null ){
      window.alert('Invalid password');
      return false;
    }


    if(this.loginForm.invalid){
      window.alert('Invalid input');
      return false;
    }

    return true;

  }



}
