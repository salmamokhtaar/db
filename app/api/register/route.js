// utils/auth.js
import connect from '@/utils/config/dbConnection';
import User from '@/utils/models/User';
import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        await connect();
        const { name, email, password } = await request.json();
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json(
                {
                    error: "User already has an account"
                }, 
                { status: 400 }
            );
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });

    } catch (error) {
        return NextResponse.json({
            error: error.message,
            success: false
        });
    }
}
