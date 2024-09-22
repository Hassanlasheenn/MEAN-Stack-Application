import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { foods, Tags } from 'src/data';
import { Tag } from '../shared/models/tags';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() {}

  getAll(): Food[] {
    return foods;
  }

  getAllFoodBySearch(searchTerm: string) {
    return this.getAll().filter((food: Food) => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  getFoodById(foodId: string): Food {
    return this.getAll().find(food => food.id === foodId) ?? new Food();
  }

  getAllTags(): Tag[] {
    return Tags;
  }

  getAllFoodByTag(tag: string): Food[] {
    return tag === 'All' ?
    this.getAll() :
    this.getAll().filter(food => food.tags?.includes(tag));
  }
}