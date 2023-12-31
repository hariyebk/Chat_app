import bcrypt  from "bcrypt"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from "@/libs/prismadb"

// O-AUTH Credentials
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        Github({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET
        }),
        Google({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        }),
        // Email and password Logins other than socail logins.
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "email", type: "text"},
                password: {label: "password", type: "text"}
            },
            async authorize(credentials){
                // If the user didn't provide the credentials.
                if(!credentials?.email || !credentials.password) throw new Error("Missing info")
                const user = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                // If the user is not Registered
                if(!user || !user.hashedPassword) throw new Error("User not found")
                // check if the password is correct.
                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.hashedPassword)
                if(!isPasswordCorrect) throw new Error("Inavlid Email or Password")
                return user
            }
        })
    ],
    callbacks: {
        // fixing a bug in nextauth, session.user doesn't have the property id.
        async session({session, user}: any){
            if(session && user){
                session.user.id = user.id
            }
            return session
        }
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt"
    },
    secret: process.env.AUTH_SECRET,
}

const handlers = NextAuth(authOptions)

export { handlers as GET, handlers as POST };