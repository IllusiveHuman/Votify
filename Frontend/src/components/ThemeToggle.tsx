import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Перемкнути тему"
      className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors
        text-gray-500 hover:bg-gray-200 hover:text-gray-800
        dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200
        ${className}`}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
