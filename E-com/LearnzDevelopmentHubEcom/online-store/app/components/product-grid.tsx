"use client";

import { useEffect, useRef, useState, useTransition } from "react";

import { getProducts } from "@/app/actions/product";

import ProductCard from "./product-card";

import CategoryFilter from "./category-filter";

const LIMIT = 12;

export default function ProductGrid({
  initialProducts,
  initialCursor,
  categories,
}: any) {
  const [products, setProducts] = useState(initialProducts);

  const [cursor, setCursor] = useState(initialCursor);

  const [activeCategory, setActiveCategory] = useState();

  const [isPending, startTransition] = useTransition();

  const loaderRef = useRef(null);

  async function loadMore() {
    if (!cursor) return;

    startTransition(async () => {
      const { products: newProducts, nextCursor } = await getProducts({
        cursor,
        limit: LIMIT,
        categorySlug: activeCategory,
      });

      setProducts((prev: any) => [...prev, ...newProducts]);

      setCursor(nextCursor);
    });
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [cursor]);

  return (
    <section>
      <CategoryFilter
        categories={categories}
        activeSlug={activeCategory}
        onSelect={setActiveCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div ref={loaderRef} className="py-10 flex justify-center">
        {isPending && <span className="loading loading-spinner"></span>}
      </div>
    </section>
  );
}
