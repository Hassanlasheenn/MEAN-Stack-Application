import { HttpStatusCodes } from "../enums/http_status_codes.enum";
import { OrderStatus } from "../enums/order_status.enum";
import { OrderModel } from "../models/order.model";

export class OrderService {
    async createOrder(requestOrder: any, userId: string) {
        if(requestOrder.items.length <= 0) {
            throw { status: HttpStatusCodes.HTTP_BAD_REQUEST, message: 'Cart is Empty!' };
        }

        await OrderModel.deleteOne({
            user: userId,
            status: OrderStatus.NEW,
        });

        const newOrder = new OrderModel({
            ...requestOrder, 
            user: userId,
        });

        await newOrder.save();
        
        return newOrder;
    }
}