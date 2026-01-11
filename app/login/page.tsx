'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Building2 } from 'lucide-react'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError('Credenciais inválidas')
            } else {
                router.push('/admin')
                router.refresh()
            }
        } catch (error) {
            setError('Erro ao fazer login')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-secondary-light to-secondary-main dark:from-gray-900 dark:to-gray-950 py-12 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-main to-accent-main rounded-lg flex items-center justify-center">
                            <Building2 className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl">Bem-vindo de volta</CardTitle>
                    <p className="text-text-secondary mt-2">
                        Entre com suas credenciais para acessar o painel
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            label="Senha"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {error && (
                            <div className="p-3 bg-accent-main/10 border border-accent-main rounded-md text-accent-main text-sm">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Entrando...' : 'Entrar'}
                        </Button>
                    </form>

                    <div className="mt-6 p-4 bg-secondary-light dark:bg-gray-800 rounded-md">
                        <p className="text-sm text-text-secondary mb-2">
                            <strong>Credenciais de teste:</strong>
                        </p>
                        <p className="text-xs text-text-muted">
                            Email: admin@imoveis.com<br />
                            Senha: admin123
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
