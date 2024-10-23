import { HttpStatusCodes } from "../enums/http_status_codes.enum";
import { OrderStatus } from "../enums/order_status.enum";
import { OrderModel } from "../models/order.model";
import { OrderService } from "../services/order.service";
import asyncHandler from 'express-async-handler';

const orderService = new OrderService();

export const createOrder = asyncHandler(
    async (req: any, res: any) => {
        const order = await orderService.createOrder(req.body, req.user.id);
        res.send(order);
    }
)

export const getOrder = asyncHandler(
    async(req: any, res: any) => {
        const order = await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });
        if(order) res.send(order);
        else res.status(HttpStatusCodes.HTTP_BAD_REQUEST).send();
    }
)