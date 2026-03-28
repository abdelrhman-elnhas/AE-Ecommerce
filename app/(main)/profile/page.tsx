"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Package, LogOut } from "lucide-react";
import { getSession, signOut, useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileInput, profileSchema } from "../../validators/auth.schema";

function ProfileContent() {
    const session = useSession();
    const user = session?.data?.user;
    const [isEditing, setIsEditing] = useState(true);
    const searchParams = useSearchParams();
    const requiredTab = searchParams.get("tab");
    const [tab, setTab] = useState(requiredTab || "profile");
    const { update } = useSession();



    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            password: "",
        },
    });
    useEffect(() => {
        if (user) {
            reset({
                name: user.name ?? "",
                email: user.email ?? "",
                password: "",
            });
        }
    }, [user, reset]);

    const onSubmit = async (data: ProfileInput) => {
        const payload = {
            name: data.name,
            email: data.email,
            ...(data.password && { password: data.password }),
        };

        const res = await fetch(`https://api.escuelajs.co/api/v1/users/${user?.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        const result = await res.json();
        console.log(result);
        setIsEditing(true);
        await update({
            user: {
                name: data.name,
                email: data.email,
                image: data.avatar,
            },
        });
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar */}
                <aside className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                        <Avatar className="h-16 w-16 p-2 border-2 border-muted">
                            {user?.image && <AvatarImage src={user.image} className="object-contain" />}
                            <AvatarFallback>AE</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-bold">{user?.name}</h3>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label htmlFor="profilePhoto" className="text-xs text-blue-500 cursor-pointer hover:text-blue-700">Edit Profile Photo</label>
                                {/* <input type="file" name="" id="profilePhoto" className="hidden" /> */}
                                <Input type="file" accept="image/*" id="profilePhoto" className="hidden"
                                    {...register("avatar")}
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            console.log(e.target.files[0]);
                                            handleSubmit(onSubmit)();
                                        }
                                    }} />
                            </form>
                            {/* <p className="text-sm text-muted-foreground">Gold Member</p> */}
                        </div>
                    </div>

                    <nav className="space-y-2">
                        <Button variant="ghost" className={`w-full justify-start gap-3 ${tab === "profile" ? "bg-muted" : ""}`} onClick={() => setTab("profile")}>
                            <User className="h-4 w-4" /> Personal Info
                        </Button>
                        <Button variant="ghost" className={`w-full justify-start gap-3 ${tab === "orders" ? "bg-muted" : ""}`} onClick={() => setTab("orders")}>
                            <Package className="h-4 w-4" /> My Orders
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => signOut({ callbackUrl: '/auth/login' })}>
                            <LogOut className="h-4 w-4" /> Logout
                        </Button>
                    </nav>
                </aside>

                {/* Content */}
                <div className="md:col-span-3">
                    <h1 className="text-2xl font-bold mb-6">{tab === "profile" ? "Personal Information" : "My Orders"}</h1>
                    <Card >
                        <CardHeader className="pt-6">
                            <CardTitle>{isEditing ? "Edit Profile" : "Profile"}</CardTitle>
                            {isEditing ? (
                                <CardDescription>Update your personal details here.</CardDescription>
                            ) : (
                                <CardDescription>View your personal details here.</CardDescription>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {tab === "profile" ? (
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">First Name</label>
                                            <Input {...register("name")} type="text" disabled={isEditing} />
                                            {errors.name && (
                                                <p className="text-xs text-red-500">{errors.name.message}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Email</label>
                                            <Input {...register("email")} type="email" disabled={isEditing} />
                                            {errors.email && (
                                                <p className="text-xs text-red-500">{errors.email.message}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Password</label>
                                            <Input {...register("password")} placeholder="Update Your Password" type="password" disabled={isEditing} />
                                            {errors.password && (
                                                <p className="text-xs text-red-500">{errors.password.message}</p>
                                            )}
                                        </div>

                                    </div>

                                    {/* <div className="space-y-2">
                                <label className="text-sm font-medium">Phone Number</label>
                                {session?.user?.phone ? <Input defaultValue={session.user.phone} /> : <Input placeholder="Enter Your Phone Number" />}
                            </div> */}

                                    <div className="pt-4 flex justify-end">
                                        {isEditing && <Button onClick={() => setIsEditing(false)}>Edit Profile</Button>}
                                        {!isEditing && <Button type="submit" disabled={isSubmitting}>Save Changes</Button>}
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-4">
                                    {[1, 2, 3].map((orderId) => (
                                        <div key={orderId} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-muted p-2 rounded-lg">
                                                    <Package className="h-6 w-6 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm">Order #ORD-100{orderId}</p>
                                                    <p className="text-xs text-muted-foreground">December {10 + orderId}, 2025</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-sm">${249.00 + (orderId * 2)}</p>
                                                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                                                    Delivered
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                            }
                        </CardContent>
                    </Card>
                </div >
            </div >
        </div >
    );
}

export default function ProfilePage() {  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileContent />
    </Suspense>
  )
}