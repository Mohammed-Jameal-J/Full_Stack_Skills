import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/app/components/product-card";
import { getProducts, getCategories } from "@/app/actions/product";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; cursor?: string }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const resolvedParams = await searchParams;
  const { category, cursor } = resolvedParams;

  const [categories, productsData] = await Promise.all([
    getCategories(),
    getProducts({
      categorySlug: category,
      cursor: cursor ? parseInt(cursor) : undefined,
      limit: 12,
    }),
  ]);

  const { products, nextCursor } = productsData;

  return (
    <div className="min-h-screen bg-base-100">
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-2 text-base-content">
            shop the best then ever shop
          </h1>
          <p className="text-base-content/60">Browse our amazing collection</p>
        </div>

        {/* Category Filter */}
        <div className="mb-10 flex gap-2 flex-wrap">
          <Link
            href="/"
            className={`badge badge-lg gap-2 ${
              !category ? "badge-primary badge-lg" : "badge-outline"
            }`}
          >
            All Categories
          </Link>
          {categories.map((cat: any) => (
            <Link
              key={cat.slug}
              href={`/?category=${cat.slug}`}
              className={`badge badge-lg gap-2 ${
                category === cat.slug ? "badge-primary" : "badge-outline"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="alert">
            <span>No products found in this category</span>
          </div>
        )}

        {/* Load More Button */}
        {nextCursor && (
          <div className="flex justify-center">
            <Link
              href={`/?${category ? `category=${category}&` : ""}cursor=${nextCursor}`}
              className="btn btn-primary btn-lg"
            >
              Load More Products
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
