"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
type props = {
    onChange: (date: Date) => void;
    label: string;
    defaultDate?: Date;
}
export function DatePicker({ onChange, label, defaultDate }: props) {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(defaultDate)
    return (
        <Field className="max-w-[200px] w-full">
            <FieldLabel htmlFor="date">{label}</FieldLabel>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger render={<Button variant="outline" id="date" className="justify-start font-normal">{date ? date.toLocaleDateString() : "Select date"}</Button>} />
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        defaultMonth={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setDate(date)
                            if (date) {
                                onChange(date)
                            }
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </Field>
    )
}
