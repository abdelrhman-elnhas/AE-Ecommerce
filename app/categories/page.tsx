
"use client";
import Link from "next/link";
import { useCategories } from "../hooks/useCategories";
import Image from "next/image";
import { Category } from "../types/types";



export default function CategoriesPage() {

    const { data: categories, isPending: isCategoriesPending } = useCategories();
    if (isCategoriesPending) return <p>Loading...</p>
    return (
        <div className="mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Browse Categories</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((cat: Category) => (
                    <Link key={cat.id} href={`/products?categoryId=${cat.id}`} className="group bg-slate-50 dark:bg-slate-900 border rounded-xl p-8 flex flex-col items-center justify-center gap-4 hover:border-primary hover:shadow-lg transition-all">
                        <div className="text-slate-400 group-hover:text-primary transition-colors">
                            <Image src={cat.image} alt={cat.name} width={64} height={64} />
                        </div>
                        <span className="font-semibold text-lg">{cat.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
