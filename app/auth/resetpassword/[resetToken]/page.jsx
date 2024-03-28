'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, Button, useToast } from '@/components/ui';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loading from '@/components/Loading/Loading';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { resetPasswordSchema } from '@/components/models/User/User';
import { signOut } from 'next-auth/react';
export default function Projects({ params }) {
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  const [isValid, setIsValid] = useState('loading');
  const [success, setSuccess] = useState(false);
  const { resetToken } = params;
  const { toast } = useToast();
  const [username, setUsername] = useState('');

  const { url } = useSelector((store) => store.Global);

  const verifyResetToken = async ({ userId, resetToken }) => {
    try {
      const response = await axios.post(url + 'auth/verifyResetToken', { userId, resetToken }, { headers: { Accept: 'application/json' } });
      if (response.status === 200) {
        setUsername(response.data.username);
        setIsValid(true);
      }
    } catch (error) {
      setIsValid(false);
    }
  };

  useEffect(() => {
    if (isValid === 'loading') {
      if (userId !== undefined && resetToken !== undefined) {
        verifyResetToken({ userId, resetToken });
      }
    }
  }, [resetToken, userId, isValid]);

  // Submit handler
  async function onSubmit(values) {
    try {
      const { password } = values;
      const response = await axios.post(url + 'auth/resetPassword', { userId, resetToken, password }, { headers: { Accept: 'application/json' } });
      if (response.status === 200) {
        setSuccess(true);
        toast({
          title: 'Password updated successfully',
          description: 'Redirecting to login',
        });
        await signOut({ redirect: true, callbackUrl: '/login' });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.response.data?.msg,
      });
    }
  }

  // Password form.
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirm: '',
    },
  });
  // Loading
  if (isValid === 'loading') return <Loading />;

  // Invalid token
  if (!isValid)
    return (
      <div className="fullHeight w-screen pt-20">
        <div className="grid grid-cols-1 place-items-center space-y-10">
          <div className="responsiveHeading2">Expired/Invalid token</div>
          <div className="responsiveHeading5">
            Please go{' '}
            <Link href={'/login'} className="text-blue-500 hover:underline">
              login
            </Link>{' '}
            to login or reset password.
          </div>
        </div>
      </div>
    );
  // Valid token
  return (
    <div className="fullHeight w-screen pt-20">
      <div className="grid grid-cols-1 place-items-center space-y-10">
        <h1 className="responsiveHeading2 ">Reset password</h1>
        <p className="responsiveHeading4">Hello, {username}</p>
        <motion.div className="w-[min(500px,100%)]" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4 min-w-full">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input className="customInput" type="password" placeholder="6+ Characters" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input className="customInput" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="min-w-full">
                <Button disabled={success} type="submit" className="text-xl py-6 min-w-full ">
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}
