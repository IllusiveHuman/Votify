import { forwardRef, type InputHTMLAttributes } from 'react';

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className = '', checked, ...props }, ref) => (
    <label className={`inline-flex cursor-pointer items-center ${className}`}>
      <input ref={ref} type="radio" checked={checked} className="peer sr-only" {...props} />
      <span
        className={[
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 peer-focus-visible:ring-offset-1',
          'dark:peer-focus-visible:ring-indigo-400 dark:peer-focus-visible:ring-offset-slate-800',
          checked
            ? 'border-indigo-600 dark:border-indigo-400'
            : 'border-gray-300 bg-white hover:border-indigo-400 dark:border-slate-500 dark:bg-slate-700 dark:hover:border-indigo-400',
        ].join(' ')}
      >
        <span className={`block h-2.5 w-2.5 rounded-full bg-indigo-600 transition-transform duration-150 dark:bg-indigo-400 ${checked ? 'scale-100' : 'scale-0'}`} />
      </span>
    </label>
  ),
);

Radio.displayName = 'Radio';
export default Radio;
