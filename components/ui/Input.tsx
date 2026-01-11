import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, type, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    className={cn(
                        'flex w-full rounded-md border border-border-light bg-white dark:bg-gray-900 px-4 py-3',
                        'text-text-primary placeholder:text-text-muted',
                        'focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        'transition-smooth',
                        error && 'border-accent-main focus:ring-accent-main',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-accent-main">{error}</p>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input'

export { Input }
