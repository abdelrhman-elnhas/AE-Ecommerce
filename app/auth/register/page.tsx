"use client"
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterInput, registerSchema } from "@/app/validators/auth.schema";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import uploadToCloudinary from "@/app/services/uploadToCloudinary";

export default function RegisterPage() {
    const router = useRouter();

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });
    async function onSubmit(data: RegisterInput) {
        const file = data.avatar?.[0];

        const imageUrl = file ? await uploadToCloudinary(file) : "";
        try {
            const res = await fetch("https://api.escuelajs.co/api/v1/users/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    name: data.name,
                    avatar: imageUrl,
                }),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || "Registration failed");
            }

            const loginRes = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (!loginRes?.ok) {
                throw new Error("Auto login failed");
            }

            reset();
            router.push("/profile");
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="flex justify-center items-center min-h-[60vh] py-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center pt-5">Create an Account</CardTitle>
                    <CardDescription className="text-center">Enter your details to register</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <Input {...register('name')} />
                                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <Input placeholder="name@example.com" type="email" {...register('email')} />
                                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                            </div>
                        </div>
                        {/* <div className="space-y-2">
                            <label className="text-sm font-medium">Phone</label>
                            <Input {...register('phone')} />

                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Address</label>
                            <Input placeholder="Landmark, Street, City, Country" type="text" {...register('address')} />
                        </div> */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Avatar</label>
                            <Input
                                type="file"
                                accept="image/*"
                                {...register("avatar")}
                            />
                            {errors.avatar && <p className="text-red-500">{errors.avatar.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input type="password" {...register('password')} />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Confirm Password</label>
                            <Input type="password" {...register('confirmPassword')} />
                            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

                        </div>
                        <Button className="w-full mt-4 cursor-pointer" type="submit" disabled={isSubmitting}>Sign Up</Button>
                    </form>

                    <div className="flex items-center gap-4">
                        <Separator className="flex-1" />
                        <span className="text-muted-foreground text-xs uppercase">Or continue with</span>
                        <Separator className="flex-1" />
                    </div>

                    <Button variant="outline" className="w-full">
                        G Google
                    </Button>
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account? <Link href="/auth/login" className="text-primary hover:underline">Login</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
