import { users } from "../data";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const userLogin = (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);

    if(user) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(401).send("User name or password is not valid!");
    }
}

const generateTokenResponse = (user: any) => {
    const token = jwt.sign({
        email: user.email, 
        isAdmin: user.isAdmin
    }, "SomeRandomText", {
        expiresIn: "30d"
    });

    user.token = token;
    return user;
}