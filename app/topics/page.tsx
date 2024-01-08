import { topics } from '@/constants'
import Link from 'next/link'
import React from 'react'

export default function Topics() {
    return (
        <div className='container mx-auto px-3'>
            <div className='bg-gradient-to-tl from-slate-300 via-black to-zinc-900 bg-clip-text text-transparent text-center'>
                <h4 className='text-3xl font-semibold'>Quote Topics</h4>
                <div className='max-w-lg text-center mx-auto mt-3'>
                    <span className='leading-7 tracking-wider'>Looking for a quote from your favorite topic? Our quote collections are organized by topic to help you find the perfect quote. Enjoy quotes on popular topics like: Love, Life, Friendship, Success, Wisdom.</span>
                </div>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 place-items-center mt-9 space-y-2'>
                {topics.map(topic => (
                    <Link
                        key={topic}
                        href={`/topics/${topic}`}
                        className='capitalize hover:underline transition hover:opacity-60'>
                        {topic}
                    </Link>
                ))}
            </div>
        </div>
    )
}
