import prisma from "@/lib/prisma";
import Link from "next/link";


export default async function TweetPage() {
    const tweets = await prisma.tweet.findMany({
        include: {
            author: true,
            comments:{
                select: {
                    id: true
                }
            }},
        orderBy: {createdAt: "desc"}
        }
    )

    return(
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Tweets</h1>
               <Link href="/tweet/new" className="inline-block mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">Create New Tweet</Link> 
               {tweets.map((tweet: any) => (
                <div key={tweet.id} className="bg-white p-4 rounded shadow mb-4"> 
                <h2>{tweet.content}</h2>
                <p>By {tweet.author?.name} . {tweet.comments.length} comments</p>
                <Link href={`/tweet/${tweet.id}`} className="text-blue-500 hover:underline">
                    View
                </Link>
                </div>              
               ))}    
            </div>
        </div>

    )
}
