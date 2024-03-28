'use client';
import axios from 'axios';
import Loading from '@/components/Loading/Loading';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setToken, loginWithGoogle, getUser } from '@/features/user/userSlice';
import { useToast } from '@/components/ui';
import { logoutUser } from '@/features/user/userSlice';
import { resetPortfolio } from '@/features/portfolio/portfolioSlice';
import { resetProjects } from '@/features/project/projectSlice';
export default function LoginLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const { url } = useSelector((store) => store.Global);
  const { toast } = useToast();

  const alreadyRegistered = async (email) => {
    try {
      const response = await axios.post(url + 'auth/userExist', { email });
      return response.data.found;
    } catch (error) {
      console.log(error.response.data);
      return null;
    }
  };
  if (status === 'unauthenticated') {
    dispatch(logoutUser());
    dispatch(resetPortfolio());
    dispatch(resetProjects());
  }
  // Set token if logging with credentials
  useEffect(() => {
    // Function to login with google if account exists
    const loginUserWithGoogle = async (email) => {
      // checking if account exists
      const valid = await alreadyRegistered(email);
      if (valid) {
        const { email, id_token, provider } = session;
        dispatch(loginWithGoogle({ email, id_token, provider }));
        router.push('/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: `No account`,
          description: `Account doesn't exists please sign up.`,
        });
        await signOut({ redirect: false, callbackUrl: '/register' });
      }
    };
    if (status === 'authenticated') {
      if (session?.provider === 'portify') {
        dispatch(setToken(session.token));
        dispatch(getUser(session.token));
        setTimeout(() => {
          router.push('/dashboard');
        }, 500);
      }
      if (session?.provider === 'google') {
        loginUserWithGoogle(session?.email);
      }
    }
  }, [status, router]);

  if (status === 'loading' || status === 'authenticated') {
    return <Loading />;
  }

  return children;
}
