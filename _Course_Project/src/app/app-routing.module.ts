import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolver } from './recipes/recipe.resolver';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, canActivate:[AuthGuard] ,children: [
    {path: '', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipesDetailComponent, resolve: [RecipeResolver]},
    {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolver]},
  ]},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'auth', component: AuthComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
