import { OrderService } from "../services/order.service";
import asyncHandler from 'express-async-handler';

const orderService = new OrderService();

export const createOrder = asyncHandler(
    async (req: any, res: any) => {
        const order = await orderService.createOrder(req.body, req.user.id);
        res.send(order);
    }
)