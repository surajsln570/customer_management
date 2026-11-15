import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export default function Stats({ header, title }: { header: string, title: string }) {
    return (
        <Card size='sm' className='w-full max-w-1/6'>
            <CardContent>
                <CardHeader>{header}</CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardContent>
        </Card>
    )
}
