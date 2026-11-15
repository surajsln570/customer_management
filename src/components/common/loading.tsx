import React from 'react'

export default function Loading() {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='w-1/10 aspect-square border-[8px] rounded-full border-t-black border-border animate-spin'></div>
        </div>
    )
}
