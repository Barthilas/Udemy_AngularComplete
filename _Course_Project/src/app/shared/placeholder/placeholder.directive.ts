import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[appPlaceholder]'
})
export class PlaceholderDirective {
    //reference to the point where this directive is used.
    constructor(public viewContainerRef: ViewContainerRef) {}
}