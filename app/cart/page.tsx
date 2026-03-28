"use client"
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Separator } from "@/app/components/ui/separator";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCartStore } from "../store/cart";
import { useState } from "react";

export default function CartPage() {
    const { cart, deleteFromCart, updateQuantity } = useCartStore();
    const [quantity, setQuantity] = useState(1);


    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item, idx) => (
                        <div key={idx} className="flex gap-4 p-4 border rounded-xl bg-white dark:bg-slate-900">
                            <div className="h-24 w-24 bg-slate-100 rounded-md overflow-hidden flex-shrink-0">
                                <img src={item.images?.[0]} alt={item.title} className="w-full h-full object-cover mix-blend-multiply" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                                        <p className="text-sm text-slate-500">Variant: Default</p>
                                    </div>
                                    <button className="text-red-500 hover:text-red-600" onClick={() => deleteFromCart(item.id)}>
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="flex justify-between items-end">
                                    <span className="font-bold text-lg">{item.price.toLocaleString('id-ID')}$</span>
                                    <div className="flex items-center border rounded-lg overflow-hidden">
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.id, Math.max(1, item.quantity - 1))
                                            }
                                            className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 border-r transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="px-6 py-2 font-medium min-w-[3.5rem] text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 border-l transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl h-fit space-y-6">
                    <h3 className="text-xl font-bold">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="font-medium">{(cart.reduce((acc, item) => acc + item.price, 0)).toLocaleString('id-ID')}$</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Shipping</span>
                            <span className="font-medium">20$</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Tax</span>
                            <span className="font-medium">5$</span>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-primary">{(cart.reduce((acc, item) => acc + item.price, 0) + 25000).toLocaleString('id-ID')}$ </span>
                    </div>

                    <Button className="w-full h-12 text-base">Checkout Now</Button>
                </div>
            </div>
        </div>
    );
}
