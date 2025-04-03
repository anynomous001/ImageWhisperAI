import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import React from 'react'

interface HeaderProps {
    label: string
}

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"]
})

const Header = ({ label }: HeaderProps) => {
    return (
        <div
            className='flex flex-col items-center w-full gap-y-4'
        >
            <h1 className={cn("text-3xl font-semibold", font.className)}>
                🔐Auth
            </h1>
            <p className='text-muted-foreground text-sm'>
                {label}
            </p>

        </div >
    )
}

export default Header