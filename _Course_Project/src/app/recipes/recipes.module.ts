import { NgModule } from '@angular/core';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesItemComponent } from './recipe-list/recipes-item/recipes-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesComponent } from './recipes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipesItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    //needs to be implemented in every module that uses those. Exception is services from app.module
    // CommonModule, //browserModule pretty much
    SharedModule,
    ReactiveFormsModule,
    RecipesRoutingModule
  ],
  //They are in Routing...
  // exports: [    
  //   RecipesComponent,
  //   RecipesListComponent,
  //   RecipesDetailComponent,
  //   RecipesItemComponent,
  //   RecipeStartComponent,
  //   RecipeEditComponent
  // ]
})
export class RecipesModule { }
