import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { promise } from 'protractor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(): void {
    this.createForm()
    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // )
    this.signupForm.statusChanges.subscribe(
      (value) => console.log(value)
    )
    this.signupForm.setValue({
      'userData': {
        'username': 'Max',
        'email': 'max@test.com'
      },
      'gender': 'male',
      'hobbies': []
    })
    this.signupForm.patchValue({
      'userData': {
      'username': 'Anna'
      }
    })
  }

  //bind(this) 
  createForm() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmailsAsync),
      }),
      'gender': new FormControl(this.genders[0]),
      'hobbies': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signupForm)
    this.signupForm.reset({
      gender: this.genders[0] //dont reset gender.
    })
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control)
  }

  getControls() {
    //else error in template
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true}
    }
    //if validation is okay, send null not false.
    return null;
  }

  forbiddenEmailsAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout((() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null)
        }
      }),1500)
    })
    return promise;
  }
}
