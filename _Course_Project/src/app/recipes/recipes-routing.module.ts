import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeResolver } from './recipe.resolver';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
  //because of lazy loading path is ''
  {path: '', component: RecipesComponent, canActivate:[AuthGuard] ,children: [
    {path: '', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipesDetailComponent, resolve: [RecipeResolver]},
    {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolver]},
  ]},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class RecipesRoutingModule { }
