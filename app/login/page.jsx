'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, Button, useToast } from '@/components/ui';
import google from '@/public/google.svg';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { IoIosArrowBack } from 'react-icons/io';
import axios from 'axios';

export default function Login() {
  const { url } = useSelector((store) => store.Global);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [forgotPassword, setForgotPassword] = useState(false);

  // Credentials form Schema
  const userSchema = z.object({
    email: z.string().email().min(3, { message: 'Email must be at least 3 characters.' }).max(50, { message: 'Max length 50 characters.' }),
    password: z.string().min(6, { message: 'Password must be least 6 characters.' }).max(50, { message: 'Max length 50 characters.' }),
  });
  // Credentials form
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  //PASSWORD RESET

  // Password reset schema
  const resetPasswordSchema = z.object({
    email: z.string().email().min(3, { message: 'Email must be at least 3 characters.' }).max(50, { message: 'Max length 50 characters.' }),
  });
  // Password reset form
  const resetPasswordform = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });
  async function onPassworReset(values) {
    try {
      const { email } = values;
      const response = await axios.post(url + 'auth/requestResetPassword', { email }, { headers: { Accept: 'application/json' } });
      console.log(response.data);
      if (response.status === 200) {
        toast({
          title: 'Success',
          description: `Email sent to ${email}`,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.response.data?.msg,
      });
    }
  }
  // Credentials Login
  async function onSubmit(values) {
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
  }
  if (forgotPassword)
    return (
      <div className='fullHeight w-screen pt-20 px-5'>
        <div className='grid grid-cols-1 place-items-center space-y-10'>
          <h1 className='text-3xl xs:text-3xl sm:text-4xl m-4 responsiveHeading2 font-semibold'>Reset password</h1>
          <p className='responsiveText text-center max-w-[600px]'>Please enter your registered email address so that we can send you a link to reset your password.</p>
          <motion.div className='w-[min(500px,100%)] space-y-4' initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
            <div onClick={() => setForgotPassword(false)} className='place-self-start border rounded-md p-2 max-w-[35px]   hover:bg-gray-300/40 border-black cursor-pointer'>
              <IoIosArrowBack />
            </div>
            <Form {...resetPasswordform}>
              <form onSubmit={resetPasswordform.handleSubmit(onPassworReset)} encType='multipart/form-data' className='space-y-4 min-w-full'>
                <FormField
                  control={resetPasswordform.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input className='customInput' type='email' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='min-w-full'>
                  <Button type='submit' className='text-xl py-6 min-w-full '>
                    Request Reset
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    );

  return (
    <div className='flex items-center justify-center fullHeight px-3 min-w-screen'>
      <div className='flex flex-col  items-center w-full max-w-[500px] space-y-7 px-3'>
        <h1 className='min-w-full m-4 text-3xl font-bold xs:text-3xl sm:text-4xl'>Sign in to Portify</h1>
        <button
          onClick={async () => {
            signIn('google');
          }}
          className='flex items-center justify-center min-w-full p-5 font-semibold border border-gray-300 rounded-xl '
        >
          <Image src={google} alt='' className='h-7' /> <p>Sign in with google</p>
        </button>
        <span className='flex items-center justify-center min-w-full text-sm text-gray-400 '>
          <span className='h-[2px] w-full bg-gray-200 z-0'></span>
          <p className='z-10 px-2 whitespace-nowrap'>or sign in with email</p>
          <span className='h-[2px] w-full bg-gray-200 z-0'></span>
        </span>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} encType='multipart/form-data' className='grid min-w-full grid-cols-2 gap-6'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='min-w-full col-span-2'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className='customInput' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='min-w-full col-span-2'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>Password</FormLabel>
                    <p onClick={() => setForgotPassword(true)} className='text-sm text-right font-semibold hover:font-bold hover:underline cursor-pointer'>
                      forgot password?
                    </p>
                  </div>
                  <FormControl>
                    <Input type='password' className='customInput' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='min-w-full col-span-2 '>
              <Button type='submit' className='min-w-full py-6 text-xl '>
                Login
              </Button>
            </div>
          </form>
          <p className='mx-1 my-2 text-sm'>
            Don&apos;t have an account?{'  '}
            <Link className='underline' href='/register'>
              Sign up
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
