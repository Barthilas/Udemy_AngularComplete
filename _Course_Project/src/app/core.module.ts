import { NgModule } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { LoggingService } from './logging.service';



@NgModule({
  declarations: [],
  //services dont need to be exported
  providers: [
    ShoppingListService, 
    RecipeService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},
  ],
})
export class CoreModule { }
