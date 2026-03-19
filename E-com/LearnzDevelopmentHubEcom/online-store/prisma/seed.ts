import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL || "file:./dev.db",
  }),
});
const categories = [
  { name: "Electronics", slug: "electronics" },
  { name: "Clothing", slug: "clothing" },
  { name: "Books", slug: "books" },
  { name: "Sports", slug: "sports" },
];

async function main() {
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const electronics = await prisma.category.findUnique({
    where: { slug: "electronics" },
  });

  const clothing = await prisma.category.findUnique({
    where: { slug: "clothing" },
  });

  const books = await prisma.category.findUnique({
    where: { slug: "books" },
  });

  const sports = await prisma.category.findUnique({
    where: { slug: "sports" },
  });

  await prisma.product.createMany({
    data: [
      // Electronics
      {
        name: "Wireless Headphones",
        slug: "wireless-headphones",
        description: "Noise cancelling headphones with 30h battery life",
        price: 199,
        image: "https://picsum.photos/seed/1/400/300",
        categoryId: electronics!.id,
      },
      {
        name: "Mechanical Keyboard",
        slug: "mechanical-keyboard",
        description: "RGB mechanical keyboard with custom switches",
        price: 149,
        image: "https://picsum.photos/seed/2/400/300",
        categoryId: electronics!.id,
      },
      {
        name: "4K Webcam",
        slug: "4k-webcam",
        description: "Ultra HD webcam with auto focus and noise reduction",
        price: 129,
        image: "https://picsum.photos/seed/3/400/300",
        categoryId: electronics!.id,
      },
      {
        name: "Wireless Mouse",
        slug: "wireless-mouse",
        description: "Ergonomic wireless mouse with precision tracking",
        price: 49,
        image: "https://picsum.photos/seed/4/400/300",
        categoryId: electronics!.id,
      },
      {
        name: "USB-C Hub",
        slug: "usb-c-hub",
        description: "Multi-port USB-C hub with HDMI and USB 3.0",
        price: 79,
        image: "https://picsum.photos/seed/5/400/300",
        categoryId: electronics!.id,
      },
      // Clothing
      {
        name: "Cotton T-Shirt",
        slug: "cotton-t-shirt",
        description: "100% organic cotton comfortable t-shirt",
        price: 29,
        image: "https://picsum.photos/seed/6/400/300",
        categoryId: clothing!.id,
      },
      {
        name: "Denim Jeans",
        slug: "denim-jeans",
        description: "Classic blue denim jeans with perfect fit",
        price: 79,
        image: "https://picsum.photos/seed/7/400/300",
        categoryId: clothing!.id,
      },
      {
        name: "Hoodie Sweatshirt",
        slug: "hoodie-sweatshirt",
        description: "Cozy hoodie sweatshirt perfect for winter",
        price: 59,
        image: "https://picsum.photos/seed/8/400/300",
        categoryId: clothing!.id,
      },
      {
        name: "Casual Sneakers",
        slug: "casual-sneakers",
        description: "Comfortable casual sneakers for everyday wear",
        price: 89,
        image: "https://picsum.photos/seed/9/400/300",
        categoryId: clothing!.id,
      },
      {
        name: "Wool Jacket",
        slug: "wool-jacket",
        description: "Premium wool jacket for cold weather",
        price: 199,
        image: "https://picsum.photos/seed/10/400/300",
        categoryId: clothing!.id,
      },
      // Books
      {
        name: "The Pragmatic Programmer",
        slug: "pragmatic-programmer",
        description: "Essential guide to becoming a better programmer",
        price: 49,
        image: "https://picsum.photos/seed/11/400/300",
        categoryId: books!.id,
      },
      {
        name: "Clean Code",
        slug: "clean-code",
        description: "A Handbook of Agile Software Craftsmanship",
        price: 45,
        image: "https://picsum.photos/seed/12/400/300",
        categoryId: books!.id,
      },
      {
        name: "The Great Gatsby",
        slug: "great-gatsby",
        description: "Classic American novel by F. Scott Fitzgerald",
        price: 15,
        image: "https://picsum.photos/seed/13/400/300",
        categoryId: books!.id,
      },
      {
        name: "Atomic Habits",
        slug: "atomic-habits",
        description: "Tiny Changes, Remarkable Results by James Clear",
        price: 25,
        image: "https://picsum.photos/seed/14/400/300",
        categoryId: books!.id,
      },
      {
        name: "JavaScript: The Good Parts",
        slug: "js-good-parts",
        description: "Understanding the best parts of JavaScript",
        price: 29,
        image: "https://picsum.photos/seed/15/400/300",
        categoryId: books!.id,
      },
      // Sports
      {
        name: "Professional Basketball",
        slug: "professional-basketball",
        description: "Regulation size indoor/outdoor basketball",
        price: 39,
        image: "https://picsum.photos/seed/16/400/300",
        categoryId: sports!.id,
      },
      {
        name: "Yoga Mat",
        slug: "yoga-mat",
        description: "Non-slip eco-friendly yoga mat",
        price: 35,
        image: "https://picsum.photos/seed/17/400/300",
        categoryId: sports!.id,
      },
      {
        name: "Dumbbells Set",
        slug: "dumbbells-set",
        description: "Adjustable dumbbells set 5-25kg",
        price: 129,
        image: "https://picsum.photos/seed/18/400/300",
        categoryId: sports!.id,
      },
      {
        name: "Running Shoes",
        slug: "running-shoes",
        description: "High performance running shoes with cushioning",
        price: 119,
        image: "https://picsum.photos/seed/19/400/300",
        categoryId: sports!.id,
      },
      {
        name: "Resistance Bands",
        slug: "resistance-bands",
        description: "Set of 5 resistance bands for strength training",
        price: 25,
        image: "https://picsum.photos/seed/20/400/300",
        categoryId: sports!.id,
      },
    ],
  });

  console.log("✓ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
