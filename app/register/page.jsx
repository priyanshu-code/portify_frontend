'use client';
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import Loading from '@/components/Loading/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IoIosArrowBack } from 'react-icons/io';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, Button, useToast } from '@/components/ui';
import google from '@/public/google.svg';
import { motion } from 'framer-motion';
import { loginWithGoogle } from '@/features/user/userSlice';
import { registerUserSchema, usernameSchema } from '@/components/models/User/User';
export default function Register() {
  const { url } = useSelector((store) => store.Global);
  const { toast } = useToast();
  const [emailUsed, setEmailUsed] = useState(false);
  const { data: session, status } = useSession();
  const [picture, setPicture] = useState('');
  const [newUser, setNewUser] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const alreadyRegistered = async (email) => {
    try {
      const response = await axios.post(url + 'auth/userExist', { email });
      return response.data.found;
    } catch (error) {
      console.log(error.response.data);
      return null;
    }
  };
  useEffect(() => {
    // Function to login with google if account exists
    const loginUserWithGoogle = async (email) => {
      // checking if account exists
      const registered = await alreadyRegistered(email);
      if (registered) {
        toast({
          title: `Signing in...`,
        });
        const { email, id_token, provider } = session;
        dispatch(loginWithGoogle({ email, id_token, provider }));
        router.push('/dashboard');
        setNewUser(false);
      } else {
        toast({
          title: `Success`,
          description: `Just one more step.`,
        });
        setNewUser(true);
      }
    };
    if (status === 'authenticated') {
      if (session?.provider === 'google') {
        loginUserWithGoogle(session?.email);
      }
    }
  }, [status, router, newUser]);

  // User form.
  const form = useForm({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirm: '',
      picturePath: '',
    },
  });
  const formData = new FormData();
  // Credentials Register Submit
  async function onSubmit(values) {
    formData.append('username', values.username);
    formData.append('firstname', values.firstname);
    formData.append('lastname', values.lastname);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('picturePath', picture);
    formData.append('provider', 'portify');
    try {
      const response = await axios.post(url + 'auth/register', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        toast({
          title: `Welcome ${values.username}`,
          description: `Please login to continue.`,
        });
        setTimeout(async () => {
          await signOut({ redirect: true, callbackUrl: '/login' });
        }, 2000);
      }
    } catch (error) {
      let errorMessage = error.response.data.msg;
      if (errorMessage.startsWith('Duplicate value entered for')) {
        errorMessage = errorMessage.split('Duplicate value entered for')[1].split(' ')[1];
        toast({
          variant: 'destructive',
          title: `Please select a different ${errorMessage}!`,
          description: `${errorMessage} : ${values[errorMessage]} is already in use!`,
        });
      } else {
        toast({
          variant: 'destructive',
          title: `Error!`,
          description: errorMessage,
        });
      }
    }
  }

  // Username form for new google registration
  const usernameForm = useForm({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: '',
    },
  });

  const googleFormData = new FormData();
  // Google signup submit handler
  async function onSend(values) {
    const { name, email, id_token } = session;
    const names = name.split(' ');
    let firstname = '';
    let lastname;
    if (names.length > 1) {
      firstname = names.slice(0, names.length - 1).join(' ');
      lastname = names[names.length - 1];
    } else {
      firstname = names[0];
    }
    googleFormData.append('username', values.username);
    googleFormData.append('firstname', firstname);
    if (lastname) googleFormData.append('lastname', lastname);
    googleFormData.append('email', email);
    googleFormData.append('provider', 'google');
    googleFormData.append('googleIdToken', id_token);
    try {
      const response = await axios.post(url + 'auth/register', googleFormData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        toast({
          title: `Welcome ${values.username}`,
          description: `Please login to continue.`,
        });
        setNewUser(false);
      }
    } catch (error) {
      let errorMessage = error.response.data.msg;
      if (errorMessage.startsWith('Duplicate value entered for')) {
        errorMessage = errorMessage.split('Duplicate value entered for')[1].split(' ')[1];
        toast({
          variant: 'destructive',
          title: `Please select a different ${errorMessage}!`,
          description: `${errorMessage} : ${values[errorMessage]} is already in use!`,
        });
      } else {
        toast({
          variant: 'destructive',
          title: `Error!`,
          description: errorMessage,
        });
      }
    }
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setPicture(file);
  }

  if (status === 'loading' || (!newUser && status === 'authenticated')) {
    return <Loading />;
  }
  if (newUser && status === 'authenticated') {
    return (
      <div className='flex items-center justify-center min-w-screen fullHeight  px-3'>
        <div className='flex flex-col items-center w-full sm:max-w-[500px] space-y-7 px-3'>
          <h1 className='text-3xl xs:text-3xl sm:text-4xl m-4 min-w-full font-semibold'>Just one more step</h1>
          <div className='min-w-full space-y-3'>
            <Form {...usernameForm}>
              <form onSubmit={usernameForm.handleSubmit(onSend)} encType='multipart/form-data' className='space-y-2 min-w-full'>
                <FormField
                  control={usernameForm.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input className='customInput' {...field} />
                      </FormControl>
                      <FormDescription className='text-cyan-800'>This is your unique identifer</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='min-w-full'>
                  <Button type='submit' className='text-xl py-6 min-w-full '>
                    Register
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center min-w-screen fullHeight  px-3'>
      <div className={`flex flex-col  items-center w-full ${emailUsed ? 'max-w-[390px]' : 'max-w-[500px]'} space-y-7 px-3`}>
        {emailUsed && (
          <div onClick={() => setEmailUsed(false)} className='self-start border rounded-md p-2 hover:bg-gray-300/40 border-black cursor-pointer'>
            <IoIosArrowBack />
          </div>
        )}

        <h1 className='text-3xl xs:text-3xl sm:text-4xl m-4 w-full max-w-[500px] font-semibold'>Sign up to Portify</h1>
        {!emailUsed && (
          <>
            <Button
              onClick={() => {
                signIn('google');
              }}
              className='min-w-full flex items-center justify-center  border font-semibold border-gray-300 py-[35px] rounded-xl '
            >
              <Image src={google} alt='' className='h-7' /> <p>Sign up with google</p>
            </Button>
            <span className='flex items-center justify-center min-w-full text-sm text-gray-400 '>
              <span className='h-[2px] w-full bg-gray-200 z-0'></span>
              <p className='z-10 px-2 whitespace-nowrap'>or</p>
              <span className='h-[2px] w-full bg-gray-200 z-0'></span>
            </span>

            <button onClick={() => setEmailUsed(true)} className='min-w-full flex items-center justify-center  border font-semibold border-gray-300 p-5 rounded-xl '>
              <p>Continue with email</p>
            </button>
          </>
        )}
        {emailUsed && (
          <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} encType='multipart/form-data' className='space-y-2 min-w-full'>
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input className='customInput' {...field} />
                      </FormControl>
                      <FormDescription className='text-cyan-800'>This is your unique identifer</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex justify-between space-x-3 max-w-full'>
                  <FormField
                    control={form.control}
                    name='firstname'
                    render={({ field }) => (
                      <FormItem className='flex-1'>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input className='customInput' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='lastname'
                    render={({ field }) => (
                      <FormItem className='flex-1'>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input className='customInput' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
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
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input className='customInput' type='password' placeholder='6+ Characters' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='confirm'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input className='customInput' type='password' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='picturePath'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Picture</FormLabel>
                      <FormControl>
                        <Input style={{ cursor: 'pointer' }} type='file' name='picturePath' accept='image/*' onChange={handleImage} />
                      </FormControl>
                      <FormDescription className='text-cyan-800'>Will also be your primary image for Portfolio</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='min-w-full'>
                  <Button type='submit' className='text-xl py-6 min-w-full '>
                    Register
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        )}
        <p className='text-sm my-2 mx-1'>
          Already have an account?{'  '}
          <Link className='underline' href='/login'>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
