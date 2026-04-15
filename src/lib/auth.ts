import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from './db'

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) { if (!credentials) return null;
        if (credentials.password === process.env.UNIVERSAL_PASSWORD) {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          })
          return user || null
        }
        return null
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        const sessionUser = session.user as any; sessionUser.id = user.id
      }
      return session
    },
  },
})
