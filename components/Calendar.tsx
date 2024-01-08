"use client";
import React from "react";
import { Calendar } from "@/components/ui/calendar"

export default function CalendarClient() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border" />
    )
}