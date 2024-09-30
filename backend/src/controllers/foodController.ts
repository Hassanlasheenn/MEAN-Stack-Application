import { Request, Response } from 'express';
import { foods, tags } from '../data';

export const getFoods = (req: Request, res: Response) => {
    res.send(foods);
}

export const searchFoods = (req: Request, res: Response) => {
    const searchTerm = req.params.searchTerm.toLowerCase();
    const sampleFoods = foods.filter((food) => 
        food.name.toLowerCase().includes(searchTerm));
    res.send(sampleFoods);
}

export const getFoodById = (req: Request, res: Response) => {
    const foodId = req.params.foodId;
    const sampleFood = foods.find(food => food.id === foodId);
    if(!sampleFood) {
        return res.status(404).send({ message: 'Food not Found' });
    }
    res.send(sampleFood);
}

export const getTags = (req: Request, res: Response) => {
    res.send(tags);
}

export const getTagsByName = (req: Request, res: Response) => {
    const tagName = req.params.tagName;
    const sample_food = foods.filter(food => food.tags?.includes(tagName));
    res.send(sample_food);
}