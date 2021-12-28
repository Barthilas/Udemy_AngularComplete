import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, DoCheck, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated //none=global css
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit,
AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  //alias
  @Input('srvElement') element: {type: string, name: string, content: string};

  @Input() name: string

  @ViewChild('heading', {static: true}) header: ElementRef;
  
  @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef;

  constructor() { 
    console.log("Constructor called!")
  }
  //would work without implements part 
  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges called!")
    console.log(changes)
  }


  ngOnInit(): void {
    console.log("ngOnInit called!")
    console.log("Text content: " + this.header.nativeElement.textContent)
    console.log("Text content of paragraph: " + this.paragraph.nativeElement.textContent)
  }

  ngDoCheck() {
    console.log("ngDoCheck called!")
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit!")
    console.log("Text content of paragraph: " + this.paragraph.nativeElement.textContent)
  }

  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked!")
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit!")
    console.log("Text content: " + this.header.nativeElement.textContent)
  }
  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked!")
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroyCalled!")
  }

}
