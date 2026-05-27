import axios from 'axios';
import type {
  AuthResponse,
  LoginBody,
  RegisterBody,
  PollListResponse,
  PollListQuery,
  PollResponse,
  CreatePollBody,
  DeleteResponse,
  CreateSessionBody,
  CreateSessionResponse,
  SessionListResponse,
  SessionListQuery,
  SessionResultsResponse,
} from '../types/api';
import {
  authLogin, authRegister, authChangePassword,
  pollList, pollGet, pollCreate, pollUpdate, pollRemove, pollDuplicate,
  sessionCreate, sessionList, sessionResults, sessionResultsExport,
} from './endpoints';
import { DEMO_PINS, DEMO_RESULTS, DEMO_SESSIONS } from '../mocks/demoData';

const http = axios.create({ baseURL: '/api' });

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthEndpoint = error.config?.url?.startsWith('/auth');
    if (error.response?.status === 401 && !isAuthEndpoint) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export const authApi = {
  login: (body: LoginBody) =>
    http.post<AuthResponse>(authLogin(), body).then((response) => response.data),

  register: (body: RegisterBody) =>
    http.post<AuthResponse>(authRegister(), body).then((response) => response.data),

  changePassword: (body: { currentPassword: string; newPassword: string }) =>
    http.put<{ success: boolean; message: string }>(authChangePassword(), body).then((response) => response.data),
};

export const pollsApi = {
  list: (params?: PollListQuery) =>
    http.get<PollListResponse>(pollList(), { params }).then((response) => response.data),

  get: (id: string) =>
    http.get<PollResponse>(pollGet(id)).then((response) => response.data),

  create: (body: CreatePollBody) =>
    http.post<PollResponse>(pollCreate(), body).then((response) => response.data),

  update: (id: string, body: CreatePollBody) =>
    http.put<PollResponse>(pollUpdate(id), body).then((response) => response.data),

  remove: (id: string) =>
    http.delete<DeleteResponse>(pollRemove(id)).then((response) => response.data),

  duplicate: (id: string) =>
    http.post<PollResponse>(pollDuplicate(id)).then((response) => response.data),
};

export const sessionsApi = {
  create: (body: CreateSessionBody) =>
    http.post<CreateSessionResponse>(sessionCreate(), body).then((response) => response.data),

  list: (params?: SessionListQuery) =>
    http.get<SessionListResponse>(sessionList(), { params }).then((response) => {
      const base = response.data;
      const isFirstUnfiltered =
        !params?.search && !params?.dateFrom && !params?.dateTo &&
        (!params?.page || params.page === 1);
      if (!isFirstUnfiltered) return base;
      const total = base.total + DEMO_SESSIONS.length;
      return {
        ...base,
        data: [...DEMO_SESSIONS, ...base.data],
        total,
        totalPages: Math.ceil(total / (params?.pageSize ?? 10)),
      };
    }),

  results: (pin: string) => {
    if (DEMO_PINS.has(pin)) {
      return Promise.resolve<SessionResultsResponse>({ success: true, data: DEMO_RESULTS[pin] });
    }
    return http.get<SessionResultsResponse>(sessionResults(pin)).then((response) => response.data);
  },

  exportResults: async (pin: string): Promise<void> => {
    const blobResponse = await http.get(sessionResultsExport(pin), { responseType: 'blob' });
    const url = URL.createObjectURL(new Blob([blobResponse.data as BlobPart]));
    const date = new Date().toLocaleDateString('uk-UA').replace(/\./g, '-');
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `Votify_${pin}_${date}.xlsx`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  },
};
