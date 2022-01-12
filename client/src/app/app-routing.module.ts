import { UserAuthGuard } from './guards/user-auth.guard';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '',component:LoginComponent},
  {path:'register',component:SignupComponent},
  {path:'main-page',component:MainPageComponent,canActivate:[UserAuthGuard]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
