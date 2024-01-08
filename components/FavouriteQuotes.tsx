import React from 'react'
import { Button } from './ui/button'
import { HeartCrack, Star } from 'lucide-react';
import { currentUser } from '@clerk/nextjs'
import { getXataClient } from '@/src/xata'
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

const xata = getXataClient();

export default async function FavouriteQuotes() {

    const user = await currentUser();

    const favQuotes = await xata.db.FavouriteQuotes.filter({
        user_id: String(user?.id)
    }).getAll();

    const removeFavQuote = async (e: FormData) => {
        "use server";

        const id = e.get("id");

        const remove = await xata.db.FavouriteQuotes.delete(String(id));
        revalidatePath("/favourites")
    }

    return (
        <div className='ml-auto md:w-[50%] w-full'>
            <div className='flex flex-col space-y-5'>

                <h3 className='text-xl font-semibold'>Your Favourite Quote&apos;s</h3>

                {favQuotes.length === 0 && <div className='flex flex-col items-center'>
                    <div className='my-10 text-center text-gray-500'>
                        <HeartCrack size={100} />
                    </div>

                    <div className='flex flex-col gap-y-1 text-center font-semibold'>
                        <span>No Favouraite Quotes :(</span>
                        <Link className='underline' href="/topics">Visit Some Quotes!</Link>
                    </div>
                </div>}

                <div className='grid gap-y-5 grid-cols-1'>
                    {favQuotes.map(fav => (
                        <div key={fav.id} className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                            <Star className='mb-3' />
                            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{fav.author}</h5>

                            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{fav.quote}</p>

                            <form action={removeFavQuote} className='text-end'>
                                <input type="hidden" name="id" value={fav.id} />
                                <Button variant={"destructive"}>Remove</Button>
                            </form>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}