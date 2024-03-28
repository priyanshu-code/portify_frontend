'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '../ui';

export default function DashboardNavBar() {
  const { setTheme } = useTheme();
  const { push } = useRouter();
  const { status } = useSession();
  const isAuth = status === 'authenticated' ? true : false;
  const [isOpen, setIsOpen] = useState(false);
  const getCurrentDimension = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };
  const [isMobile, setIsMobile] = useState(getCurrentDimension().width < 640);
  useEffect(() => {
    const updateDimension = () => {
      setIsMobile(getCurrentDimension().width < 640);
    };
    if (!isMobile) setIsOpen(false);
    window.addEventListener('resize', updateDimension);
    return () => {
      window.removeEventListener('resize', updateDimension);
    };
  }, [window.innerWidth]);
  return (
    <nav className={`${isOpen && isMobile ? 'fixed bg-white dark:bg-black z-50 min-h-screen flex-col' : ''} min-w-full flex items-center justify-between px-10  py-6 `}>
      <header className='text-3xl font-bold themeColorText cursor-pointer' onClick={() => push('/')}>
        portify.ai
      </header>
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className='absolute sm:hidden flex flex-col justify-between space-y-2 w-10 top-5 py-3 right-10 cursor-pointer'
      >
        <span className={`bg-black dark:bg-white w-10 h-[2px]  transfrom-all duration-300 ${isOpen ? ' rotate-[45deg] translate-y-[5px]' : '-rotate-[0deg'}`}></span>
        <span className={`bg-black dark:bg-white w-10 h-[2px]  transfrom-all duration-300 ${isOpen ? '-rotate-[45deg] -translate-y-[5px]' : 'rotate-[0deg]'}`}></span>
      </button>
      <ul className={`${isOpen && isMobile ? 'flex-col mb-auto py-10 space-y-4 text-2xl text-center' : 'hidden'} sm:flex items-center sm:space-x-6 lg:space-x-10 sm:text-lg font-light list-none`}>
        <li
          onClick={() => {
            setIsOpen(false);
          }}
          className='dark:hover:text-gray-300'
        >
          <Link href={'/pricing'}>Pricing</Link>
        </li>
        <li
          onClick={() => {
            setIsOpen(false);
          }}
          className='dark:hover:text-gray-300'
        >
          <Link href={'/explore'}>Explore</Link>
        </li>
        {isAuth ? (
          <li
            onClick={() => {
              setIsOpen(false);
            }}
            className='dark:hover:text-gray-300'
          >
            <Link href={'/dashboard'}>Dashboard</Link>
          </li>
        ) : (
          <li
            onClick={() => {
              setIsOpen(false);
            }}
            className='dark:hover:text-gray-300'
          >
            <Link href={'/login'}>Login</Link>
          </li>
        )}
        {isAuth ? (
          <li
            onClick={() => {
              setIsOpen(false);
            }}
            className='dark:hover:text-gray-300'
          >
            <Link href={'/templates'}>Templates</Link>
          </li>
        ) : (
          <li
            onClick={() => {
              setIsOpen(false);
            }}
            className='text-white dark:hover:text-gray-300'
          >
            <Link className='rounded-lg themeColorBackground p-[1px] flex' href={'/register'}>
              <div className=' rounded-lg dark:offBaseColor px-5 py-2'>Sign Up</div>
            </Link>
          </li>
        )}
        <li className='dark:hover:text-gray-300'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon'>
                <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                <span className='sr-only'>Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </nav>
  );
}
