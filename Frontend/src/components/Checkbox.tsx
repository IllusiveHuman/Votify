import { forwardRef, type InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', checked, ...props }, ref) => (
    <label className={`inline-flex cursor-pointer items-center ${className}`}>
      <input ref={ref} type="checkbox" checked={checked} className="peer sr-only" {...props} />
      <span
        className={[
          'flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 peer-focus-visible:ring-offset-1',
          'dark:peer-focus-visible:ring-indigo-400 dark:peer-focus-visible:ring-offset-slate-800',
          checked
            ? 'border-indigo-600 bg-indigo-600 dark:border-indigo-400 dark:bg-indigo-500'
            : 'border-gray-300 bg-white hover:border-indigo-400 dark:border-slate-500 dark:bg-slate-700 dark:hover:border-indigo-400',
        ].join(' ')}
      >
        {checked && <Check size={12} strokeWidth={3} className="text-white" />}
      </span>
    </label>
  ),
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
