import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { Tag } from '../shared/models/tags';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { 
  FOODS_BY_SEARCH_URL, 
  FOODS_BY_TAG_URL, 
  FOODS_TAGS_URL, 
  FOODS_URL 
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(
    private _http: HttpClient,
  ) {}

  getAll(): Observable<Food[]> {
    return this._http
    .get<Food[]>(FOODS_URL)
    .pipe(take(1));
  }

  getAllFoodBySearch(searchTerm: string): Observable<Food[]> {
    return this._http.get<Food[]>(`${FOODS_BY_SEARCH_URL}/${searchTerm}`).pipe(take(1));
  }

  getFoodById(foodId: number): Observable<Food> {
    return this._http.get<Food>(`${FOODS_URL}/${foodId}`).pipe(take(1));
  }

  getAllTags(): Observable<Tag[]> {
    return this._http
    .get<Tag[]>(FOODS_TAGS_URL)
    .pipe(take(1));
  }

  getAllFoodByTag(tag: string): Observable<Food[]> {
    return tag === 'All' ?
    this.getAll() :
    this._http.get<Food[]>(`${FOODS_BY_TAG_URL}/${tag}`)
    .pipe(take(1));
  }
}