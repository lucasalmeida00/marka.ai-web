# Agendamentos Web

Plataforma SaaS completa de agendamentos online para profissionais e empresas que trabalham com hora marcada.

## 🚀 Tecnologias

- **React 19** com **TypeScript**
- **Vite** como bundler  
- **React Router** para navegação
- **TanStack Query** para gerenciamento de estado
- **Axios** para chamadas HTTP
- **Tailwind CSS** para estilização
- **date-fns** para manipulação de datas

## 📋 Funcionalidades

### Multi-tenant (Multi-empresa)
- Suporte a múltiplas empresas/workspaces
- Isolamento completo de dados entre empresas
- URLs contextualizadas: `/app/:workspaceId/...`

### Planos de Assinatura
- Planos Starter, Pro e Premium
- Período de teste de 14 dias
- Gestão de billing e faturas

### Pagamentos Online
- Pagamento de assinaturas (empresas)
- Pagamento antecipado de agendamentos (clientes)

### Áreas de Usuário

#### Dono da Empresa / Admin
- Dashboard com métricas
- Gestão de profissionais e serviços
- Calendário de agendamentos
- Gestão de plano e pagamentos

#### Profissional
- Dashboard pessoal
- Calendário de agendamentos
- Configuração de horários
- Gestão de agendamentos

#### Cliente
- Busca de empresas
- Agendamento online
- Gestão de agendamentos

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Iniciar servidor de desenvolvimento
npm run dev
```

## 🔐 Autenticação

O sistema suporta 3 tipos de usuário:

1. **owner** - Dono da empresa
2. **professional** - Profissional (barbeiro, manicure, etc.)
3. **client** - Cliente final

## 🎨 Design

- **Mobile-first**: Interface responsiva
- **Tailwind CSS**: Estilização utilitária
- **Componentes reutilizáveis**: Botões, inputs, cards, modals padronizados

## 🚀 Build

```bash
# Build de produção
npm run build

# Preview do build
npm run preview
```

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# marka.ai-web
