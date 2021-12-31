import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})

//if we refresh on selected recipe the App falls, this prevents it.
export class RecipeResolver implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Recipe[] {
    //first check if preload is neccessary else -> data inconsistency
    const recipes = this.recipesService.getRecipes();

    if (recipes.length === 0) {
      //auto subscribe
      return this.dataStorageService.fetchRecipes();
    }
    else {
      return recipes;
    }
  }
}
