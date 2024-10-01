import express from 'express';
import cors from 'cors';
import foodRoutes from './routes/foodRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        credentials: true,
        origin: "http://localhost:4200",
    }));
}

function setCorsHeaders(req: Request, res: any, next: any) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
}

app.use(setCorsHeaders);
app.use('/api/foods', foodRoutes);
app.use('/api/users', userRoutes);


app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
