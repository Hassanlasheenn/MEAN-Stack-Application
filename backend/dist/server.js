"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const foodRoutes_1 = __importDefault(require("./routes/foodRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
if (process.env.NODE_ENV === 'development') {
    app.use((0, cors_1.default)({
        credentials: true,
        origin: "http://localhost:4200"
    }));
}
app.use(express_1.default.json());
app.use('/api/foods', foodRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
