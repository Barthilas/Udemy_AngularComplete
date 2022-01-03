import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  //loadChildren: './recipes/recipes.module#RecipesModule' the old way of doing it.
  {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(module => module.RecipesModule)},
  {path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(module => module.ShoppingListModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
