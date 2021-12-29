
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {

    //because we are returning a copy, we need to inform components.
    // ingredientsChanged = new EventEmitter<Ingredient[]>();

    //Observables are better suited for the job.
    ingredientsChanged = new Subject<Ingredient[]>();
    
    private ingredients: Ingredient[] = [new Ingredient('Apples', 5), new Ingredient('Tomato', 10)];

    getIngredients() {
        return this.ingredients.slice()
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient)
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        //would call event emitter too many times potentionally.
        // for(let ingredient of ingredients)
        // {
        //     this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    
}