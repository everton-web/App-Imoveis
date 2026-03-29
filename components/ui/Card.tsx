import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    glass?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, glass = false, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-2xl border transition-smooth overflow-hidden',
                    glass
                        ? 'bg-secondary-main/60 backdrop-blur-md border-white/5 shadow-glow-hover'
                        : 'bg-secondary-light border-border shadow-soft',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        )
    }
)

Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('p-6 pb-4', className)}
            {...props}
        />
    )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn('text-heading-3 font-heading text-text-primary', className)}
            {...props}
        />
    )
)
CardTitle.displayName = 'CardTitle'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('p-6 pt-0', className)}
            {...props}
        />
    )
)
CardContent.displayName = 'CardContent'

export { Card, CardHeader, CardTitle, CardContent }
