"use client";
import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';

export default function RefreshBtn() {

    const router = useRouter();

    return (
        <Button onClick={() => router.refresh()}>New Quote</Button>
    )
}