import { NextResponse } from "next/server"
import jwt, { Secret } from "jsonwebtoken"
import db from "@/lib/db"
import bcrypt from "bcrypt"

export async function PATCH (req: Request) {
    try {
        const { newPassword, confirmPassword, resetLink } = await req.json()

        if (!newPassword || !confirmPassword) {
            return new NextResponse('Provide a new password and a confirmation', { status: 400 })
        }

        if (newPassword !== confirmPassword) {
            return new NextResponse('Passwords do not match', { status: 400 })
        }
        try {
            const decodedToken = jwt.verify(resetLink, process.env.RESET_PASSWORD_SECRET as Secret) as { email: string, exp: number };
            
            // Get the current time (in seconds)
            const currentTime = Math.floor(Date.now() / 1000);
          
            // Check if the token has expired
            if (currentTime > decodedToken.exp) {
              return new NextResponse('Token expired', { status: 400 });
            }
          
            // If not expired, proceed with other logic
            const { email } = decodedToken;
            
            // Your logic here...
            const hashedPassword = await bcrypt.hash(newPassword, 12)

           await db.user.update({
            where: {
              email
            },
            data: {
                hashedPassword
            }
         })
            
          } catch (error: any) {
            if (error.name === 'TokenExpiredError') {
              return new NextResponse('Token expired', { status: 400 });
            } else {
              return new NextResponse('Token invalid', { status: 400 });
            }
          }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.log('RESET_PASSWORD_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}