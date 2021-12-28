import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  optionSelected = 'recipe';

  onNavigate(option: string) {
    this.optionSelected = option;
  }
}
