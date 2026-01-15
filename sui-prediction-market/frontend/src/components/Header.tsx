'use client';

import { ConnectButton } from '@mysten/dapp-kit';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/50">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between h-11 px-6">
          {/* Logo */}
          <Link
            href="/"
            className="text-[22px] font-semibold text-gray-900 hover:text-gray-600 transition-colors leading-none"
            style={{ letterSpacing: '-0.022em' }}
          >
            SUI ARENA
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/arena"
              className={`text-[15px] font-bold transition-colors ${
                isActive('/arena')
                  ? 'text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{ letterSpacing: '-0.01em' }}
            >
              Arena
            </Link>
            <Link
              href="/markets"
              className={`text-[15px] font-bold transition-colors ${
                isActive('/markets')
                  ? 'text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{ letterSpacing: '-0.01em' }}
            >
              Markets
            </Link>
            <Link
              href="/portfolio"
              className={`text-[15px] font-bold transition-colors ${
                isActive('/portfolio')
                  ? 'text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{ letterSpacing: '-0.01em' }}
            >
              Portfolio
            </Link>
            <Link
              href="/create"
              className={`text-[15px] font-bold transition-colors ${
                isActive('/create')
                  ? 'text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{ letterSpacing: '-0.01em' }}
            >
              Create
            </Link>
          </nav>

          {/* Connect Button */}
          <div className="flex items-center">
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
}
