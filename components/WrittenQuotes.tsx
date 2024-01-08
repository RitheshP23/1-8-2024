import React from 'react'
import { Button } from './ui/button'
import { Quote } from 'lucide-react';
import { currentUser } from '@clerk/nextjs'
import { getXataClient } from '@/src/xata'
import { revalidatePath } from 'next/cache';
import { Frown } from 'lucide-react';
import Link from 'next/link';

const xata = getXataClient();

export default async function WrittenQuotes() {
    const user = await currentUser();

    const quotes = await xata.db.UserQuotes.filter({
        user_id: String(user?.id)
    }).getAll();

    const removeQuote = async (e: FormData) => {
        "use server";

        const id = e.get("id");

        const remove = await xata.db.UserQuotes.delete(String(id));
        revalidatePath("/quotes")
    }

    return (
        <div className='ml-auto md:w-[50%] w-full'>
            <div className='flex flex-col space-y-5'>

                <h3 className='text-xl font-semibold'>Quotes Written By You!</h3>

                {quotes.length === 0 && <div className='flex flex-col items-center'>
                    <div className='my-10 text-center text-gray-500'>
                        <Frown size={100} />
                    </div>

                    <div className='flex flex-col gap-y-1 text-center font-semibold'>
                        <span>You have 0 quotes of your own :(</span>
                        <Link className='underline' href="/profile">Click Here to Write Your First Quote!</Link>
                    </div>
                </div>}

                <div className='grid space-y-5 grid-cols-1'>
                    {quotes.map(quote => (
                        <div key={quote.id} className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                            <Quote className='mb-3' />
                            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{quote.quote_title}</h5>

                            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{quote.quote_content}</p>

                            <form action={removeQuote} className='text-end'>
                                <input type="hidden" name='id' value={quote.id} />
                                <Button variant={"destructive"}>Remove</Button>
                            </form>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}