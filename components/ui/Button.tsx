import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 ease-in-out',
                    'focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    {
                        'bg-black text-white hover:bg-black/80 shadow-soft hover:shadow-medium hover:-translate-y-0.5':
                            variant === 'primary',
                        'bg-white text-black hover:bg-gray-50 border border-black/10 shadow-sm':
                            variant === 'secondary',
                        'bg-transparent border border-black/20 text-black hover:bg-black/5':
                            variant === 'outline',
                        'text-gray-600 hover:text-black hover:bg-black/5':
                            variant === 'ghost',
                        'px-5 py-2.5 text-sm': size === 'sm',
                        'px-8 py-3.5 text-base': size === 'md',
                        'px-10 py-4 text-lg': size === 'lg',
                    },
                    className
                )}
                {...props}
            >
                {children}
            </button>
        )
    }
)

Button.displayName = 'Button'

export { Button }
