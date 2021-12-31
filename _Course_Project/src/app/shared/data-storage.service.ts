import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  baseUrl: string = "https://udemy-angular-courseproj-default-rtdb.europe-west1.firebasedatabase.app/"

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
      const recipes = this.recipeService.getRecipes();
      this.http.put(this.baseUrl + "recipes.json", recipes).subscribe(
        (response) => {
          console.log(response)
        }
      )
    }

    fetchRecipes() {
      return this.http.get<Recipe[]>(this.baseUrl + "recipes.json")
      
      //add ingredients so the App does not fall.
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {... recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        })
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes)
      })
      
      
      )
      
      // .subscribe(
      //   recipes => {
      //     console.log(recipes)
      //     this.recipeService.setRecipes(recipes)
      //   }
      // )
    }
}
