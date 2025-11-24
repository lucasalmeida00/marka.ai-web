# Guia de React Hook Form no Projeto

Este documento explica como usar React Hook Form com Zod para validação de formulários no projeto.

## 📦 Dependências

```bash
npm install react-hook-form @hookform/resolvers zod
```

## 🏗️ Estrutura

### Schemas de Validação (`src/schemas/`)

Todos os schemas de validação ficam centralizados na pasta `schemas`:

```typescript
// src/schemas/auth.schema.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export type LoginInput = z.infer<typeof loginSchema>;
```

## 🎯 Padrão de Uso

### 1. Importar dependências

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '../schemas/auth.schema';
import { useLogin } from '../hooks/api/useAuth';
```

### 2. Setup do formulário

```typescript
const { mutate: login, isPending } = useLogin();

const {
  register,
  handleSubmit,
  formState: { errors },
  setError,
} = useForm<LoginInput>({
  resolver: zodResolver(loginSchema),
  defaultValues: {
    email: '',
    password: '',
  },
});
```

### 3. Handler de submit

```typescript
const onSubmit = (data: LoginInput) => {
  login(data, {
    onSuccess: () => {
      navigate('/app');
    },
    onError: (error: any) => {
      setError('root', {
        message: error.response?.data?.message || 'Erro ao fazer login.',
      });
    },
  });
};
```

### 4. JSX do formulário

```tsx
<form onSubmit={handleSubmit(onSubmit)}>
  {/* Erro geral */}
  {errors.root && (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
      {errors.root.message}
    </div>
  )}

  {/* Campo de input */}
  <Input
    label="Email"
    type="email"
    required
    {...register('email')}
    error={errors.email?.message}
    placeholder="seu@email.com"
  />

  {/* Botão de submit */}
  <Button type="submit" fullWidth isLoading={isPending}>
    Entrar
  </Button>
</form>
```

## 📋 Schemas Disponíveis

### Auth (`auth.schema.ts`)
- `loginSchema` - Login
- `registerSchema` - Cadastro
- `forgotPasswordSchema` - Esqueci a senha
- `resetPasswordSchema` - Redefinir senha

### Workspace (`workspace.schema.ts`)
- `workspaceSchema` - Criar/editar workspace
- `inviteProfessionalSchema` - Convidar profissional

### Professional (`professional.schema.ts`)
- `professionalSchema` - Criar/editar profissional
- `professionalAvailabilitySchema` - Horários de disponibilidade

### Service (`service.schema.ts`)
- `serviceSchema` - Criar/editar serviço

### Appointment (`appointment.schema.ts`)
- `appointmentSchema` - Criar agendamento
- `rescheduleAppointmentSchema` - Remarcar agendamento

## ✅ Benefícios

### Antes (sem React Hook Form)
```typescript
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [error, setError] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  if (password !== confirmPassword) {
    setError('As senhas não coincidem');
    return;
  }

  if (password.length < 6) {
    setError('A senha deve ter no mínimo 6 caracteres');
    return;
  }

  // ... resto do código
};
```

**Problemas:**
- 4+ `useState` para um formulário simples
- Validação manual e propensa a erros
- Código repetitivo
- Difícil de manter

### Depois (com React Hook Form)
```typescript
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<RegisterInput>({
  resolver: zodResolver(registerSchema),
});

const onSubmit = (data: RegisterInput) => {
  register(data, {
    onSuccess: () => navigate('/app'),
    onError: (error) => setError('root', { message: error.message }),
  });
};
```

**Vantagens:**
- Sem `useState` para campos
- Validação automática via Zod
- Type-safe com TypeScript
- Código limpo e manutenível
- Performance otimizada (re-renders mínimos)

## 🎨 Componente Input

O componente Input já está preparado para React Hook Form usando `forwardRef`:

```typescript
import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, ...props }, ref) => {
    return (
      <div>
        {label && <label>{label}</label>}
        <input ref={ref} {...props} />
        {error && <p className="error">{error}</p>}
        {helperText && <p className="helper">{helperText}</p>}
      </div>
    );
  }
);
```

## 🔧 Validações Customizadas

### Validação com Refine

```typescript
const registerSchema = z.object({
  password: z.string().min(6),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'], // Campo que receberá o erro
});
```

### Validação com Regex

```typescript
const phoneSchema = z.string()
  .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone inválido')
  .optional();
```

### Validação Condicional

```typescript
const serviceSchema = z.object({
  requiresPayment: z.boolean(),
  price: z.number(),
}).refine((data) => {
  if (data.requiresPayment) {
    return data.price > 0;
  }
  return true;
}, {
  message: 'Preço deve ser maior que 0 quando requer pagamento',
  path: ['price'],
});
```

## 🎯 Integração com React Query

```typescript
const { mutate: createService, isPending } = useCreateService(workspaceId);

const onSubmit = (data: ServiceInput) => {
  createService(data, {
    onSuccess: () => {
      toast.success('Serviço criado com sucesso!');
      navigate(`/app/${workspaceId}/services`);
    },
    onError: (error: any) => {
      setError('root', {
        message: error.response?.data?.message || 'Erro ao criar serviço',
      });
    },
  });
};
```

## 📚 Recursos Avançados

### Reset do Formulário

```typescript
const { reset } = useForm();

// Resetar para valores padrão
reset();

// Resetar com novos valores
reset({
  name: 'Novo nome',
  email: 'novo@email.com',
});
```

### Watch (Observar valores)

```typescript
const { watch } = useForm();

const requiresPayment = watch('requiresPayment');

// Renderizar condicionalmente
{requiresPayment && (
  <Input
    label="Preço"
    type="number"
    {...register('price', { valueAsNumber: true })}
  />
)}
```

### SetValue (Definir valores programaticamente)

```typescript
const { setValue } = useForm();

useEffect(() => {
  // Carregar dados da API
  const loadData = async () => {
    const data = await api.get('/service/123');
    setValue('name', data.name);
    setValue('price', data.price);
  };
  loadData();
}, []);
```

### Trigger (Validar manualmente)

```typescript
const { trigger } = useForm();

const handleBlur = async () => {
  // Validar apenas o campo email
  const isValid = await trigger('email');
  if (isValid) {
    console.log('Email válido!');
  }
};
```

## 🐛 Debugging

### DevTools

```typescript
import { DevTool } from '@hookform/devtools';

function MyForm() {
  const { control } = useForm();
  
  return (
    <>
      <form>...</form>
      <DevTool control={control} />
    </>
  );
}
```

### Modo Debug

```typescript
const { formState: { errors, isDirty, isValid } } = useForm({
  mode: 'onChange', // ou 'onBlur', 'onSubmit', 'all'
});

console.log('Errors:', errors);
console.log('Is Dirty:', isDirty);
console.log('Is Valid:', isValid);
```

## ✨ Best Practices

1. **Sempre use schemas Zod** - Centralize validações
2. **Type-safe** - Use `z.infer<typeof schema>` para types
3. **Mensagens claras** - Erros devem ser específicos e úteis
4. **Campos obrigatórios** - Use `required` no Input para UX
5. **Loading states** - Use `isPending` do React Query
6. **Error handling** - Sempre trate `onError` nas mutations
7. **Reset após sucesso** - Limpe o formulário quando apropriado

## 📖 Referências

- [React Hook Form Docs](https://react-hook-form.com/)
- [Zod Docs](https://zod.dev/)
- [Hookform Resolvers](https://github.com/react-hook-form/resolvers)

---

**Última atualização:** 24 de novembro de 2025
