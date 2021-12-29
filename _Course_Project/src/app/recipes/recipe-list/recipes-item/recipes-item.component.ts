import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {

  //can be updated with RecipeService as well as I have the id.
  @Input() recipe: Recipe;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

  // onSelected() {
  //   this.recipeService.recipeSelected.emit(this.recipe)
  // }

}
