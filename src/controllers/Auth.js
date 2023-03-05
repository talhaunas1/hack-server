import { User } from "../schemas/User.js";
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import * as dotenv from 'dotenv'

dotenv.config()

export const registerUser = async (req, res) => {
    try {
        const { userName, email, password } = await req.body;
        if (!userName || !email || !password) res.status(400).json({success: false, message: 'all fields required!'})

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await User.create({
            userName,
            email,
            password: hashedPassword,
        });

        res.status(200).json({success: true, message: newUser})


    } catch (error) {
        return res.status(500).json({success: false, message: 'something went wrong!'});
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) res.status(400).json({success: false, message: 'all fields required!'})

        const user = await User.findOne({ email });

        if(!user) res.status(400).json({success: false, message: 'user not found!'});

        const passwordCheck = await bcrypt.compare(password, user.password);

        if(!passwordCheck) res.status(400).json({success: false, message: 'password not matched!'});

        const token = JWT.sign({
            userId: user._id,
            userName: user.userName,
        }, process.env.JWT_KEY, { expiresIn : "24h"})

        res.status(200).json({
            success: true,
            message: 'login success',
            userName: user.userName,
            token,
        })
    } catch (error) {
        return res.status(500).json({success: false, message: 'something went wrong!'});
    } 
}