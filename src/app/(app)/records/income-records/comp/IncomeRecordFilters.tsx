'use client'
import Button from '@/components/Button';
import { DatePicker } from '@/components/common/DatePicker'
import Section from '@/components/common/Section';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ApiResponse } from '@/types';
import React, { useEffect, useState } from 'react'
interface Records {
    totalIncome: number;
    totalExpense: number;
    totalIncomeReceived: number;
    netEarningReceived: number;
}
export default function IncomeRecordFilters() {
    const date = new Date;

    const [startDate, setStartDate] = useState<Date>(getFirstDate(date));
    const [endDate, setEndDate] = useState<Date>(date);
    const [records, setRecords] = useState<Records>({ totalExpense: 0, totalIncome: 0, totalIncomeReceived: 0, netEarningReceived: 0 })
    const loadRecords = async () => {
        const params = new URLSearchParams({
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
        })
        try {
            const res = await fetch(`/api/records/income-records?${params}`, {
                method: 'GET'
            })
            const result: ApiResponse<Records> = await res.json();
            setRecords(result.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        loadRecords();
    }, [])
    return (
        <div>
            <div className='flex gap-5 items-end'>
                <DatePicker defaultDate={startDate} label='Start Date' onChange={(value) => { setStartDate(value) }} />
                <DatePicker defaultDate={endDate} label='End Date' onChange={(value) => { setEndDate(value) }} />
                <Button onClick={() => loadRecords()} size='sm' variant='primary'>View Records</Button>
            </div>
            <Section>
                <div className='grid grid-cols-4 gap-5'>
                    {
                        Object.entries(records).map(([key, value]) => {
                            return <Card size='sm' key={key}>
                                <CardHeader>{getFormatText(key)}</CardHeader>
                                <CardContent>{value}</CardContent>
                            </Card>
                        })
                    }
                </div>
            </Section>
        </div>
    )
}

const getFormatText = (text: string): string => {
    const upperCaseLetters: string[] = getUpperCase(text);
    let formattedText: string = '';
    upperCaseLetters.map((letter, i) => {
        if (formattedText == '') {
            formattedText = text.replace(letter, ` ${letter}`)
        } else {
            formattedText = formattedText.replace(letter, ` ${letter}`)
        }
    })
    formattedText = formattedText.charAt(0).toUpperCase() + formattedText.slice(1)
    return formattedText;
}

const getUpperCase = (text: string): string[] => {
    const upperCaseLetters: string[] = [];
    for (let i = 0; i < text.length; i++) {
        const letter = text.charAt(i)
        if (letter === letter.toUpperCase()) {
            upperCaseLetters.push(letter)
        }
    }
    return upperCaseLetters;
}
const getFirstDate = (date: Date): Date => {
    date.setDate(1)
    return date
}

