import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


async function createTweet(data: FormData) {
    "use server"
    const content = data.get("content") as string;
    const authorId = parseInt(data.get("authorId") as string);

    await prisma.tweet.create({
        data: {
            content,
            authorId
        }
    })
    revalidatePath("/tweet");
    redirect("/tweet");
}

export default function NewTweetPage() {
    return(
        <div className="min-h-screen bg-gray-100 p-6">
            <form action={createTweet} className="space-y-4">
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        rows={4}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="What's happening?"
                    />
                </div>
                <div>
                    <label htmlFor="authorId" className="block text-sm font-medium text-gray-700">
                        Author ID
                    </label>
                    <input
                        type="number"
                        id="authorId"
                        name="authorId"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Create Tweet
                </button>
            </form>
        </div>
    )
}

            