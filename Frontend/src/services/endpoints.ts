export const authLogin           = () => '/auth/login';
export const authRegister        = () => '/auth/register';
export const authChangePassword  = () => '/auth/change-password';

export const pollList      = ()           => '/polls';
export const pollGet       = (id: string) => `/polls/${id}`;
export const pollCreate    = ()           => '/polls';
export const pollUpdate    = (id: string) => `/polls/${id}`;
export const pollRemove    = (id: string) => `/polls/${id}`;
export const pollDuplicate = (id: string) => `/polls/${id}/duplicate`;

export const sessionCreate        = ()            => '/sessions';
export const sessionList          = ()            => '/sessions';
export const sessionResults       = (pin: string) => `/sessions/${pin}/results`;
export const sessionResultsExport = (pin: string) => `/sessions/${pin}/results/export`;
