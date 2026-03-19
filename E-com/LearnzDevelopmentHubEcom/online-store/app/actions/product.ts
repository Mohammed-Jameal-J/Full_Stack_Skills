"use server";

import prisma from "@/lib/prisma";
import { ProductQuerySchema } from "@/lib/validators/product";
export async function getProducts(params: {
  cursor?: number;
  limit?: number;
  categorySlug?: string;
}) {
  const { cursor, limit, categorySlug } = ProductQuerySchema.parse(params);

  const where = categorySlug ? { category: { slug: categorySlug } } : {};

  const products = await prisma.product.findMany({
    take: limit + 1,

    ...(cursor && {
      skip: 1,
      cursor: { id: cursor },
    }),

    where,

    include: {
      category: {
        select: {id: true, name: true, slug: true },
      },
    },

    orderBy: { id: "asc" },
  });

  let nextCursor: number | undefined;

  if (products.length > limit) {
    const extra = products.pop();

    nextCursor = extra!.id;
  }

  return { products, nextCursor };
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },

    select: {
      id: true,
      name: true,
      slug: true,
    },
  });
}
