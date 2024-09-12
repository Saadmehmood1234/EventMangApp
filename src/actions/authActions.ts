"use server";

import { signIn, signOut } from "@/auth";
import { signUpSchema } from "@/lib/zod";
import { AuthError } from "next-auth";
import {MyEventUser, Account} from "@/model/User";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import connectToMongoDb from "@/utils/dbConnect";

export async function handleCredentialsSignin({ email, password }: {
    email: string,
    password: string
}) {
    try {
        await signIn("credentials", { email, password, redirectTo: "/" });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        message: 'Invalid credentials',
                    };
                default:
                    return {
                        message: 'Something went wrong.',
                    };
            }
        }
        throw error;
    }
}

export async function handleGithubSignin() {
    await signIn("github", { redirectTo: "/" });
}

export async function handleSignOut() {
    await signOut();
}

export async function handleSignUp({ name, email, password, confirmPassword }: {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}) {
   await connectToMongoDb();
   console.log(name)
    try {
        const parsedCredentials = signUpSchema.safeParse({ name, email, password, confirmPassword });
        if (!parsedCredentials.success) {
            return { success: false, message: "Invalid data." };
        }

        // Check if the email is already taken
        const existingUser = await MyEventUser.findOne({ email });

        if (existingUser) {
            return { success: false, message: "Email already exists. Login to continue." };
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create a new user in MongoDB
        const newUser = new MyEventUser({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return { success: true, message: "Account created successfully." };
    } catch (error) {
        console.error("Error creating account:", error);
        return { success: false, message: "An unexpected error occurred. Please try again." };
    }
}
