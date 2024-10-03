import { users } from "../data";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const userRegister = (req: Request, res: Response) => {
    const { name, lastName, address, email, password } = req.body;
    const currUsers = users.length;
    users.push({
        name: name, 
        lastName: lastName,
        address: address,
        email: email,
        password: password,
        isAdmin: true
    });

    if(users.length == currUsers + 1) {
        res.send(users);
    } else {
        res.status(400).send("Error");
    }
}

export const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const convertedEmail = email.toLowerCase();
    const user = users.find(user => user.email.toLowerCase() === convertedEmail);

    if (!user) {
        return res.status(401).json({ message: "Email or password is not valid!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Email or password is not valid!" });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.send(generateTokenResponse(userWithoutPassword));
};


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