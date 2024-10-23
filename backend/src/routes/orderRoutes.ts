import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { HttpStatusCodes } from '../enums/http_status_codes.enum';
import { OrderModel } from '../models/order.model';
import { OrderStatus } from '../enums/order_status.enum';
import auth from '../middlewares/auth.mid';
import { createOrder, getOrder } from '../controllers/orderController';
import mongoose from 'mongoose';

const router = Router();
router.use(auth);

router.post('/create', createOrder);
router.get('/newOrder', getOrder);
router.post('/pay', asyncHandler(
    async(req: any, res: any) => {
        const { paymentId } = req.body;
        const order = await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW});
        if(!order) {
            res.status(HttpStatusCodes.HTTP_BAD_REQUEST).send('Order not found!');
            return;
        }

        order.paymentId = paymentId;
        order.status = OrderStatus.PAID;
        await order.save();

        res.send(order._id);
    }
));

router.get('/track/:orderId', asyncHandler(
    async (req: any, res: any) => {
        const { orderId } = req.params;

        if(!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(HttpStatusCodes.HTTP_BAD_REQUEST).json({ message: 'Invalid Order Id' });
        }

        const order = await OrderModel.findById(orderId);

        if(!order) {
            return res.status(HttpStatusCodes.NOT_FOUND).json({ mesage: 'Order not found' });
        }

        return res.json(order);
    }
));

export default router;