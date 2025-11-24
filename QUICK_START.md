# 🚀 Guia de Início Rápido

Este guia vai te ajudar a rodar o projeto em poucos minutos.

## 📋 Pré-requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

## ⚡ Instalação Rápida

```bash
# 1. Clone o repositório (se ainda não clonou)
git clone <seu-repo-url>
cd agendamentos-web

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 🔧 Variáveis de Ambiente

Edite o arquivo `.env.local` com suas configurações:

```env
# API Backend
VITE_API_BASE_URL=http://localhost:3001/api

# Outras configurações podem ser adicionadas conforme necessário
```

## 🎨 Testando o Sistema de Temas

1. Abra a aplicação em `http://localhost:5173`
2. Procure pelo ícone de lua/sol no canto superior direito
3. Clique para alternar entre tema claro e escuro
4. Recarregue a página - o tema deve ser mantido
5. Mude o tema do seu sistema operacional - a aplicação deve acompanhar (se você não tiver definido preferência manual)

## 🏗️ Estrutura do Projeto

```
agendamentos-web/
├── src/
│   ├── api/              # Clientes REST
│   ├── components/       # Componentes reutilizáveis
│   ├── context/          # React Contexts (Auth, Workspace, Theme)
│   ├── hooks/            # Hooks customizados (React Query)
│   ├── pages/            # Páginas da aplicação
│   ├── types/            # Tipos TypeScript
│   ├── App.tsx           # Componente raiz
│   ├── main.tsx          # Entry point
│   └── index.css         # Estilos globais
├── public/               # Arquivos estáticos
├── .env.example          # Exemplo de variáveis de ambiente
└── package.json          # Dependências e scripts
```

## 📱 Páginas Disponíveis

### Públicas
- `/` - Landing page
- `/login` - Login
- `/register` - Cadastro

### Autenticadas (Owner/Professional)
- `/app/:workspaceId/dashboard` - Dashboard
- `/app/:workspaceId/appointments` - Agendamentos
- `/app/:workspaceId/professionals` - Profissionais (só owner)
- `/app/:workspaceId/services` - Serviços (só owner)
- `/app/:workspaceId/billing` - Plano e faturamento (só owner)
- `/app/:workspaceId/settings` - Configurações (só owner)

### Autenticadas (Client)
- `/app/explore` - Explorar empresas
- `/app/my-appointments` - Meus agendamentos
- `/app/profile` - Perfil

## 🔑 Credenciais de Teste

Se você estiver rodando a API localmente, pode criar suas próprias contas através do fluxo de registro.

## 🎯 Próximos Passos

1. **Backend API**: Certifique-se de que a API está rodando em `http://localhost:3001`
2. **Explorar**: Navegue pelas páginas e teste as funcionalidades
3. **Desenvolver**: Comece a adicionar suas próprias features!

## 📚 Documentação Adicional

- [THEME_SYSTEM.md](./THEME_SYSTEM.md) - Sistema de temas completo
- [DARK_MODE_UPDATES.md](./DARK_MODE_UPDATES.md) - Atualizações de dark mode
- [HOOKS_API_GUIDE.md](./HOOKS_API_GUIDE.md) - Guia de hooks da API
- [CHANGELOG.md](./CHANGELOG.md) - Histórico de mudanças

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento

# Build
npm run build           # Cria build de produção
npm run preview         # Previsualiza build de produção

# Linting
npm run lint            # Executa ESLint
```

## ❓ Problemas Comuns

### Porta já em uso
Se a porta 5173 já estiver em uso:
```bash
# No arquivo vite.config.ts, altere a porta:
server: {
  port: 3000, // ou outra porta disponível
}
```

### API não conecta
Verifique se:
1. A API está rodando em `http://localhost:3001`
2. O arquivo `.env.local` tem a URL correta
3. Não há CORS bloqueando as requisições

### Tema não salva
Verifique se:
1. O localStorage está habilitado no navegador
2. Não há extensões bloqueando o localStorage
3. Limpe o cache e tente novamente

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Se você encontrar problemas ou tiver dúvidas:
- Abra uma issue no GitHub
- Consulte a documentação
- Entre em contato com a equipe

## 🎉 Pronto!

Você está pronto para começar a desenvolver! 

Qualquer dúvida, consulte a documentação ou abra uma issue.

Happy coding! 🚀
