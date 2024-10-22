// utils/auth.js
import connect from '@/utils/config/dbConnection';
import User from '@/utils/models/User.js';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

async function createUser(email, password, name) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        email,
        password: hashedPassword,
        name,
    });

    return await newUser.save();
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "you@example.com" },
                password: { label: "Password", type: "password" },
                name: { label: "Name", type: "text", placeholder: "Your Name" },
                isRegistering: { label: "Registering", type: "hidden" }
            },
            async authorize(credentials) {
                const { email, password, name, isRegistering } = credentials;
                try {
                    await connect();
                    let user = await User.findOne({ email });

                    if (isRegistering) {
                        if (user) {
                            throw new Error("User is already registered");
                        }
                        user = await createUser(email, password, name);
                    } else {
                        if (!user) {
                            return null; // User not found
                        }
                        const passwordMatch = await bcrypt.compare(password, user.password);
                        if (!passwordMatch) {
                            return null; // Password does not match
                        }
                    }

                    return user;

                } catch (error) {
                    console.log("Error at api/nextauth:", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async signIn({ user, account }) {
            // No additional logic needed here
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id.toString();
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            session.user._id = token._id;
            session.user.email = token.email;
            session.user.name = token.name;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/"
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
