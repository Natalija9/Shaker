import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shaker';

  shouldDisplayLogin: boolean = true;
  shouldDisplaySignUp: boolean = false; 

  onSignUp() {
    this.shouldDisplaySignUp = true;
  }

}
