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
                        'flex w-full rounded-2xl border border-black/10 bg-gray-50/50 px-5 py-4',
                        'text-black placeholder:text-gray-400 font-medium',
                        'focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black/20 focus:bg-white',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        'transition-smooth',
                        error && 'border-red-500 focus:ring-red-500/20',
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
