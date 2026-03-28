import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <div className="bg-primary-main/5 dark:bg-white/5 rounded-full p-6 mb-6">
                <span className="text-4xl font-bold font-heading text-primary-main dark:text-white">404</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-text-primary">
                Página não encontrada
            </h1>

            <p className="text-body-lg text-text-secondary max-w-md mb-8">
                Ops! A página que você está procurando parece não existir ou foi movida.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/">
                    <Button size="lg" className="w-full sm:w-auto">
                        <Home className="w-4 h-4 mr-2" />
                        Voltar ao Início
                    </Button>
                </Link>
                <Link href="/admin">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Dashboard
                    </Button>
                </Link>
            </div>
        </div>
    )
}
