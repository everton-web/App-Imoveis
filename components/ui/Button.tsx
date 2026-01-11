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
                    'inline-flex items-center justify-center font-semibold rounded-full transition-smooth',
                    'focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    {
                        'bg-primary-main text-white hover:bg-primary-hover hover:scale-105 shadow-soft':
                            variant === 'primary',
                        'bg-secondary-main text-primary-main hover:bg-secondary-dark':
                            variant === 'secondary',
                        'border-2 border-primary-main text-primary-main hover:bg-primary-main hover:text-white':
                            variant === 'outline',
                        'text-primary-main hover:bg-secondary-light':
                            variant === 'ghost',
                        'px-4 py-2 text-sm': size === 'sm',
                        'px-6 py-3 text-base': size === 'md',
                        'px-8 py-4 text-lg': size === 'lg',
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
