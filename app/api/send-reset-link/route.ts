import { createResetPasswordToken } from "@/lib/auth/reset-token";
import db from "@/lib/db";
import resetPasswordMail from "@/lib/emails/reset-password-mail";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    try {
        const { email } = await req.json()

        if (!email) {
            return new NextResponse('An email is required', { status: 400 })
        }

        const user = await db.user.findFirst({
            where: {
                email
            },
            select: {
                name: true,
                email: true
            }
        })

        if (!user || !user.email) {
            return new NextResponse('No users found with the provided email', { status: 400 })
        }

        const resetLink = createResetPasswordToken(user.email)
        const resetUrl = `https://linkedforgeai.com/reset-password/${resetLink}`

        const data = { resetUrl }

        const userEmail = user.email

        try {
            await resetPasswordMail({
                email: user.email,
                subject: 'Reset Confirmation',
                data
            })
        } catch (error) {
            return new NextResponse('Email could not be sent.', { status: 500 });
        }

        return NextResponse.json({ userEmail })
    } catch (error) {
        console.log('SEND_RESET_LINK_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}