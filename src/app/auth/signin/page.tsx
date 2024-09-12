"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { signInSchema } from "@/lib/zod";
import LoadingButton from "@/components/loading-button";
import {
    handleCredentialsSignin
} from "@/actions/authActions";
import { useState, useEffect } from "react";
import ErrorMessage from "@/components/error-message";

import { useRouter, useSearchParams } from "next/navigation";
// import { Link } from "lucide-react";

export default function SignIn() {
    const params = useSearchParams();
    const error = params.get("error");
    const router = useRouter();

    const [globalError, setGlobalError] = useState<string>("");

    useEffect(() => {
        if (error) {
            switch (error) {
                case "OAuthAccountNotLinked":
                    setGlobalError(
                        "Please use your email and password to sign in."
                    );
                    break;
                default:
                    setGlobalError(
                        "An unexpected error occurred. Please try again."
                    );
            }
        }
        router.replace("/auth/signin");
    }, [error, router]);

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof signInSchema>) => {
        try {
            const result = await handleCredentialsSignin(values);
            if (result?.message) {
                setGlobalError(result.message);
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="grow flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-gray-800">
                        Welcome Back
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {globalError && <ErrorMessage error={globalError} />}
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email address"
                                                autoComplete="off"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        
                            <LoadingButton
                                pending={form.formState.isSubmitting}
                            >
                                Sign in
                            </LoadingButton>
                        </form>
                        <div className="flex gap-1 items-center justify-center mt-5">
                            Don't have account? <Link href="/auth/signup">
                            <button className="p-2 bg-gray-900 text-sm text-white rounded-md">Sign up</button>
                            
                            </Link>
                        </div>
                    </Form>

                </CardContent>
            </Card>
        </div>
    );
}