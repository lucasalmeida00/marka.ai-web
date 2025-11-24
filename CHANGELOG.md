# Changelog

## [1.1.0] - 2025-11-24

### ✨ Added - Sistema de Temas Dark/Light

#### Novos Arquivos
- `src/context/ThemeContext.tsx` - Context para gerenciamento de tema
- `src/components/ThemeToggle.tsx` - Componente de alternância de tema
- `THEME_SYSTEM.md` - Documentação completa do sistema de temas
- `DARK_MODE_UPDATES.md` - Documentação das atualizações de dark mode
- `CHANGELOG.md` - Este arquivo

#### Funcionalidades
- ✅ Detecção automática do tema do sistema operacional
- ✅ Persistência da preferência do usuário em localStorage
- ✅ Alternância manual via botão (lua/sol)
- ✅ Listener automático para mudanças no tema do sistema
- ✅ Transições suaves entre temas (200ms)
- ✅ Prevenção de flash de conteúdo não estilizado (FOUC)

### 🎨 Updated - Componentes com Dark Mode

#### Componentes Base
- `src/components/Button.tsx` - Todos os variants adaptados
- `src/components/Card.tsx` - Todos os sub-componentes adaptados
- `src/components/Input.tsx` - Labels, fields, estados adaptados
- `src/components/Modal.tsx` - Overlay, header, body, footer adaptados
- `src/components/Navbar.tsx` - Navegação pública com ThemeToggle
- `src/components/Sidebar.tsx` - Navegação interna com ThemeToggle
- `src/components/AppLayout.tsx` - Layout principal da aplicação

#### Páginas Públicas
- `src/pages/LandingPage.tsx` - Todas as seções adaptadas
- `src/pages/LoginPage.tsx` - Formulário e estados adaptados
- `src/pages/RegisterPage.tsx` - Seleção de papel e formulário adaptados

#### Páginas da Aplicação
- `src/pages/DashboardAdminPage.tsx` - Cards e listas adaptados

#### Estilos Globais
- `src/index.css` - Adicionado suporte dark mode no body

### 🔧 Fixed - Correções de Linting

- Substituído `flex-shrink-0` por `shrink-0` (Tailwind v4)
- Removido import não utilizado `CardHeader` em ProfessionalsPage
- Removido variável não utilizada `workspace` em SettingsPage
- Corrigido múltiplas ocorrências de classes antigas do Tailwind

### 📱 Improved - Responsividade

- Mantida responsividade mobile-first em todos os componentes
- ThemeToggle funciona tanto em desktop quanto mobile
- Navegação adaptada para ambos os temas em todas as resoluções

## [1.0.0] - 2025-11-23

### ✨ Initial Release

#### Arquitetura
- React 19.2.0 + TypeScript + Vite
- Tailwind CSS 4.1.17
- TanStack Query 5.90.10 para data fetching
- React Router 7.9.6 para roteamento
- Axios 1.13.2 para HTTP client
- Multi-tenant com isolamento por workspace

#### Funcionalidades Principais
- Sistema de autenticação completo (JWT)
- Landing page com apresentação do produto
- Cadastro multi-perfil (Owner, Professional, Client)
- Dashboard administrativo
- Gerenciamento de workspaces
- Gerenciamento de profissionais
- Gerenciamento de serviços
- Sistema de agendamentos
- Integração com API REST (localhost:3001)

#### Hooks Customizados
- `useAuth` - Autenticação e usuário logado
- `useWorkspace` - Gerenciamento de workspaces
- `useAppointments` - Operações com agendamentos
- `useProfessionals` - Operações com profissionais
- `useServices` - Operações com serviços
- `useBilling` - Operações de faturamento
- `useClients` - Operações com clientes
- `useUpload` - Upload de arquivos

#### Componentes
- Button (5 variants)
- Card (Header, Body, Footer)
- Input (com validação e helper text)
- Modal (com Header, Body, Footer)
- Navbar (navegação pública)
- Sidebar (navegação interna)
- AppLayout (layout principal)

#### Páginas Implementadas
- Landing Page
- Login / Register
- Dashboard (Admin, Professional, Client)
- Professionals
- Services
- Appointments
- Billing
- Settings
- Onboarding (Workspace, Plan)

---

## Notas de Versão

### Compatibilidade
- Node.js: >= 18.0.0
- npm: >= 9.0.0
- Browsers: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Breaking Changes
Nenhuma breaking change nesta versão.

### Deprecations
Nenhuma deprecation nesta versão.

### Security
- Todas as senhas são hasheadas com bcrypt
- JWT tokens com expiração configurável
- CORS configurado adequadamente
- Validação de entrada em todos os formulários

### Performance
- Lazy loading de componentes
- Code splitting automático com Vite
- Cache de queries com TanStack Query
- Otimização de re-renders com React.memo onde necessário

---

**Formato do Changelog:** [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)  
**Versionamento:** [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
