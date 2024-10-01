import express from 'express';
import cors from 'cors';
import foodRoutes from './routes/foodRoutes';

const app = express();
const port = process.env.PORT || 8080;

if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        credentials: true,
        origin: "http://localhost:4200",
        methods: 'GET, POST, PUT, DELETE',
        allowedHeaders: 'Content-Type, Authorization'
    }));
}

app.use(express.json());
app.use('/api/foods', foodRoutes);

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
