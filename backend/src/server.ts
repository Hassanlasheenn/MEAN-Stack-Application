import express from 'express';
import cors from 'cors';
import foodRoutes from './routes/foodRoutes';
import userRoutes from './routes/userRoutes';
import orderRouter from './routes/orderRoutes';
import dotenv from 'dotenv';
import { dbConnect } from './configs/database.config';

dotenv.config();
dbConnect();

const app = express();
const port = process.env.PORT;
app.use(express.json());

const corsOptions = {
    credentials: true,
    origin: process.env.NODE_ENV === 'production' ? '*' : "http://localhost:4200",
}

app.use(cors(corsOptions));

function setCorsHeaders(req: any, res: any, next: any) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    console.log(`Request: ${req.method} ${req.url}`);
    next();
}

app.use(setCorsHeaders);
app.use('/api/foods', foodRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRouter);


app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
