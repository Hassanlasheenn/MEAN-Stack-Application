import { Router } from "express";
import { getFoods, searchFoods, getFoodById, getTags, getTagsByName } from "../controllers/foodController";

const router = Router();

router.get('/', getFoods);
router.get('/tags', getTags);
router.get('/search/:searchTerm', searchFoods);
router.get('/:foodId', getFoodById);
router.get('/tag/:tagName', getTagsByName);


export default router;