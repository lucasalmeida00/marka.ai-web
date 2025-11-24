import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../../api';
import type { LoginRequest, RegisterRequest } from '../../api';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token);
      queryClient.setQueryData(['auth', 'me'], data.user);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token);
      queryClient.setQueryData(['auth', 'me'], data.user);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => authApi.forgotPassword({ email }),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      authApi.resetPassword({ token, password }),
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (token: string) => authApi.verifyEmail(token),
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => authApi.me(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: () => authApi.refresh(),
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
