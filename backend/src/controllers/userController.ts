import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import { UserModel } from "../models/user.model";


export const userRegister = asyncHandler(
    async (req: Request, res: Response) => {
        const { name, lastName, address, email, password } = req.body;
        const currUsers = await UserModel.findOne({ email });

        if(currUsers) {
            res.status(400).send("User already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            name: name,
            lastName: lastName,
            address: address,
            email: email,
            password: hashedPassword,
            isAdmin: false,
        });

        if(newUser) {
            res.status(201).json({
                message: 'User registered successfully',
                user: newUser,
            });

            console.log(res);
        } else {
            res.status(400).send("Error registering user");
            console.log(res);
        }
    }
)

export const userLogin = asyncHandler(
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const convertedEmail = email.toLowerCase();
        const user = await UserModel.findOne({ email: convertedEmail });
        if (!user) {
            res.status(401).json({ message: "Email or password is not valid!" });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user!.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Email or password is not valid!" });
        }
    
        const { password: _, ...userWithoutPassword } = user!.toObject();
        res.send(generateTokenResponse(userWithoutPassword));
    }
)


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