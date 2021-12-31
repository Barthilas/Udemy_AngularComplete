import { Component, EventEmitter, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component(
    {  
        selector: 'app-header',
        templateUrl:'./header.component.html',
    }
)
export class HeaderComponent {

   @Output() optionSelected = new EventEmitter<string>();

    collapsed = true;

    constructor(private dataStorageService: DataStorageService) {}

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
}