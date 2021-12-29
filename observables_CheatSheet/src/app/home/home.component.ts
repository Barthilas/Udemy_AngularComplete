import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription

  constructor() { }
  ngOnDestroy(): void {
    //else there will be multiple subscribed instances.
    this.firstObsSubscription.unsubscribe()
  }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count)
    // })

    const customIntervalObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(++count);
        if(count == 2)
        {
          //fires only on completion, not error
          observer.complete()
        }
        if(count>3) {
          observer.error(new Error('Count is greater than three. I am dying.'))
        }
      }, 1000)
    });


    
    this.firstObsSubscription = //operators: pipe add one or more operators
    //map, filter..
      customIntervalObservable.pipe(
        filter((data: number) => {return data > 0}),
        map((data: number) => {
          return 'Round ' + (data + 1);
        })).subscribe((count) => {
          console.log(count)
        }, error => {
          alert("Internal error occured in observable " + error)
        }, () => {
          console.log('Completed!')
        })
  }

}
