import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DrinkInfoComponent } from './components/drink-info/drink-info.component';
import { DrinkListComponent } from './components/drink-list/drink-list.component';
import { MainPageComponent } from './components/main-page/main-page.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterComponent } from './components/filter/filter.component';
import { FavouritesComponent } from './components/favourites/favourites.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DrinkInfoComponent,
    DrinkListComponent,
    MainPageComponent,
    FilterComponent,
    FavouritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
