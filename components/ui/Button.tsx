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
                    'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 ease-in-out',
                    'focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2 focus:ring-offset-black',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    {
                        'bg-primary-main text-white hover:bg-primary-hover hover:-translate-y-1 shadow-glow':
                            variant === 'primary',
                        'bg-secondary-light text-white hover:bg-secondary-dark border border-white/5':
                            variant === 'secondary',
                        'bg-transparent border border-white/10 text-text-primary hover:bg-white/5 hover:border-white/20':
                            variant === 'outline',
                        'text-text-secondary hover:text-white hover:bg-white/5':
                            variant === 'ghost',
                        'px-4 py-2 text-sm': size === 'sm',
                        'px-8 py-3 text-base': size === 'md',
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
