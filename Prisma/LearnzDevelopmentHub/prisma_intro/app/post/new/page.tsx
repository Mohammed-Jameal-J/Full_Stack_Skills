import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
export default function NewPostPage() {

    async function createPost(data: FormData) {
        "use server"
        const title = data.get("title") as string
        const content = data.get("content") as string
        await prisma.post.create({
            data: {
                title,
                content,
            }
        })
        redirect("/post")
    }


    return (
        <form action ={createPost} >
            <input type="text" name="title" placeholder="Title" />
            <textarea name="content" placeholder="Content" />
            <button type="submit">Create Post</button>
        
        </form>
    )
}