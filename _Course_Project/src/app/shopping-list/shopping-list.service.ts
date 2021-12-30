
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {

    //because we are returning a copy, we need to inform components.
    // ingredientsChanged = new EventEmitter<Ingredient[]>();

    //Observables are better suited for the job.
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    
    private ingredients: Ingredient[] = [new Ingredient('Apples', 5), new Ingredient('Tomato', 10)];

    getIngredients() {
        return this.ingredients.slice()
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice())
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice())
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