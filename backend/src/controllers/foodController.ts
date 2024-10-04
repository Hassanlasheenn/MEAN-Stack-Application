import { Request, Response } from 'express';
import { FoodModel } from '../models/food.model';
import asyncHandler from 'express-async-handler';

export const getFoods = asyncHandler(
    async (req: Request, res: Response) => {
        const foods = await FoodModel.find();
        res.send(foods);
    }
)

export const searchFoods = asyncHandler(
    async (req: Request, res: Response) => {
        // create a search case insensitave like mongo db
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const foods = await FoodModel.find({ name: {$regex: searchRegex} });
        res.send(foods);
    }
)

export const getFoodById = asyncHandler(
    async (req: Request, res: Response) => {
        const food = await FoodModel.findById(req.params.foodId);
        res.send(food);
    }
)

export const getTags = asyncHandler(
    async (req: Request, res: Response) => {
        const tags = await FoodModel.aggregate([
            {
                $unwind: '$tags'
            },
            {
                $group: {
                    _id: '$tags',
                    count: {$sum: 1}
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            }
        ]).sort({ count: -1 });
        const all = {
            name: 'All',
            count: await FoodModel.countDocuments()
        }

        tags.unshift(all);
        res.send(tags);
    }
)

export const getTagsByName = asyncHandler(
    async (req: Request, res: Response) => {
        const foods = await FoodModel.find({ tags: req.params.tagName })
        res.send(foods);
    }
)