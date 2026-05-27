import { forwardRef, type TextareaHTMLAttributes } from 'react';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = '', ...props }, ref) => (
    <textarea
      ref={ref}
      className={[
        'w-full rounded-xl px-4 py-2.5 text-sm outline-none resize-none transition duration-200',
        'text-gray-900 placeholder:text-gray-400',
        'dark:text-slate-100 dark:placeholder:text-slate-400',
        'bg-gray-100 focus:bg-white focus:ring-2 focus:ring-indigo-500',
        'dark:bg-slate-700/60 dark:focus:bg-slate-700 dark:focus:ring-indigo-400',
        className,
      ].join(' ')}
      {...props}
    />
  ),
);

Textarea.displayName = 'Textarea';
export default Textarea;
