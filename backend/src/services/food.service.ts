import { FoodModel } from "../models/food.model";

export class FoodService {
    //method to get the foods
    async getAllFoods() {
        return await FoodModel.find();
    }

    async searchFoods(searchTerm: string) {
        // create a search case insensitave like mongo db
        const searchRegex = new RegExp(searchTerm, 'i');
        return await FoodModel.find({ name: { $regex: searchRegex }});
    }

    async getFoodById(foodId: string) {
        return await FoodModel.findById(foodId);
    }

    async getTags() {
        const tags = await FoodModel.aggregate([
            { $unwind: '$tags' },
            {
                $group: {
                    _id: '$tags',
                    count: { $sum: 1 }
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
        };
        
        tags.unshift(all);
        return tags;
    }

    async getTagsByName(tagName: string) {
        return await FoodModel.find({ tags: tagName });
    }
}