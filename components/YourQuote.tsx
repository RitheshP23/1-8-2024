import React from 'react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { currentUser } from '@clerk/nextjs'
import { getXataClient } from '@/src/xata'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const xata = getXataClient();

export default async function YourQuote() {
    const user = await currentUser();

    const addQuote = async (e: FormData) => {
        "use server";

        const quote_title = e.get("quote_title") as string;
        const quote_content = e.get("quote_content") as string;

        const createQuote = await xata.db.UserQuotes.create({
            user_id: user?.id,
            quote_content,
            quote_title
        });

        revalidatePath("/quotes");
        redirect("/quotes");
    }

    return (
        <div className='ml-auto md:w-[50%] w-full'>
            <form action={addQuote} className='flex flex-col space-y-5'>

                <h3 className='text-xl font-semibold'>Add Your Quote</h3>

                <div className='flex flex-col'>
                    <Label className='mb-2'>Quote Title:</Label>
                    <Input name="quote_title" className='bg-gray-300' />
                </div>

                <div className='flex flex-col'>
                    <Label className='mb-2'>Your Quote</Label>
                    <Textarea name="quote_content" className='bg-gray-300' />
                </div>

                <Button type='submit'>Add Quote</Button>

            </form>
        </div>
    )
}