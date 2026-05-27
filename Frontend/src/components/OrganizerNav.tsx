import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { Settings } from 'lucide-react';
import textData from '../locales/ua.json';

const NAV_LINKS = [
  { to: '/dashboard', label: textData.dashboard.navPolls },
  { to: '/history',   label: textData.dashboard.navHistory },
];

export default function OrganizerNav() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white shadow-sm dark:border-slate-700/60 dark:bg-slate-900 dark:shadow-lg dark:shadow-black/20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-0">

        <div className="flex items-center gap-8">
          <Link
            to="/dashboard"
            className="text-3xl font-black tracking-tight text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {textData.appName}
          </Link>

          <nav className="flex items-center">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [
                    'relative flex items-center px-4 py-5 text-base font-semibold transition-colors',
                    isActive
                      ? 'text-indigo-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:rounded-t-full after:bg-indigo-600 dark:text-indigo-400 dark:after:bg-indigo-500'
                      : 'text-gray-600 hover:text-gray-900 dark:text-slate-300 dark:hover:text-white',
                  ].join(' ')
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">{user?.name}</span>
          <ThemeToggle />
          <NavLink
            to="/settings"
            title={textData.settings.navLink}
            className={({ isActive }) =>
              [
                'flex h-9 w-9 items-center justify-center rounded-xl border transition',
                isActive
                  ? 'border-indigo-400 bg-indigo-50 text-indigo-600 dark:border-indigo-500 dark:bg-indigo-900/30 dark:text-indigo-400'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-800 dark:border-slate-600 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:bg-slate-700 dark:hover:text-white',
              ].join(' ')
            }
          >
            <Settings size={16} />
          </NavLink>
          <button
            onClick={logout}
            className="rounded-xl border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:border-slate-600 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            {textData.dashboard.logout}
          </button>
        </div>

      </div>
    </header>
  );
}
