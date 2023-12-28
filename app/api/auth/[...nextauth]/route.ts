
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcrypt'
import db from '@/lib/db'
import { authOptions } from '@/lib/auth'


const handler = NextAuth(authOptions)

export{handler as GET, handler as POST}