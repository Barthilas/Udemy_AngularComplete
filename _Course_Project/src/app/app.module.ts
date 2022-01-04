import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';

//EVERYTHING IN MODULE IS STANDALONE THERE IS NO MAGICAL COMMS OVER MODULES

@NgModule({
  //Can be declared once, else leads to error. Then export/import to share
  declarations: [
    AppComponent,
    HeaderComponent,
    // DropdownDirective,
    // LoadingSpinnerComponent,
    // AlertComponent, 
    // PlaceholderDirective
  ],
  imports: [
    BrowserModule, //import only once (acces to ngIf, for..)
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule
  ],

  //Core module, only when using providers: [] its better to use @injectable({providedIn}).
  //Providers are only good when you want to defined service for parent and its child components
  //!!! However this is usually what you don't want and you should think about such behaviour as it can bring nasty bugs.
  //TLDR: MOST OF THE TIME YOU USE INJECTABLE, PROVIDED IN COMBO OR PROVIDE THEM HERE IN APP MODULE.

  // providers: [ShoppingListService, RecipeService,
  // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}],
  bootstrap: [AppComponent],
  // providers: [LoggingService]

  // //Obsolete since Angular 9+ (for components generated from .ts)
  // entryComponents: [AlertComponent]
})
export class AppModule { }
