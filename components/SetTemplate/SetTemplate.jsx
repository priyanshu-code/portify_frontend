'use client';

import s from './SetTemplate.module.css';
import { useRouter } from 'next/navigation';
import { updatePortfolio } from '@/features/portfolio/portfolioSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Button } from '../ui/button';
import { useSession } from 'next-auth/react';

export default function SetTemplate({ name }) {
  const { status } = useSession();
  const isAuth = status === 'authenticated' ? true : false;
  const dispatch = useDispatch();
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  function handleClick() {
    if (isAuth) {
      dispatch(updatePortfolio({ template: name }));
      setTimeout(() => {
        setSuccess(true);
      }, 200);
    } else {
      router.push('/login');
    }
  }
  return (
    <main className='absolute p-3 min-w-full flex items-center justify-between'>
      <Button
        onClick={() => {
          router.back();
        }}
        className='cursor-pointer z-10'
      >
        Back
      </Button>
      <Button onClick={handleClick} className={`cursor-pointer z-10 ${success ? 'bg-emerald-400 hover:bg-emerald-600/80' : ''}`}>
        {success ? 'Current!' : 'Set Current'}
      </Button>
    </main>
  );
}
