import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { authApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import textData from '../../locales/ua.json';
import Spinner from '../../components/Spinner';
import Input from '../../components/Input';
import ThemeToggle from '../../components/ThemeToggle';

interface RegisterFields {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFields>({ mode: 'onTouched' });

  async function onSubmit(data: RegisterFields) {
    try {
      const res = await authApi.register(data);
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch {
      setError('root', { message: textData.register.errorGeneric });
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-950">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-indigo-700 px-14 py-12 animate-fade-in">
        <span className="text-2xl font-black tracking-tight text-white">{textData.appName}</span>
        <div>
          <p className="text-4xl font-bold leading-snug text-white">
            Створюйте тести.<br />Залучайте студентів.<br />Аналізуйте результати.
          </p>
          <p className="mt-4 text-base text-indigo-300">{textData.home.tagline}</p>
        </div>
        <p className="text-sm text-indigo-400">© {new Date().getFullYear()} {textData.appName}</p>
      </div>

      <div className="flex flex-1 flex-col bg-gray-100 dark:bg-slate-950">
        <div className="flex items-center justify-between px-6 pt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-200 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <ArrowLeft size={15} />
            {textData.backToHome}
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm animate-fade-up">
            <p className="mb-8 text-center text-2xl font-black text-indigo-600 dark:text-indigo-400 lg:hidden">
              {textData.appName}
            </p>

            <h1 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">{textData.register.title}</h1>
            <p className="mb-8 text-sm text-gray-500 dark:text-slate-400">
              {textData.register.hasAccount}{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                {textData.register.loginLink}
              </Link>
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-slate-300">{textData.register.labelName}</label>
                <Input
                  type="text"
                  placeholder={textData.register.placeholderName}
                  className="py-3"
                  {...register('name', { required: textData.validation.required })}
                />
                {errors.name && <p className="text-xs text-red-500 dark:text-red-400">{errors.name.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-slate-300">{textData.register.labelEmail}</label>
                <Input
                  type="email"
                  placeholder={textData.register.placeholderEmail}
                  className="py-3"
                  {...register('email', {
                    required: textData.validation.required,
                    pattern: { value: /\S+@\S+\.\S+/, message: textData.validation.emailInvalid },
                  })}
                />
                {errors.email && <p className="text-xs text-red-500 dark:text-red-400">{errors.email.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-slate-300">{textData.register.labelPassword}</label>
                <Input
                  type="password"
                  placeholder={textData.register.placeholderPasswordMin}
                  className="py-3"
                  {...register('password', {
                    required: textData.validation.required,
                    minLength: { value: 6, message: textData.validation.passwordMin },
                  })}
                />
                {errors.password && (
                  <p className="text-xs text-red-500 dark:text-red-400">{errors.password.message}</p>
                )}
              </div>

              {errors.root && (
                <p className="animate-fade-in rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  {errors.root.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-semibold text-white transition duration-200 hover:bg-indigo-700 active:scale-[.98] disabled:opacity-50"
              >
                {isSubmitting ? <Spinner size="sm" /> : textData.register.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
