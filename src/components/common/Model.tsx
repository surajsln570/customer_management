import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog'


export default function Model({ children, open, size = 'md', title, onClose }: { children: React.ReactNode, open: boolean, title: string, size?: 'sm' | 'md' | 'lg', onClose: () => void }) {
    const SizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg'
    }
    return (
        <Dialog onOpenChange={(isOpen) => !isOpen && onClose()} open={open}>
            <DialogContent className={SizeClasses[size]}>
                <DialogHeader>{title}</DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
        // <div className='fixed left-0 top-0 flex justify-center items-center  z-50 h-screen w-screen bg-black/25'>
        //     <div className={cn(' bg-white overflow-y-auto z-60 p-5 rounded-lg relative', size == 'sm' ? 'max-h-[90vh] w-[30vw]' : size == 'md' ? ' max-h-[90vh] w-[40vw]' : 'max-h-[90vh] w-[80vw]')}>
        //         <Button className={'absolute right-5 top-5'} onClick={onClose} children={'Close'} variant='destructive' />
        //         <h2 className='text-center text-4xl font-bold'>{title}</h2>
        //         <div className='pt-10'>
        //             {children}

        //         </div>
        //     </div>
        // </div>
    )
}
