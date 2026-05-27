import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, ...props }, ref) => (
    <input
      ref={ref}
      className={[
        'w-full rounded-xl px-4 py-2.5 text-sm outline-none transition duration-200',
        'text-gray-900 placeholder:text-gray-400',
        'dark:text-slate-100 dark:placeholder:text-slate-400',
        error
          ? 'bg-red-50 ring-2 ring-red-300 dark:bg-red-900/20 dark:ring-red-500/50'
          : 'bg-gray-100 focus:bg-white focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700/60 dark:focus:bg-slate-700 dark:focus:ring-indigo-400',
        className,
      ].join(' ')}
      {...props}
    />
  ),
);

Input.displayName = 'Input';
export default Input;
