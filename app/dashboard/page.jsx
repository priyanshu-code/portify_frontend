'use client';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Components

import DashboardNavBar, { MobileDashboarNavbarBottom } from '@/components/Dashboard/DashboardNavbar';
import Portfolio from '@/components/Dashboard/Portfolio';
import Projects from '@/components/Dashboard/Projects';
import AddProject from '@/components/Dashboard/Projects/add';
import User from '@/components/Dashboard/Account';

// MultiStep form
import MultiStepForm from '@/components/Dashboard/MultiStepForm';
import Template from '@/components/Templates';

export default function Dashboard() {
  //get values from store
  const { user, userLoading } = useSelector((store) => store.User);
  const { portfolio, portfolioLoading } = useSelector((store) => store.Portfolio);
  const { projects, projectLoading } = useSelector((store) => store.Project);
  const { dashActive, subService } = useSelector((store) => store.Dashboard);
  // destructuring user attrs
  const { portfolioCreated } = user;
  // const portfolioCreated = false;
  const router = useRouter();
  const dispatch = useDispatch();
  const getCurrentDimension = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [currentDimenssion, setCurrentDimenssion] = useState(getCurrentDimension().width);

  useEffect(() => {
    const updateDimension = () => {
      setCurrentDimenssion(getCurrentDimension().width);
      if (getCurrentDimension().width < 640) {
        setMobileNavbar(true);
      } else {
        setMobileNavbar(false);
      }
    };
    window.addEventListener('resize', updateDimension);
    return () => {
      window.removeEventListener('resize', updateDimension);
    };
  }, [window.innerWidth]);
  useEffect(() => {
    if (currentDimenssion < 640) {
      setMobileNavbar(true);
    } else {
      setMobileNavbar(false);
    }
  }, [dispatch, router]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dashActive, subService]);
  if (!portfolioCreated && !portfolioLoading && !projectLoading && !userLoading)
    return (
      <main className='grid grid-cols-1 place-items-center w-full my-8'>
        <div className='grid grid-cols-1 w-full max-w-[min(600px,100%)]'>
          <MultiStepForm />
        </div>
      </main>
    );
  const data = { user, portfolio, projects };

  return (
    //Dashboard Navbar
    <main className='flex max-sm:flex-col items-start justify-between max-w-[100vw] '>
      <DashboardNavBar currentDimenssion={currentDimenssion} className='' />
      <div className='flex-1 w-full sm:w-[calc(100vw-320px)] min-h-screen p-5 sm:p-10 bg-gray-100 dark:bg-black'>
        {dashActive === 'Portfolio' && portfolioCreated && !portfolioLoading && subService === 'Portfolio' ? (
          <Template current={data.portfolio.template} data={data} />
        ) : (
          dashActive === 'Portfolio' && <Portfolio />
        )}
        {dashActive === 'Projects' && !projectLoading && <Projects />}
        {dashActive === 'Add Project' && <AddProject />}
        {dashActive === 'Account' && !userLoading && <User />}
      </div>
      {mobileNavbar && <MobileDashboarNavbarBottom />}
    </main>
  );
}
