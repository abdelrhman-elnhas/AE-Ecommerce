
"use client"

import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useProducts } from "./hooks/useProducts";
import { useCategories } from "./hooks/useCategories";
import { Category, Product } from "./types/types";


export default function Home() {

  const { data: products, isPending } = useProducts();
  const { data: categories, isPending: isCategoriesPending } = useCategories();
  if (isPending) return <p>Loading...</p>


  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <section>
        <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-center p-8 md:p-12">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-primary font-bold tracking-wide uppercase text-sm">#Big Fashion Sale</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Limited Time Offer on Men's Fashion! <br />
                <span className="text-primary text-2xl md:text-3xl lg:text-4xl">Up to 50% OFF!</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Redefine Your Everyday Style with our premium collection.
              </p>
              <Link href="/products"><Button size="lg" className="rounded-full px-8">Shop Now</Button></Link>
            </div>
            <div className="lg:col-span-7 flex justify-center relative">
              {/* Placeholder for Hero Image */}
              <div className="relative w-full h-75 md:h-100">
                <Image
                  src="https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Fashion Sale"
                  fill={true}
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <SectionHeader title="Popular Categories" actionLink="/categories" />
        <div className="flex flex-wrap justify-between gap-4 md:gap-8">
          {categories?.slice(1, 10).map((cat: Category) => (
            <Link key={cat.id} href={`/products?categoryId=${cat.id}`} className="group flex flex-col items-center gap-2">
              <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden bg-slate-50 dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 group-hover:ring-2 group-hover:ring-primary transition-all">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <h2 className="text-2xl font-bold">Flash Sale</h2>
          </div>

          {/* Timer placeholder */}
          <div className="flex gap-2">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">02</span>
            <span className="text-slate-400">:</span>
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">12</span>
            <span className="text-slate-400">:</span>
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">56</span>
          </div>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {products?.map((product: Product) => (
              <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>

      {/* Today's For You */}
      <section>
        <SectionHeader title="Tobays For You!" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.slice(13, 17).map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Best Selling Store */}
      {/* <section className="mb-8">
        <SectionHeader title="Best Selling Store" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stores.map((store) => (
            <div key={store.id} className="bg-white dark:bg-slate-900 border rounded-xl p-4 flex gap-4 items-center hover:shadow-md transition-shadow">
              <div className="h-16 w-16 relative rounded-full overflow-hidden border">
                <Image src={store.image} alt={store.name} fill className="object-contain p-2" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg">{store.name}</h4>
                <p className="text-sm text-slate-500 italic">"{store.description}"</p>
                <div className="flex gap-2 mt-2">
                  <div className="h-12 w-12 bg-slate-100 rounded-md"></div>
                  <div className="h-12 w-12 bg-slate-100 rounded-md"></div>
                  <div className="h-12 w-12 bg-slate-100 rounded-md"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
}
