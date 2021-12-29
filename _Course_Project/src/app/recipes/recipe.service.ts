
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

   private recipes: Recipe[] = [
        new Recipe("Tasty Schnitzel", "A super-tasty schnitzel - just awesome!", 
        "https://upload.wikimedia.org/wikipedia/commons/2/22/Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG",
        [
          new Ingredient('Meat', 1),
          new Ingredient('French fries', 20),
        ]),
        new Recipe("Big Fat Burger", "Bacon?", 
        "https://upload.wikimedia.org/wikipedia/commons/d/dc/Lounge_Burger_Wiki.jpg",
        [
          new Ingredient('Buns', 2),
          new Ingredient('Meat', 1)
        ])
      ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        //return copy
        return this.recipes.slice();
    }

    getRecipe(id: number) {
      return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.slService.addIngredients(ingredients)
    }


}