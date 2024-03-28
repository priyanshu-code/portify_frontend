'use client';
import Loading from '@/components/Loading/Loading';
import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithGoogle, getUser, shiftUserError, shiftUserSuccess } from '@/features/user/userSlice';
import { shiftPortfolioError, shiftPortfolioSuccess } from '@/features/portfolio/portfolioSlice';
import { shiftProjectError, shiftProjectSuccess } from '@/features/project/projectSlice';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui';
import { getAllProjects } from '@/features/project/projectSlice';
import { getPortfolio } from '@/features/portfolio/portfolioSlice';
export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });

  const dispatch = useDispatch();
  const { toast } = useToast();
  // User Errors and successes
  const { token, user, userErrors, userSuccess } = useSelector((store) => store.User);
  // Portfolio Errors and successes
  const { portfolioErrors, portfolioSuccess } = useSelector((store) => store.Portfolio);
  // Projects Errors and successes
  const { projectErrors, projectSuccess } = useSelector((store) => store.Project);
  // If successfully authenticated with next-auth
  useEffect(() => {
    if ((status === 'authenticated' && token === '') || !user) {
      if (session?.provider === 'portify') {
        // Credentials login
        dispatch(getUser());
      } else if (session?.provider === 'google') {
        // Google login
        const { email, id_token, provider } = session;
        dispatch(loginWithGoogle({ email, id_token, provider }));
      }
    }
  }, [status, session]);

  useEffect(() => {
    if (token) {
      dispatch(getUser());
      dispatch(getPortfolio());
      dispatch(getAllProjects());
    }
  }, [token]);
  // Handle User messages
  useEffect(() => {
    if (userErrors.length > 0) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: userErrors[0],
      });
      setTimeout(() => {
        dispatch(shiftUserError());
      }, 2000);
    }
    if (userSuccess.length > 0) {
      toast({
        title: 'Success',
        description: userSuccess[0],
      });
      setTimeout(() => {
        dispatch(shiftUserSuccess());
      }, 2000);
    }
  }, [userErrors, userSuccess]);

  // Handle Portfolio messages
  useEffect(() => {
    if (portfolioErrors.length > 0) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: portfolioErrors[0],
      });
      setTimeout(() => {
        dispatch(shiftPortfolioError());
      }, 2000);
    }
    if (portfolioSuccess.length > 0) {
      toast({
        title: 'Success',
        description: portfolioSuccess[0],
      });
      setTimeout(() => {
        dispatch(shiftPortfolioSuccess());
      }, 2000);
    }
  }, [portfolioErrors, portfolioSuccess]);

  // Handle Project messages
  useEffect(() => {
    if (projectErrors.length > 0 && projectErrors[0] !== 'Please create your portfolio first.') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: projectErrors[0],
      });
      setTimeout(() => {
        dispatch(shiftProjectError());
      }, 2000);
    } else if (projectErrors[0] === 'Please create your portfolio first.') {
      toast({
        title: 'Welcome',
        description: projectErrors[0],
      });
      setTimeout(() => {
        dispatch(shiftProjectError());
      }, 2000);
    }
    if (projectSuccess.length > 0) {
      toast({
        title: 'Success',
        description: projectSuccess[0],
      });
      setTimeout(() => {
        dispatch(shiftProjectSuccess());
      }, 2000);
    }
  }, [projectErrors, projectSuccess]);

  if (status === 'loading') {
    return <Loading />;
  } else if (status === 'authenticated') {
    return <div className='min-h-screen'>{children}</div>;
  } else if (status === 'unauthenticated') {
    return <div className=' min-h-screen '></div>;
  }
}
