import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { User } from "@prisma/client";
import db from "@/lib/db";
import bcrypt from "bcrypt"

export async function POST (req: Request) {
  try {
    const { activation_token, activation_code } = await req.json()

    const newUser: { user: User; activationCode: string } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
    )  as { user: User; activationCode: string}

    if(newUser.activationCode !== activation_code) {
        return new NextResponse('Invalid activation code', { status: 400 });
    }

    const { userName, email, hashedPassword } = newUser.user

    if (!email || !hashedPassword) {
        return new NextResponse('Email is required', { status: 400 });
    }

    const existingUser = await db.user.findUnique({
        where: {
            email,
        },
    });

    if(existingUser) {
        return new NextResponse('Email is already taken', { status: 401 });
    }

    const hashPassword = await bcrypt.hash(hashedPassword, 12)

    const user = await db.user.create({
     data: {
        userName,
        email,
        hashedPassword: hashPassword
     }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log('ACTIVATION_ERROR', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}