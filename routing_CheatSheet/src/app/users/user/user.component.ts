import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string} = {id: 0, name: "unlucky"}
  parentsSubscription: Subscription

  constructor(private activeRoute: ActivatedRoute) { }
  
  ngOnDestroy(): void {
    this.parentsSubscription.unsubscribe();
  }

  ngOnInit() {
    //snapshot doesnt require subscription, hence doesnt react to changes of URL
    this.user = {
      id: this.activeRoute.snapshot.params['id'],
      name: this.activeRoute.snapshot.params['name']
    };
    
    //dynamic change based on url change
    this.parentsSubscription = this.activeRoute.params.subscribe((params: Params) => {
      this.user.id = params['id'];
      this.user.name = params['name'];
    });
  }

}
