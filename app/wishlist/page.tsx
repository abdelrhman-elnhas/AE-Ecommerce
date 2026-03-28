"use client"
import Link from "next/link";
import { ProductCard } from "@/app/components/ProductCard";
import { useWishlistStore } from "../store/wishlist";
import { Button } from "../components/ui/button";

export default function WishlistPage() {

    const { wishlist, emptyWishlist } = useWishlistStore();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
                <Button variant={"destructive"} className="hover:cursor-pointer" onClick={() => emptyWishlist()}>Empty Wishlist </Button>
            </div>
            {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlist.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-muted-foreground text-lg mb-4">Your wishlist is empty.</p>
                    <Link href="/products" className="text-primary hover:underline">Start Shopping</Link>
                </div>
            )}
        </div>
    );
}
