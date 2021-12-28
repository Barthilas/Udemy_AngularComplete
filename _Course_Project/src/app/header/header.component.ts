import { Component, EventEmitter, Output } from "@angular/core";

@Component(
    {  
        selector: 'app-header',
        templateUrl:'./header.component.html',
    }
)
export class HeaderComponent {

   @Output() optionSelected = new EventEmitter<string>();

    collapsed = true;

    onSelect(option: string) {
        this.optionSelected.emit(option)
    }
}