"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTagsByName = exports.getTags = exports.getFoodById = exports.searchFoods = exports.getFoods = void 0;
const data_1 = require("../data");
const getFoods = (req, res) => {
    res.send(data_1.foods);
};
exports.getFoods = getFoods;
const searchFoods = (req, res) => {
    const searchTerm = req.params.searchTerm.toLowerCase();
    const sampleFoods = data_1.foods.filter((food) => food.name.toLowerCase().includes(searchTerm));
    res.send(sampleFoods);
};
exports.searchFoods = searchFoods;
const getFoodById = (req, res) => {
    const foodId = req.params.foodId;
    const sampleFood = data_1.foods.find(food => food.id === foodId);
    if (!sampleFood) {
        return res.status(404).send({ message: 'Food not Found' });
    }
    res.send(sampleFood);
};
exports.getFoodById = getFoodById;
const getTags = (req, res) => {
    res.send(data_1.tags);
};
exports.getTags = getTags;
const getTagsByName = (req, res) => {
    const tagName = req.params.tagName;
    const sample_food = data_1.foods.filter(food => { var _a; return (_a = food.tags) === null || _a === void 0 ? void 0 : _a.includes(tagName); });
    res.send(sample_food);
};
exports.getTagsByName = getTagsByName;
