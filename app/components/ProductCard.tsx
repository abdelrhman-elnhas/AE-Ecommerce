import Link from "next/link";
import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/app/components/ui/card";
import { Product } from "../types/types";
import { useCartStore } from "../store/cart";
import { useWishlistStore } from "../store/wishlist";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {

    const { addToCart } = useCartStore();
    const { wishlist, toggleAddToWishlist } = useWishlistStore();

    const isInWishlist = wishlist.some(item => item.id === product.id);



    return (
        <Card className="group h-[450px] overflow-hidden relative border-none shadow-sm hover:shadow-md transition-shadow mb-1">

            <CardContent className="p-0 relative bg-muted/20 aspect-square">
                <Link href={`/products/${product.id}`}>
                    <img
                        src={product.images?.[0]}
                        alt={product.title}
                        className="w-full h-[280px] object-cover mix-blend-multiply group-hover:scale-102 transition-transform duration-300"
                    />
                </Link>
                <button className="absolute top-2 left-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 hover:cursor-pointer " onClick={() => toggleAddToWishlist(product)}>
                    {isInWishlist ? <Heart className="h-4 w-4" fill="red" /> : <Heart className="h-4 w-4" />}
                </button>
            </CardContent>

            <CardFooter className="flex flex-col items-start gap-1 p-3 pt-0">
                <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors line-clamp-2 text-sm font-medium h-10">
                    {product.title}
                </Link>
                <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-base">
                        {product.price.toLocaleString('id-ID')}$
                    </span>
                    {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                            {product.originalPrice.toLocaleString('id-ID')}$
                        </span>
                    )}
                </div>
                <button onClick={() => addToCart(product)} className="w-full mt-2 bg-primary text-primary-foreground py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer   ">
                    Add to Cart
                </button>
            </CardFooter>
        </Card >
    );
}
