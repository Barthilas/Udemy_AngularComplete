import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  private closeSub: Subscription

  //first occurence
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective

  constructor(private authService: AuthService, private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver) { }
  ngOnDestroy(): void {
    if(this.closeSub) {
      this.closeSub.unsubscribe()
    }
  }

  ngOnInit(): void {
  }

  //done in template
  // onSwitchMode() {
  //   this.isLoginMode = !this.isLoginMode
  // }
  
  onSubmit(form: NgForm) {
    //tbh just extra protection never hurts, but in the end its useless :)
    if(!form.valid)
    {
      return
    }
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if(this.isLoginMode) {
     authObs = this.authService.login(email, password)
    }
    else
    {
      authObs = this.authService.signup(email, password)
    }
    
    authObs.subscribe((response) => {
      console.log(response)
      this.isLoading = false;
      this.router.navigate(['./recipes'])
    },
    errorMessage => {
      this.isLoading = false;
      this.error = errorMessage
      this.showErrorAlert(this.error);
      console.log(errorMessage)
    })  
    form.reset()
  }

  onHandleClose()
  {
    this.error = null
  }

  //better to use ngIf..
  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent()
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear()

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe()
      hostViewContainerRef.clear()
    });
    
  }

}
