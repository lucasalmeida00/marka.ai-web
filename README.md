# Agendamentos Web

Plataforma SaaS completa de agendamentos online para profissionais e empresas que trabalham com hora marcada.

## 🚀 Tecnologias

- **React 19** com **TypeScript**
- **Vite** (rolldown) como bundler  
- **React Router** para navegação
- **TanStack Query** para gerenciamento de estado e cache
- **Axios** para chamadas HTTP
- **Tailwind CSS v4** para estilização
- **date-fns** para manipulação de datas

## ✨ Características Principais

### 🎨 Sistema de Temas Dark/Light
- Detecção automática do tema do sistema operacional
- Alternância manual via botão (lua/sol)
- Persistência da preferência do usuário
- Transições suaves entre temas
- Totalmente responsivo em ambos os temas

### 🏢 Multi-tenant (Multi-empresa)
- Suporte a múltiplas empresas/workspaces
- Isolamento completo de dados entre empresas
- URLs contextualizadas: `/app/:workspaceId/...`

### 💳 Planos de Assinatura
- Planos Starter, Pro e Premium
- Período de teste de 14 dias
- Gestão de billing e faturas

### 💰 Pagamentos Online
- Pagamento de assinaturas (empresas)
- Pagamento antecipado de agendamentos (clientes)

## 👥 Áreas de Usuário

### Dono da Empresa / Admin
- Dashboard com métricas
- Gestão de profissionais e serviços
- Calendário de agendamentos
- Gestão de plano e pagamentos
- Configurações da empresa

### Profissional
- Dashboard pessoal
- Calendário de agendamentos
- Configuração de horários
- Gestão de agendamentos

### Cliente
- Busca de empresas
- Agendamento online
- Gestão de agendamentos
- Perfil pessoal

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env.local

# Configurar URL da API no .env.local
# VITE_API_BASE_URL=http://localhost:3001/api

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse: `http://localhost:5173`

Para um guia mais detalhado, veja [QUICK_START.md](./QUICK_START.md)

## 📚 Documentação

- [QUICK_START.md](./QUICK_START.md) - Guia de início rápido
- [THEME_SYSTEM.md](./THEME_SYSTEM.md) - Sistema de temas completo
- [DARK_MODE_UPDATES.md](./DARK_MODE_UPDATES.md) - Atualizações de dark mode
- [HOOKS_API_GUIDE.md](./HOOKS_API_GUIDE.md) - Guia de hooks da API
- [CHANGELOG.md](./CHANGELOG.md) - Histórico de mudanças

## 🔐 Autenticação

O sistema suporta 3 tipos de usuário:

1. **owner** - Dono da empresa (acesso completo)
2. **professional** - Profissional (gerencia agenda própria)
3. **client** - Cliente final (faz agendamentos)

## 🎨 Design e UX

- **Mobile-first**: Interface responsiva para todos os dispositivos
- **Tailwind CSS v4**: Estilização moderna e utilitária
- **Dark/Light Mode**: Temas claro e escuro com detecção automática
- **Componentes reutilizáveis**: Biblioteca completa de UI components
- **Acessibilidade**: Labels, aria-labels e navegação por teclado

## 🏗️ Arquitetura

### Estrutura de Pastas
```
src/
├── api/              # Clientes REST por domínio
├── components/       # Componentes reutilizáveis
├── context/          # React Contexts (Auth, Workspace, Theme)
├── hooks/            # Hooks customizados com React Query
├── pages/            # Páginas da aplicação
├── types/            # Tipos TypeScript
└── index.css         # Estilos globais
```

### Padrões de Código
- **Hooks Layer**: Todas as chamadas de API através de hooks customizados
- **React Query**: Cache automático e invalidação inteligente
- **TypeScript**: Tipagem estrita em todo o projeto
- **Context API**: Gerenciamento de estado global
- **Multi-tenant**: Isolamento por workspaceId

## 🚀 Scripts

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento

# Build
npm run build           # Cria build de produção
npm run preview         # Previsualiza build de produção

# Linting
npm run lint            # Executa ESLint
```

## 🌐 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# URL da API Backend
VITE_API_BASE_URL=http://localhost:3001/api
```

```env
# URL da API Backend
VITE_API_BASE_URL=http://localhost:3001/api
```

## 📱 Páginas Implementadas

### Públicas
- `/` - Landing page com apresentação do produto
- `/login` - Login
- `/register` - Cadastro multi-perfil

### Autenticadas (Owner/Professional)
- `/app/:workspaceId/dashboard` - Dashboard com métricas
- `/app/:workspaceId/appointments` - Gestão de agendamentos
- `/app/:workspaceId/professionals` - Gestão de profissionais (só owner)
- `/app/:workspaceId/services` - Gestão de serviços (só owner)
- `/app/:workspaceId/billing` - Plano e faturamento (só owner)
- `/app/:workspaceId/settings` - Configurações da empresa (só owner)

### Autenticadas (Client)
- `/app/explore` - Explorar empresas disponíveis
- `/app/my-appointments` - Meus agendamentos
- `/app/profile` - Perfil pessoal

## 🎯 Roadmap

- [ ] Implementar React Table para listagens
- [ ] Sistema de notificações (email/SMS)
- [ ] Calendário avançado com drag & drop
- [ ] Relatórios e analytics
- [ ] Integração com gateways de pagamento
- [ ] PWA (Progressive Web App)
- [ ] Aplicativo mobile (React Native)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é proprietário e confidencial.

## 📞 Suporte

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Consulte a documentação
- Entre em contato com a equipe

---

**Desenvolvido com ❤️ usando React + TypeScript + Vite**
