import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className = '', children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={[
          'w-full appearance-none rounded-xl px-4 py-2.5 pr-9 text-sm outline-none transition duration-200',
          'bg-gray-100 text-gray-900 focus:bg-white focus:ring-2 focus:ring-indigo-500',
          'dark:bg-slate-700/60 dark:text-slate-100 dark:focus:bg-slate-700 dark:focus:ring-indigo-400',
          className,
        ].join(' ')}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400"
      />
    </div>
  ),
);

Select.displayName = 'Select';
export default Select;
