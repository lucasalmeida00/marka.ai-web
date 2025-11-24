# Guia de Uso dos Hooks de API

Este guia mostra como usar os hooks customizados do React Query para interagir com a API.

## Índice

- [Instalação](#instalação)
- [Hooks Disponíveis](#hooks-disponíveis)
- [Exemplos de Uso](#exemplos-de-uso)

## Instalação

Os hooks já estão configurados e prontos para uso. Basta importar de `hooks/api`:

```tsx
import { usePlans, useCreateCheckoutSession } from '../hooks/api';
```

## Hooks Disponíveis

### Auth (`useAuth.ts`)
- `useLogin()` - Login de usuário
- `useRegister()` - Registro de novo usuário
- `useForgotPassword()` - Solicitar reset de senha
- `useResetPassword()` - Resetar senha com token
- `useVerifyEmail()` - Verificar e-mail
- `useMe()` - Buscar dados do usuário logado
- `useRefreshToken()` - Renovar token
- `useLogout()` - Logout

### Workspaces (`useWorkspaces.ts`)
- `useWorkspaces()` - Listar workspaces
- `useWorkspace(id)` - Buscar workspace por ID
- `useWorkspaceBySlug(slug)` - Buscar workspace por slug
- `useCreateWorkspace()` - Criar workspace
- `useUpdateWorkspace()` - Atualizar workspace
- `useDeleteWorkspace()` - Deletar workspace

### Professionals (`useProfessionals.ts`)
- `useProfessionals(workspaceId)` - Listar profissionais
- `useProfessional(workspaceId, id)` - Buscar profissional
- `useCreateProfessional()` - Criar profissional
- `useUpdateProfessional()` - Atualizar profissional
- `useDeleteProfessional()` - Deletar profissional
- `useUpdateProfessionalSchedule()` - Atualizar horários

### Services (`useServices.ts`)
- `useServices(workspaceId)` - Listar serviços
- `useService(workspaceId, id)` - Buscar serviço
- `useCreateService()` - Criar serviço
- `useUpdateService()` - Atualizar serviço
- `useDeleteService()` - Deletar serviço

### Appointments (`useAppointments.ts`)
- `useAppointments(workspaceId, filters)` - Listar agendamentos
- `useAppointment(workspaceId, id)` - Buscar agendamento
- `useMyAppointments()` - Meus agendamentos (cliente)
- `useAvailableSlots(params)` - Slots disponíveis
- `useCreateAppointment()` - Criar agendamento
- `useUpdateAppointment()` - Atualizar agendamento
- `useUpdateAppointmentStatus()` - Atualizar status
- `useRescheduleAppointment()` - Reagendar
- `useCancelAppointment()` - Cancelar
- `useConfirmAppointment()` - Confirmar
- `useCompleteAppointment()` - Completar
- `useMarkAppointmentNoShow()` - Marcar como falta

### Billing (`useBilling.ts`)
- `usePlans()` - Listar planos
- `usePlan(id)` - Buscar plano
- `useSubscription(workspaceId)` - Buscar assinatura
- `useCreateCheckoutSession()` - Criar sessão de checkout
- `useChangePlan()` - Mudar plano
- `useCancelSubscription()` - Cancelar assinatura
- `useResumeSubscription()` - Reativar assinatura
- `useInvoices(workspaceId)` - Listar faturas
- `useInvoice(workspaceId, id)` - Buscar fatura
- `usePayments(workspaceId)` - Listar pagamentos
- `usePayment(workspaceId, id)` - Buscar pagamento
- `usePayAppointment()` - Pagar agendamento

### Clients (`useClients.ts`)
- `useClients(workspaceId)` - Listar clientes
- `useClient(workspaceId, id)` - Buscar cliente
- `useCreateClient()` - Criar cliente
- `useUpdateClient()` - Atualizar cliente

### Upload (`useUpload.ts`)
- `useUploadFile()` - Upload de arquivo único
- `useUploadMultipleFiles()` - Upload múltiplo
- `useDeleteFile()` - Deletar arquivo
- `useImportClients()` - Importar clientes
- `useImportAppointments()` - Importar agendamentos
- `useImportJobs(workspaceId)` - Listar jobs de importação
- `useImportJob(workspaceId, id)` - Buscar job de importação

## Exemplos de Uso

### 1. Buscar e Exibir Dados (Query)

```tsx
import { usePlans } from '../hooks/api';

function PlansPage() {
  const { data: plans = [], isLoading, error } = usePlans();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar planos</div>;
  }

  return (
    <div>
      {plans.map(plan => (
        <div key={plan.id}>{plan.name}</div>
      ))}
    </div>
  );
}
```

### 2. Criar/Atualizar Dados (Mutation)

```tsx
import { useCreateProfessional } from '../hooks/api';
import { useWorkspace } from '../context/WorkspaceContext';

function CreateProfessionalForm() {
  const { currentWorkspace } = useWorkspace();
  const createProfessional = useCreateProfessional();

  const handleSubmit = async (data) => {
    try {
      await createProfessional.mutateAsync({
        workspaceId: currentWorkspace.id,
        name: data.name,
        email: data.email,
        bio: data.bio,
        services: data.services,
        schedule: data.schedule,
      });
      
      alert('Profissional criado com sucesso!');
    } catch (error) {
      alert('Erro ao criar profissional');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* campos do formulário */}
      <button 
        type="submit" 
        disabled={createProfessional.isPending}
      >
        {createProfessional.isPending ? 'Salvando...' : 'Salvar'}
      </button>
    </form>
  );
}
```

### 3. Listar com Filtros

```tsx
import { useAppointments } from '../hooks/api';

function AppointmentsPage() {
  const { currentWorkspace } = useWorkspace();
  const [filters, setFilters] = useState({
    status: 'pending',
    startDate: '2025-01-01',
  });

  const { 
    data: appointments = [], 
    isLoading 
  } = useAppointments(currentWorkspace?.id || '', filters);

  return (
    <div>
      <select onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
        <option value="pending">Pendentes</option>
        <option value="confirmed">Confirmados</option>
      </select>
      
      {appointments.map(appointment => (
        <div key={appointment.id}>{appointment.id}</div>
      ))}
    </div>
  );
}
```

### 4. Atualizar Status

```tsx
import { useUpdateAppointmentStatus } from '../hooks/api';

function AppointmentCard({ appointment, workspaceId }) {
  const updateStatus = useUpdateAppointmentStatus();

  const handleConfirm = async () => {
    await updateStatus.mutateAsync({
      workspaceId,
      id: appointment.id,
      status: 'confirmed',
    });
  };

  return (
    <div>
      <h3>{appointment.service.name}</h3>
      <button 
        onClick={handleConfirm}
        disabled={updateStatus.isPending}
      >
        Confirmar
      </button>
    </div>
  );
}
```

### 5. Upload de Arquivo

```tsx
import { useUploadFile, useImportClients } from '../hooks/api';

function ImportClientsForm() {
  const { currentWorkspace } = useWorkspace();
  const importClients = useImportClients();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentWorkspace) return;

    try {
      const result = await importClients.mutateAsync({
        workspaceId: currentWorkspace.id,
        file,
      });
      
      alert(`Importação iniciada! Job ID: ${result.id}`);
    } catch (error) {
      alert('Erro ao importar arquivo');
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept=".csv"
        onChange={handleFileChange}
        disabled={importClients.isPending}
      />
      {importClients.isPending && <span>Enviando...</span>}
    </div>
  );
}
```

### 6. Desabilitar Query com Flag

```tsx
import { useProfessional } from '../hooks/api';

function ProfessionalDetails({ workspaceId, professionalId, shouldLoad }) {
  // Query só executa se shouldLoad = true
  const { 
    data: professional, 
    isLoading 
  } = useProfessional(workspaceId, professionalId, shouldLoad);

  if (!shouldLoad) {
    return null;
  }

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return <div>{professional?.name}</div>;
}
```

### 7. Refetch Automático (Polling)

```tsx
import { useImportJob } from '../hooks/api';

function ImportJobStatus({ workspaceId, jobId }) {
  // Refetch automático a cada 5s enquanto estiver processando
  const { data: job } = useImportJob(workspaceId, jobId);

  return (
    <div>
      <p>Status: {job?.status}</p>
      {job?.status === 'PROCESSING' && (
        <p>Processando... {job.processedRecords}/{job.totalRecords}</p>
      )}
    </div>
  );
}
```

## Vantagens dessa Abordagem

✅ **Centralizado**: Toda lógica de fetching em um só lugar  
✅ **Cache Automático**: React Query gerencia cache e revalidação  
✅ **Loading States**: `isLoading`, `isPending`, `error` prontos para uso  
✅ **Invalidação**: Cache invalidado automaticamente após mutations  
✅ **Type-safe**: TypeScript completo em toda stack  
✅ **Reutilizável**: Mesma lógica em qualquer componente  
✅ **Refetch**: Controle fino de quando buscar dados novamente  

## Estados Importantes

### Query (useQuery)
- `data` - Dados retornados
- `isLoading` - Primeira carga
- `isFetching` - Buscando dados (incluindo refetch)
- `error` - Erro se houver
- `refetch()` - Função para recarregar manualmente

### Mutation (useMutation)
- `mutate(data)` - Executar mutation (fire and forget)
- `mutateAsync(data)` - Executar mutation (com await)
- `isPending` - Está executando
- `isSuccess` - Sucesso
- `isError` - Erro
- `error` - Objeto de erro
- `reset()` - Resetar estado
