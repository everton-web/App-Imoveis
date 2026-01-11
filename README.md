# Pluma Imóveis

Plataforma premium de imóveis com mapa interativo e sistema CMS completo.

## 🚀 Tecnologias

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS com design system Pluma
- **Database**: PostgreSQL (Neon) com Prisma ORM
- **Authentication**: NextAuth.js
- **Maps**: Leaflet com OpenStreetMap
- **Upload**: Uploadthing (configurável)

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Neon (PostgreSQL)
- (Opcional) Conta no Uploadthing para upload de imagens

## 🛠️ Instalação

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd App-Imoveis
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="gere-uma-chave-secreta-aqui"

# Uploadthing (opcional)
UPLOADTHING_TOKEN=""
```

Para gerar o `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

4. **Configure o banco de dados**

Execute as migrations:
```bash
npx prisma migrate dev
```

Popule o banco com dados iniciais:
```bash
npm run db:seed
```

Isso criará:
- Usuário admin: `admin@pluma.com` / `admin123`
- 4 propriedades de exemplo

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 📦 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa linter
npm run db:push      # Sincroniza schema com banco (sem migrations)
npm run db:seed      # Popula banco com dados iniciais
```

## 🗄️ Estrutura do Projeto

```
App-Imoveis/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── admin/             # Dashboard administrativo
│   ├── imoveis/           # Páginas de imóveis
│   ├── mapa/              # Mapa interativo
│   ├── login/             # Autenticação
│   └── layout.tsx         # Layout raiz
├── components/            # Componentes React
│   ├── ui/               # Componentes UI reutilizáveis
│   └── Map/              # Componentes de mapa
├── lib/                   # Utilitários e configurações
├── prisma/               # Schema e migrations
└── public/               # Arquivos estáticos
```

## 🔐 Autenticação e Roles

O sistema possui 5 níveis de acesso:

- **ADMIN**: Acesso total ao sistema
- **MANAGER**: Gerenciamento de imóveis e usuários
- **DEVELOPER**: Acesso técnico
- **TRAFFIC_MANAGER**: Gestão de tráfego
- **VIEWER**: Apenas visualização

## 🗺️ Mapa Interativo

O mapa utiliza **Leaflet** (open-source) com **OpenStreetMap**:
- Pins customizados para cada imóvel
- Popups com informações e imagem
- Zoom automático para mostrar todos os imóveis
- Totalmente gratuito

## 🚀 Deploy no Render

1. **Crie um banco PostgreSQL no Neon**
   - Acesse [neon.tech](https://neon.tech)
   - Crie um novo projeto
   - Copie a `DATABASE_URL`

2. **Crie um Web Service no Render**
   - Acesse [render.com](https://render.com)
   - Conecte seu repositório GitHub
   - Configure:
     - Build Command: `npm install && npx prisma generate && npm run build`
     - Start Command: `npm start`

3. **Configure as variáveis de ambiente no Render**
   ```
   DATABASE_URL=<sua-url-do-neon>
   NEXTAUTH_URL=<sua-url-do-render>
   NEXTAUTH_SECRET=<sua-chave-secreta>
   ```

4. **Execute as migrations em produção**
   
   No Render Shell:
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

## 🎨 Design System Pluma

O projeto utiliza um design system completo baseado no JSON fornecido:

- **Cores**: Primary (#1C3F3A), Secondary (#EBE8D8), Accent (#FF6B6B)
- **Tipografia**: Plus Jakarta Sans (headings), Inter (body)
- **Tema**: Claro/Escuro com toggle
- **Efeitos**: Glassmorphism, shadows, animações suaves

## 📝 Funcionalidades

- ✅ Landing page premium
- ✅ Listagem de imóveis com filtros
- ✅ Página de detalhes do imóvel
- ✅ Mapa interativo com pins
- ✅ Sistema de autenticação
- ✅ Dashboard administrativo
- ✅ Tema claro/escuro
- ✅ Design responsivo
- 🔄 Upload de imagens (em desenvolvimento)
- 🔄 Gestão de usuários (em desenvolvimento)

## 📄 Licença

Este projeto é privado e proprietário.

## 🤝 Suporte

Para dúvidas ou problemas, entre em contato com a equipe de desenvolvimento.
