'use client';
import {
  MdOutlineMediation,
  MdOutlineAccountCircle,
  MdOutlineSettings,
  MdOutlineSupport,
  MdOutlineLogout,
  MdGridView,
  MdOutlineHome,
  MdOutlineAutoFixHigh,
  MdOutlineMenu,
  MdOutlineMenuOpen,
} from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { setDashActive, setDashSubSerivce } from '@/features/dashboard/dashboardSlice';
import Image from 'next/image';
import Link from 'next/link';
import { Separator, Button } from '@/components/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { signOut } from 'next-auth/react';

import { useState, useEffect } from 'react';
import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const services = [
  { name: 'Home', image: MdOutlineHome },
  { name: 'Portfolio', image: MdOutlineAutoFixHigh },
  // { name: 'Socials', image: MdOutlineMediation },
  { name: 'Projects', image: MdGridView },
  { name: 'Account', image: MdOutlineAccountCircle },
];
const subServices = [{ name: 'Manage' }, { name: 'Socials' }];

export default function DashboardNavbar({ currentDimenssion }) {
  const { setTheme } = useTheme();
  const { dashActive } = useSelector((store) => store.Dashboard);
  const { user } = useSelector((store) => store.User);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentDimenssion < 768) {
      setHideNavbar(true);
      setOpen(false);
    } else if (currentDimenssion > 1280) {
      setHideNavbar(true);
      setOpen(true);
    } else {
      setHideNavbar(false);
      setOpen(false);
    }
    if (currentDimenssion < 640) {
      setMobileNavbar(true);
    } else {
      if (mobileNavbar) {
        setMobileNavbar(false);
      }
    }
  }, [currentDimenssion]);
  const animate = {
    initial: { x: -70, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.4 } },
    exit: { x: 0, opacity: 0 },
  };
  const animateDiv = {
    initial: { height: 0, y: -25, opacity: 0 },
    animate: { height: '70px', y: 0, opacity: 1 },
    exit: { height: 0, y: -25, opacity: 0 },
  };

  const { email, picturePath, username } = user;
  if (mobileNavbar) {
    return <MobileDashboarNavbarTop data={{ picturePath, username, email }} />;
  }
  return (
    <motion.nav
      className={`sticky top-0 flex flex-col ${open ? 'w-[320px] px-5' : 'w-[110px] px-3'}
     transition-all duration-500 items-center justify-between min-h-screen border-r border-gray-500/30 `}
    >
      <h1 className=' w-full py-4 text-center text-4xl font-semibold themeColorText cursor-pointer '>
        <Link href='/'>{open ? 'Portify' : 'P'}</Link>
      </h1>
      {!hideNavbar && (
        <div
          onClick={() => setOpen((prev) => !prev)}
          className={`h-14 border grid place-items-center whitespace-nowrap mb-4 cursor-pointer aspect-square rounded-sm ${
            open ? 'bg-black text-white' : ''
          }`}
        >
          {open ? <MdOutlineMenuOpen size={25} /> : <MdOutlineMenu size={25} />}
        </div>
      )}
      <Separator />
      <div className='py-5 flex flex-col space-y-2 w-full'>
        {services.map((item) => {
          const { name } = item;
          const current = dashActive === name;
          return (
            <div key={name} className='space-y-2 min-w-full'>
              <Button
                onClick={() => {
                  if (name === 'Portfolio') {
                    dispatch(setDashActive(name));
                    dispatch(setDashSubSerivce(name));
                  } else {
                    dispatch(setDashActive(name));
                  }
                }}
                className={`w-full flex items-center font-bold h-16 z-10 whitespace-nowrap 
                ${open ? ' w-full space-x-10 justify-start px-8' : 'aspect-square  space-x-0 justify-center'}
                ${
                  current
                    ? `bg-primary text-background hover:bg-primary`
                    : `bg-background text-primary hover:bg-primary hover:text-background 
                    dark:bg-black  dark:hover:bg-black  dark:hover:text-primary`
                }`}
                key={name}
              >
                <item.image size={25} />
                <AnimatePresence>
                  {open && (
                    <motion.p variants={animate} initial='initial' animate='animate' exit='exit'>
                      {name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </Button>
              <AnimatePresence>
                {name === 'Portfolio' && dashActive === 'Portfolio' && (
                  <motion.div
                    variants={animateDiv}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                    className='text-left flex flex-col justify-evenly min-w-full font-semibold gap-1 py1'
                  >
                    {subServices.map((item) => {
                      return (
                        <Button onClick={() => dispatch(setDashSubSerivce(item.name))} key={'sub' + item.name}>
                          {item.name}
                        </Button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      <div className={`flex flex-col mt-auto space-y-4 w-full py-5 ${open ? 'items-start' : 'items-center'}`}>
        <Separator />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='self-center' variant='outline' size='icon'>
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
        <div className='flex cursor-pointer space-x-5 items-center font-bold text-sm'>
          <MdOutlineSupport size={25} />
          <AnimatePresence>
            {open && (
              <motion.p variants={animate} initial='initial' animate='animate' exit='exit'>
                Support
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div className='flex cursor-pointer space-x-5 items-center font-bold text-sm'>
          <MdOutlineSettings size={25} />
          <AnimatePresence>
            {open && (
              <motion.p variants={animate} initial='initial' animate='animate' exit='exit'>
                Settings
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <Separator />
        <div
          className={`grid ${open ? 'py-5 grid-cols-2 ' : 'grid-cols-1 gap-4'} place-items-center  w-full items-center`}
        >
          <div className='flex items-center'>
            <Image
              src={picturePath}
              height={50}
              width={50}
              alt='userImage'
              className='rounded-full aspect-square object-cover border border-black cursor-pointer'
            />
            <AnimatePresence>
              {open && (
                <div className='flex flex-col items-start justify-center text-sm mr-auto ml-5 max-w-[100px]'>
                  <motion.p variants={animate} initial='initial' animate='animate' exit='exit' className='font-bold '>
                    {username}
                  </motion.p>
                </div>
              )}
            </AnimatePresence>
          </div>
          <MdOutlineLogout
            size={25}
            onClick={async () => {
              await signOut({ redirect: true, callbackUrl: '/login' });
            }}
            className={`cursor-pointer ${open ? ' ml-auto' : ''}`}
          />
        </div>
      </div>
    </motion.nav>
  );
}

function MobileDashboarNavbarTop({ data }) {
  const { setTheme } = useTheme();
  const { picturePath, username, email } = data;
  const dispatch = useDispatch();
  return (
    <div className='sticky grid grid-cols-3 gap-4 my-auto px-5 h-16 top-0 w-full bg-background dark:offBaseColor z-10'>
      <div className='flex justify-start items-center gap-4'>
        <Image
          src={picturePath}
          height={40}
          width={40}
          alt='userImage'
          className='rounded-full aspect-square object-cover border border-black cursor-pointer'
        />
      </div>
      <h1 className='flex items-center justify-center text-3xl text-center font-semibold themeColorText cursor-pointer '>
        <Link href='/'>Portify</Link>
      </h1>
      <div className='flex justify-end items-center gap-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='self-center' variant='outline' size='icon'>
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
        <MdOutlineLogout
          size={26}
          onClick={async () => {
            await signOut({ redirect: true, callbackUrl: '/login' })
              .then(dispatch(clearPortfolio()))
              .then(dispatch(logoutUser()));
          }}
          className={`cursor-pointer`}
        />
      </div>
    </div>
  );
}
export function MobileDashboarNavbarBottom() {
  const { dashActive } = useSelector((store) => store.Dashboard);
  const dispatch = useDispatch();
  return (
    <div className='sticky flex items-center py-auto px-3 h-20 bottom-0 w-full bg-background dark:offBaseColor '>
      <div className='w-full grid grid-cols-4 gap-4'>
        {services.map((item) => {
          const { name } = item;
          const current = dashActive === name;
          return (
            <>
              <Button
                onClick={() => dispatch(setDashActive(name))}
                className={`h-16 grid grid-cols-1 place-items-center w-full text-xs font-bold aspect-square  
                ${
                  current
                    ? `bg-primary text-background hover:bg-primary`
                    : `bg-background text-primary
                    hover:bg-primary hover:text-background 
                    dark:bg-black  dark:hover:bg-black  dark:hover:text-primary`
                }`}
                key={name}
              >
                <item.image size={25} />
                <p>{name}</p>
              </Button>
            </>
          );
        })}
      </div>
    </div>
  );
}
