'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import Container from './Container';

export default function DetailsPageHeader({ title, subTitle }: { title: string, subTitle: string }) {
    const router = useRouter();
    return (
        <div className='w-full flex gap-5 items-start justify-start p-5  border-b-1 border-b-gray-300'>
            <Button onClick={() => router.back()} variant={'destructive'}>Back</Button>
            <div>
                <h2 className='text-3xl font-bold'>{title}</h2>
                <p className='text-gray-700'>{subTitle}</p>
            </div>
        </div>
    )
}
