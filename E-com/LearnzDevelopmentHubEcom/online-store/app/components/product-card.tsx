"use client";

import Image from "next/image";

export default function ProductCard({ product }: any) {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
      <figure className="relative h-48 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover hover:scale-110 transition-transform duration-300"
        />
      </figure>

      <div className="card-body">
        <div className="badge badge-primary badge-outline">
          {product.category.name}
        </div>

        <h2 className="card-title text-lg line-clamp-2">{product.name}</h2>

        <p className="text-sm text-base-content/70 line-clamp-2">
          {product.description}
        </p>

        <div className="card-actions justify-between items-center pt-4">
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>

          <button className="btn btn-primary btn-sm">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
