"use client"
import { ProductCard } from "@/app/components/ProductCard";
import { Button } from "@/app/components/ui/button";
import { Slider } from "@/app/components/ui/slider";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Separator } from "@/app/components/ui/separator";
import { Category, Product } from "../types/types";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationSection
    from "../components/PaginationSection";


const PRODUCTS_PER_PAGE = 5


export default function ProductsPage() {

    const searchParams = useSearchParams()
    const router = useRouter();

    const page = Number(searchParams.get("page")) || 1
    const categoryId = Number(searchParams.get("categoryId") ?? undefined)
    const title = searchParams.get("title") ?? undefined

    const { data: products, isLoading } = useProducts({
        page,
        categoryId,
        title,
    })


    const { data: categories, isPending: isCategoriesPending } = useCategories();
    if (isCategoriesPending) return <div>Loading...</div>

    if (isLoading) {
        return <p>Loading...</p>
    }



    return (
        <div className="mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 space-y-6 flex-shrink-0">
                    <div>
                        <h3 className="font-bold mb-4">Categories</h3>
                        <div className="space-y-2">
                            {categories?.map((cat: Category) => (
                                <div key={cat.id} className="flex items-center space-x-2">
                                    <Checkbox id={`cat-${cat.id}`} checked={categoryId === cat.id} onCheckedChange={(checked) => {
                                        const params = new URLSearchParams(searchParams.toString());

                                        if (checked) {
                                            params.set("categoryId", String(cat.id));
                                        } else {
                                            params.delete("categoryId");
                                        }

                                        params.set("page", "1");

                                        router.push(`/products?${params.toString()}`);
                                    }} />
                                    <label
                                        htmlFor={`cat-${cat.id}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {cat.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Separator />
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">All Products</h1>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Sort by:</span>
                            <select className="text-sm border rounded p-1">
                                <option>Popularity</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products?.map((product: Product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {
                        products?.length == 0 ? (
                            <div className="mt-8 flex justify-center bg-slate-800 text-center h-[50px]">
                                <p className="text-white m-auto text-xl uppercase">There is no products in this category yet.</p>
                            </div>
                        ) : <div className="mt-8 flex justify-center">
                            <PaginationSection totalPages={PRODUCTS_PER_PAGE} />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
