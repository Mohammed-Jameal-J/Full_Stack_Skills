import prisma from "@/lib/prisma";

import Link from "next/link";

export default async function NewPostPage() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>

    <Link href="/post/new">Home</Link>
      <div>
        <h1>Posts</h1>
        <ul>
          {posts.map((post: any) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>{post.createdAt.toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
