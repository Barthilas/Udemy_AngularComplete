import { Injectable } from '@angular/core';

//for the love of god do not instantiate this class on it's own.

//This makes this class app-wide available, singleton...
//if you don't want app-wide use providers in component
// @Injectable({
//   providedIn: 'root'
// })
export class LoggingService {

  constructor() { }

  logStatusChange(status: string) {
    console.log('A server status changed, new status: ' + status);
  }
}
