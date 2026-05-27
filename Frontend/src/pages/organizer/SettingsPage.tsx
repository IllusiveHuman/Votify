import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyRound, CheckCircle2 } from 'lucide-react';
import OrganizerNav from '../../components/OrganizerNav';
import { authApi } from '../../services/api';
import textData from '../../locales/ua.json';
import axios from 'axios';

const t = textData.settings;

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function SettingsPage() {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordForm>();

  const newPassword = watch('newPassword');

  async function onSubmit(data: ChangePasswordForm) {
    setServerError('');
    setSuccess(false);
    try {
      await authApi.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      setSuccess(true);
      reset();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setServerError(t.errorWrongCurrent);
      } else {
        setServerError(t.errorGeneric);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950">
      <OrganizerNav />

      <main className="mx-auto max-w-xl px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">{t.title}</h1>

        <div className="rounded-2xl bg-white p-6 ring-1 ring-gray-200 dark:bg-slate-800 dark:ring-slate-700/50">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/40">
              <KeyRound size={18} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t.changePasswordSection}</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Current password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-slate-300">
                {t.labelCurrentPassword}
              </label>
              <input
                type="password"
                placeholder={t.placeholderCurrentPassword}
                autoComplete="current-password"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/50"
                {...register('currentPassword', { required: textData.validation.required })}
              />
              {errors.currentPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.currentPassword.message}</p>
              )}
            </div>

            {/* New password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-slate-300">
                {t.labelNewPassword}
              </label>
              <input
                type="password"
                placeholder={t.placeholderNewPassword}
                autoComplete="new-password"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/50"
                {...register('newPassword', {
                  required: textData.validation.required,
                  minLength: { value: 8, message: t.errorNewPasswordMin },
                })}
              />
              {errors.newPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.newPassword.message}</p>
              )}
            </div>

            {/* Confirm new password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-slate-300">
                {t.labelConfirmPassword}
              </label>
              <input
                type="password"
                placeholder={t.placeholderConfirmPassword}
                autoComplete="new-password"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/50"
                {...register('confirmPassword', {
                  required: textData.validation.required,
                  validate: (value) => value === newPassword || t.errorPasswordMismatch,
                })}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Server error */}
            {serverError && (
              <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {serverError}
              </p>
            )}

            {/* Success */}
            {success && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                <CheckCircle2 size={16} />
                {t.successMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-500 active:scale-[.98] disabled:opacity-60 dark:shadow-indigo-900/40"
            >
              {isSubmitting ? '…' : t.submitButton}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
