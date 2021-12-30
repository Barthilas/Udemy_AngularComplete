import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f', {static: true}) signUpForm:NgForm
  defaultQuestion = "pet";
  answer = '';
  genders = ['Male', 'Female'];

  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  }
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.signUpForm.form.patchValue({userData: {username: suggestedName}});

    // this.signUpForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'Male'
    // })
  }

  // onSubmit(form: NgForm) {
  //   console.log(form) 
  // }

  onSubmit() {
    console.log(this.signUpForm)
    this.user.username = this.signUpForm.value.userData.username;
    this.user.email = this.signUpForm.value.userData.email;
    this.user.secretQuestion = this.signUpForm.value.secret;
    this.user.answer = this.signUpForm.value.questionAnswer;
    this.user.gender = this.signUpForm.value.gender;
    this.submitted = true;

    //can act same like setValue.. but additionaly resets the touched, valid and so on.
    this.signUpForm.reset();
  }
}
