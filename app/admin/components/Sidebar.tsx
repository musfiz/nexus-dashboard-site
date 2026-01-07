'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: '📊' },
  { name: 'Users', href: '/admin/users', icon: '👥' },
  { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  { name: 'Analytics', href: '/admin/analytics', icon: '📈' },
];

export default function Sidebar({ sidebarOpen, mobileMenuOpen, setMobileMenuOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          bg-white shadow-lg transition-all duration-300 ease-in-out border-r border-gray-200
          ${sidebarOpen ? 'w-70' : 'w-20'}
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-4">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">
                AP
              </div>
              <div>
                <h1 className="font-bold text-gray-900 text-lg leading-tight">Admin Panel</h1>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md mx-auto">
              AP
            </div>
          )}
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          {sidebarOpen && (
            <div className="px-3 mb-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Menu</p>
            </div>
          )}
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer
                    ${isActive
                      ? 'bg-indigo-100 text-indigo-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                  title={!sidebarOpen ? item.name : undefined}
                >
                  <span className={`text-lg ${sidebarOpen ? 'mr-3' : 'mx-auto'}`}>{item.icon}</span>
                  <span className={`${!sidebarOpen && 'hidden'} transition-opacity duration-300`}>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}
