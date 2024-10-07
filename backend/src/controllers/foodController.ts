import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { FoodService } from '../services/food.service';


const foodService = new FoodService();

export const getFoods = asyncHandler(
    async (req: Request, res: Response) => {
        const foods = await foodService.getAllFoods();
        res.send(foods);
    }
)

export const searchFoods = asyncHandler(
    async (req: Request, res: Response) => {
        const foods = await foodService.searchFoods(req.params.searchTerm);
        res.send(foods);
    }
)

export const getFoodById = asyncHandler(
    async (req: Request, res: Response) => {
        const food = await foodService.getFoodById(req.params.foodId);
        res.send(food);
    }
)

export const getTags = asyncHandler(
    async (req: Request, res: Response) => {
        const tags = await foodService.getTags();
        res.send(tags);
    }
)

export const getTagsByName = asyncHandler(
    async (req: Request, res: Response) => {
        const foods = await foodService.getTagsByName(req.params.tagName);
        res.send(foods);
    }
)