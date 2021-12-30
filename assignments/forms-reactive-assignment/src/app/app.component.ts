import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  projectStatus = ["Stable", "Critical", "Finished"]
  
  projectForm: FormGroup;

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm(): void {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, CustomValidators.invalidProjectNameValidator], CustomValidators.invalidProjectNameValidatorAsync),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl(this.projectStatus[1].toLowerCase()),
    })
  }

  onSaveProject() {
    console.log(this.projectForm.value)
  }
}
