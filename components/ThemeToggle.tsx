'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <button className="p-2 rounded-full bg-secondary-light dark:bg-secondary-dark">
                <div className="w-5 h-5" />
            </button>
        )
    }

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-secondary-light dark:bg-secondary-dark hover:bg-secondary-dark dark:hover:bg-secondary-light transition-smooth group"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-primary-main group-hover:rotate-180 transition-transform duration-500" />
            ) : (
                <Moon className="w-5 h-5 text-primary-main group-hover:-rotate-180 transition-transform duration-500" />
            )}
        </button>
    )
}
