import { currentUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { Library, Star, UserRound, ChevronRight } from "lucide-react"
import WrittenQuotes from '@/components/WrittenQuotes';

export default async function UserQuotes() {

    const user = await currentUser();

    return (
        <div className='max-w-5xl mx-auto px-3'>

            <div className='flex space-x-1 font-semibold items-center justify-center mb-8'>
                <Link href='/'>Home</Link>
                <ChevronRight />
                <span>Your Quotes</span>
            </div>

            <div className='flex flex-col justify-center md:flex-row gap-y-10'>

                <div className='md:w-[40%] py-4 w-full flex flex-col space-y-9'>
                    <div className='flex flex-col items-center gap-y-4'>
                        <Image
                            src={user?.imageUrl!}
                            alt="..."
                            height={100}
                            width={100}
                            className='rounded-full' />

                        <h1 className='font-semibold text-lg'>{user?.firstName} {user?.lastName}</h1>
                    </div>

                    <div className='flex flex-col space-y-4'>

                        <Link href="/profile" className='flex rounded-md py-3 px-2 items-center gap-1 hover:bg-gray-200 transition'>
                            <UserRound />
                            <span>Profile</span>
                        </Link>

                        <Link href="/quotes" className='flex rounded-md py-3 px-2 items-center gap-1 hover:bg-gray-200 transition'>
                            <Library />
                            <span>Your Quotes</span>
                        </Link>

                        <Link href="/favourites" className='flex rounded-md py-3 px-2 items-center gap-1 hover:bg-gray-200 transition'>
                            <Star />
                            <span>Favourites</span>
                        </Link>
                    </div>
                </div>

                <WrittenQuotes />

            </div>
        </div>
    )
}