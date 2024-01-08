import React from 'react';
import { Button } from '@/components/ui/button'
import { APIResponse } from '@/constants';
import { getXataClient } from '@/src/xata';
import { currentUser } from '@clerk/nextjs';
import { Heart } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import RefreshBtn from '@/components/RefreshBtn';

const xata = getXataClient();

export default async function SingleTopicQuote({ params: { topic } }: { params: { topic: string } }) {

    const user = await currentUser();

    const singleQuote: APIResponse[] = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${topic}`, {
        headers: {
            "X-Api-Key": process.env.API_SECRET_KEY!
        }
    }).then(res => res.json());

    const addFavQuote = async (e: FormData) => {
        "use server"

        const quote = e.get("quote") as string;
        const author = e.get("author") as string;
        const category = e.get("category") as string;

        const addQuote = await xata.db.FavouriteQuotes.create({
            user_id: user?.id,
            author,
            quote,
            category
        });

        revalidatePath("/favourites");
        redirect("/favourites");
    }

    return (
        <div className='px-3 flex flex-col justify-center space-y-7 items-center'>

            <span className='capitalize text-3xl font-semibold'>Topic: {topic}</span>

            <div className='bg-gradient-to-r from-rose-300 via-fuchsia-400 to-indigo-500 rounded-xl p-10 flex flex-col space-y-3'>
                {singleQuote.map(quote => (
                    <div key={quote.category}>
                        <span className='block mb-2 text-xl'>{quote.quote}</span>
                        <span className='text-end text-lg mb-4'>~ {quote.author}</span>
                        <form action={addFavQuote} className='flex items-center justify-center'>

                            <input type='hidden' name='author' value={quote.author} />
                            <input type='hidden' name='quote' value={quote.quote} />
                            <input type='hidden' name='category' value={quote.category} />

                            <Button variant={"secondary"} className='w-fit mt-2 bg-pink-500'>
                                Add To
                                <Heart className='ml-1' />
                            </Button>
                        </form>
                    </div>
                ))}

            </div>

            <div className='flex gap-x-1'>
                <Link href="/topics">
                    <Button>GO BACK</Button>
                </Link>

                <RefreshBtn />
            </div>
        </div>
    )
}
