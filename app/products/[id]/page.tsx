"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
import { ProductCard } from "@/app/components/ProductCard";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Heart, ShoppingCart, Share2, Star } from "lucide-react";
import { useState } from "react";
import { useSingleProduct } from "@/app/hooks/useSingleProduct";
import { useProducts } from "@/app/hooks/useProducts";
import { Product } from "@/app/types/types";
import { useCartStore } from "@/app/store/cart";
import { useWishlistStore } from "@/app/store/wishlist";
import { copyUrl } from "@/app/utils/copyURL";

export default function ProductDetailsPage() {
    const params = useParams();
    const id = parseInt(params.id as string);
    const { data: products, isPending: isProductsPending } = useProducts();
    const { data: product } = useSingleProduct(id);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCartStore();
    const { wishlist, toggleAddToWishlist } = useWishlistStore();
    const isInWishlist = wishlist.some(item => item.id === product.id);


    // Mock gallery
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden relative border">
                        <img src={product?.images[selectedImage]} alt={product?.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {product?.images.map((img: string, idx: number) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`w-20 h-20 flex-shrink-0 bg-slate-50 border rounded-lg overflow-hidden ${selectedImage === idx ? 'border-primary ring-2 ring-primary/20' : 'border-transparent'}`}
                            >
                                <img src={img} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{product?.title}</h1>
                        <div className="prose dark:prose-invert max-w-none">
                            <p>
                                {product?.description}
                            </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            {/* <span className="text-green-600 font-medium">{product?.sold} Sold</span> */}
                        </div>
                    </div>

                    <div className="flex items-end gap-3">
                        <span className="text-4xl font-bold text-primary">{product?.price.toLocaleString('id-ID')}$</span>
                        {product?.originalPrice && (
                            <span className="text-xl text-muted-foreground line-through mb-1">{product?.originalPrice.toLocaleString('id-ID')}$</span>
                        )}
                        {product?.discount && (
                            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded mb-2">{product?.discount}</span>
                        )}
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <span className="font-bold block">Quantity</span>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 border-r transition-colors"
                                >
                                    -
                                </button>
                                <span className="px-6 py-2 font-medium min-w-[3.5rem] text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 border-l transition-colors"
                                >
                                    +
                                </button>
                            </div>

                        </div>
                    </div>


                    {/* <div className="space-y-4">
                        <div>
                            <span className="font-bold block mb-2">Color</span>
                            <div className="flex gap-2">
                                <button className="w-8 h-8 rounded-full bg-slate-900 ring-2 ring-offset-2 ring-primary"></button>
                                <button className="w-8 h-8 rounded-full bg-slate-500"></button>
                                <button className="w-8 h-8 rounded-full bg-blue-700"></button>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold block mb-2">Size</span>
                            <div className="flex gap-2">
                                <Button variant="outline" className="w-10 h-10 p-0">S</Button>
                                <Button variant="outline" className="w-10 h-10 p-0 border-primary bg-primary/5">M</Button>
                                <Button variant="outline" className="w-10 h-10 p-0">L</Button>
                                <Button variant="outline" className="w-10 h-10 p-0">XL</Button>
                            </div>
                        </div>
                    </div> */}

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button className="flex-1 h-12 text-base hover:cursor-pointer" size="lg" onClick={() => addToCart(product, quantity)}> <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart</Button>
                        <Button variant="outline" className="flex-1 h-12 text-base hover:cursor-pointer" size="lg" onClick={() => toggleAddToWishlist(product)}>
                            {isInWishlist ? <Heart className="h-4 w-4" fill="red" /> : <Heart className="h-4 w-4" />}
                            {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                        </Button>
                    </div>

                    <Button variant="outline" className="hover:cursor-pointer w-full h-12">
                        <div className="flex items-center gap-2">
                            <Share2 className="h-4 w-4" />
                            <span className="text-md" onClick={copyUrl}>Copy product link to clipboard</span>
                        </div>
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            {/* <div className="mt-16 w-[50%]">
                <Tabs defaultValue="description">
                    <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                        <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none px-6 py-3">Description</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="pt-6">
                        <div className="prose dark:prose-invert max-w-none">
                            <p>
                                Experience the ultimate comfort and style with the {product?.title}. Crafted from premium materials, this item is designed to last and keep you looking great.
                                Perfect for any occasion, whether casual or formal.
                            </p>
                            <ul>
                                <li>Premium quality material</li>
                                <li>Durable stitching</li>
                                <li>Modern fit</li>
                                <li>Easy care</li>
                            </ul>
                        </div>
                    </TabsContent>
                    <TabsContent value="reviews" className="pt-6">
                        <p className="text-muted-foreground">Reviews content placeholder...</p>
                    </TabsContent>
                </Tabs>
            </div> */}

            {/* Related Products */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Related Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products?.slice(0, 4).map((p: Product) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </div>
    );
}
