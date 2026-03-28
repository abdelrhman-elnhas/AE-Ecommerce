"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SignInWithGoogle from "@/components/SignInWithGoogle";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { LoginInput, loginSchema } from "@/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";


export default function LoginPage() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });
    async function onSubmit(data: LoginInput) {
        const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            callbackUrl: "/profile",
        });

        if (!res?.ok) {
            console.error(res?.error);
        }
        reset();
    };

    return (
        <div className="flex justify-center items-center min-h-[60vh] py-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center pt-5">Login to AE Store</CardTitle>
                    <CardDescription className="text-center">Enter your email and password to login</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input {...register('email')} placeholder="name@example.com" />
                            {
                                errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                                )
                            }
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">Password</label>
                                {/* <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link> */}
                            </div>
                            <Input {...register('password')} type="password" />
                            {
                                errors.password && (
                                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                                )
                            }
                        </div>
                        <Button className="w-full mt-4" type="submit" disabled={isSubmitting}>Sign In</Button>
                    </form>

                    <div className="flex items-center gap-4">
                        <Separator className="flex-1" />
                        <span className="text-muted-foreground text-xs uppercase">Or continue with</span>
                        <Separator className="flex-1" />
                    </div>

                    <SignInWithGoogle />
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-sm text-muted-foreground">
                        Don't have an account? <Link href="/auth/register" className="text-primary hover:underline">Sign Up</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
