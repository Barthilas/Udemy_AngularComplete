import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";


//EVENTEMMITER VS OBSERVABLE => OBSERVABLE IS BETTER WHEN COMM BETWEEN COMPONENTS.
//EVENTEMMITER USE ON OUTPUT()
@Injectable({
    providedIn: 'root'
})
export class UserService {
    // activatedEmmitter = new EventEmitter<boolean>();
    activatedEmmitter = new Subject<boolean>();
}
