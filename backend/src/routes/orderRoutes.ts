import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { HttpStatusCodes } from '../enums/http_status_codes.enum';
import { OrderModel } from '../models/order.model';
import { OrderStatus } from '../enums/order_status.enum';
import auth from '../middlewares/auth.mid';
import { createOrder } from '../controllers/orderController';

const router = Router();
router.use(auth);

router.post('/create', createOrder);

export default router;