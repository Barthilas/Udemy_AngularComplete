import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component(
    {  
        selector: 'app-header',
        templateUrl:'./header.component.html',
    }
)
export class HeaderComponent implements OnInit, OnDestroy {

   @Output() optionSelected = new EventEmitter<string>();

    collapsed = true;
    isAuthenticated = false;
    private userSub: Subscription

    constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}
    
    ngOnDestroy(): void {
        this.userSub.unsubscribe()
    }
    
    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
            // this.isAuthenticated = !user ? false : true
            this.isAuthenticated = !!user
        });
    }

    onSelect(option: string) {
        this.optionSelected.emit(option)
    }

    onSaveData()
    {
        this.dataStorageService.storeRecipes()
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe()
    }

    onLogout() {
        this.authService.logout()
    }
}