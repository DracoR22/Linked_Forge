import db from '@/lib/db'
import { NextResponse } from 'next/server'
import { createActivationToken } from '@/lib/auth/activation-token'
import sendMail from '@/lib/emails/nodemailer'

export async function POST(req: Request) {
   try {
    const { email, name, hashedPassword } = await req.json()

    if(!email || !name || !hashedPassword) {
        return new NextResponse('Missing Info', { status: 400 })
    }

    const existingUser = await db.user.findUnique({
        where: {
            email,
        },
        select: {
            email: true
        }
    });

    if(existingUser) {
        return new NextResponse('Email is already taken', { status: 401 });
    }

    const user = { name, email, hashedPassword}

    const activationToken = createActivationToken(user)
    const activationCode = activationToken.activationCode

    const data = { name, activationCode }

    try {
        await sendMail({
            email: user.email,
            subject: 'Activate your account',
            data
        })
    } catch (error) {
        return new NextResponse('Email could not be sent.', { status: 500 });
    }

    return NextResponse.json({ activationToken: activationToken.token })
   } catch (error) {
    console.log('REGISTER_ERROR', error)
    return new NextResponse('Internal Error', { status: 500 })
   }
}