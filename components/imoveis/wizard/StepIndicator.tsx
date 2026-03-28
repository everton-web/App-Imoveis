'use client';

import { Check } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Step {
    id: number;
    name: string;
    icon: LucideIcon;
}

interface StepIndicatorProps {
    steps: Step[];
    currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
    return (
        <div className="space-y-2">
            {steps.map((step, index) => {
                const isCompleted = step.id < currentStep;
                const isCurrent = step.id === currentStep;
                const Icon = step.icon;

                return (
                    <div
                        key={step.id}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isCurrent
                                ? 'bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-500'
                                : isCompleted
                                    ? 'bg-gray-50 dark:bg-gray-700/50'
                                    : 'bg-gray-50 dark:bg-gray-700/30'
                            }`}
                    >
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${isCompleted
                                    ? 'bg-emerald-600 text-white'
                                    : isCurrent
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                                }`}
                        >
                            {isCompleted ? (
                                <Check className="w-4 h-4" />
                            ) : (
                                <span className="text-sm font-medium">{step.id}</span>
                            )}
                        </div>
                        <span
                            className={`text-sm font-medium ${isCurrent || isCompleted
                                    ? 'text-gray-900 dark:text-white'
                                    : 'text-gray-500 dark:text-gray-400'
                                }`}
                        >
                            {step.name}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
