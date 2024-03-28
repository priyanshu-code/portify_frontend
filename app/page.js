'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import dottedBorder from '@/public/dotted-line-border.svg';
import { FramerAnimateOV } from '@/components/FramerMotion/TextAppers';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Separator } from '@/components/ui';
export default function Home() {
  const features = [
    {
      title: 'Realistic AI Interviews',
      head: 'Experience Interviews that Feel Real.',
      desc: "Our AI Interviews Are So Realistic, You'll Forget They're AI.",
      // image: "/interview.png",
      image: '/interview2.png',
    },
    {
      title: 'Professional Portfolios',
      head: 'Craft Stunning Portfolios Effortlessly.',
      desc: 'Create an Impressive Portfolio in Minutes, Not Hours.',
      image: '/portfolios.png',
    },
    {
      title: 'Explore Projects',
      head: 'Share Your Creations with the World.',
      desc: 'Get Noticed Globally by Showcasing Your Work.',
      image: '/exploreProjects.png',
    },
    {
      title: 'Verified Profiles',
      head: 'Trustworthy Candidates, Guaranteed.',
      desc: 'We Ensure Every Profile Represents Top Talent.',
      image: '/verifiedProfiles.svg',
    },
  ];
  const howItWorks = [
    {
      title: 'Elevate Your Journey: Sign Up',
      head: 'Begin your journey to interview success by signing up for an account. Provide your essential details to personalize your experience.',
      image: '/login-image.png',
    },
    {
      title: 'Profile Power-Up',
      head: 'Create a powerful profile that showcases your skills, experience, and aspirations, setting the stage for personalized interview practice.',
      image: '/portfolios.png',
    },
    {
      title: 'Ace Interviews',
      head: 'Choose your interview type and engage in precision practice sessions. Receive AI-driven questions and evaluate your performance.',
      image: '/exploreProjects.png',
    },
    {
      title: 'Feedback Fuel',
      head: 'Receive AI-generated feedback that fuels your improvement. Discover your strengths and areas for enhancement to shine in real interviews.',
      image: '/verifiedProfiles.svg',
    },
    {
      title: 'Success Awaits',
      head: "With consistent practice and feedback, you're ready to seize success in your career journey. Confidently tackle real interviews and achieve your goals.",
      image: '/verifiedProfiles.svg',
    },
  ];
  const [show, setShow] = useState([false, false, false, false]);
  return (
    <main className='flex flex-col items-center md:px-16 lg:px-28 space-y-12 sm:space-y-20 py-12 sm:py-20 min-h-fullmax-w-[100vw] overflow-hidden'>
      {/* <Blobs size={{ height: 300, width: 300 }} className="-top-40 left-40 rotate-45" /> */}
      {/* Intro section */}
      <div className='flex flex-col items-center justify-center min-w-full space-y-4 sm:space-y-12'>
        <h1 className='responsiveHeading text-center  font-bold'>
          <p className=' sm:whitespace-nowrap'>
            The <span className='themeColorText'>fastest way</span> to launch
          </p>
          your carrer.
        </h1>
        <h1 className='responsiveText text-center font-light max-sm:max-w-[70%] sm:max-w-[min(50%,600px)]'>
          Embrace the age of <span className='themeColorText brightness-150 font-semibold'>Artificial intelligence.</span> Discover the boundless potential and Impact of AI in every sphere of Life.
        </h1>
        <div className='flex justify-center items-center flex-nowrap space-x-5 w-full max-sm:min-w-[90%] sm:max-w-[min(50%,500px)]'>
          <button className='themeColorBackground p-3 px-6 rounded-md font-light sm:min-w-[50%] text-white'>Get Started</button>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center w-full max-w-[min(1100px,90%)]  rounded-xl themeColorBackground p-[3px] '>
        <Image className='rounded-xl aspect-video object-cover' src={'/homeHandshake.jpg'} height={850} width={1280} alt='homeHandshake.jpg' />
      </div>
      {/* <Blobs className="top-[40%] -right-[10%] min-h-[600px] min-w-[600px] -rotate-45" /> */}
      {/* Features section */}
      <div className='flex flex-col justify-center w-[90%] space-y-4 max-w-[1000px]'>
        <FramerAnimateOV direction={'up'} delay={0.1} className='responsiveHeading'>
          Features
        </FramerAnimateOV>
        {features.map((item, i) => {
          const { title, head, desc, image } = item;
          const isOpen = show[i] === true;
          return (
            <FramerAnimateOV className={`flex flex-col justify-center items-center min-w-full max-w-full`} key={title} direction={'up'} delay={0.2}>
              <div className={`flex ${i % 2 === 0 ? 'flex-row-reverse' : ''} items-center justify-evenly min-w-full max-w-full`}>
                <div className='space-y-2'>
                  <h1 className='responsiveHeading3 font-bold'>{title}</h1>
                  <h1 className='responsiveText font-light'>{head}</h1>
                  <h1 className='hidden sm:block responsiveText2 font-light'>{desc}</h1>
                </div>
                <Image className='max-w-[50%]' src={image} height={700} width={700} alt='interview' layout='responsive' />
              </div>
              <FramerAnimateOV direction={'down'} delay={0.3} className={'hidden max-sm:block max-sm:pb-2'}>
                <MdKeyboardArrowDown
                  onClick={() => {
                    setShow((prev) =>
                      prev.map((item, x) => {
                        return i === x ? !item : item;
                      })
                    );
                  }}
                  className={`h-8 w-20 cursor-pointer min-w-full transition-all duration-300 ${!isOpen ? '' : 'rotate-180'}`}
                />
              </FramerAnimateOV>
              <Separator />
            </FramerAnimateOV>
          );
        })}
      </div>
      {/* How it works section */}
      <div className='flex flex-col justify-center w-[90%] space-y-4 lg:space-y-10 max-w-[1000px]'>
        <FramerAnimateOV direction={'up'} delay={0.1} className='responsiveHeading'>
          How it works
        </FramerAnimateOV>
        {howItWorks.map((item, i) => {
          const { title, head, desc, image } = item;
          const last = i === howItWorks.length - 1;
          const opposite = i % 2 === 0;
          return (
            <FramerAnimateOV className={`flex flex-col justify-center items-center min-w-full max-w-full py-3`} key={item.title} delay={0.3}>
              <div className={`relative flex ${opposite ? 'flex-row-reverse' : ''} items-center justify-evenly min-w-full max-w-full`}>
                <div className={`min-h-max min-w-[50%]  sm:space-y-3 ${opposite ? 'pl-5' : 'pr-5'} sm:px-10`}>
                  <h1 className='responsiveHeading4 sm:responsiveHeading3 font-bold'>{title}</h1>
                  <h1 className='responsiveText2 sm:responsiveText font-light'>{head}</h1>
                </div>
                {!last && (
                  <svg
                    className={`max-sm:hidden -z-10 absolute scale-[0.95]  top-[45%] ${opposite ? '-rotate-180 right-[25%]' : '-rotate-[270deg] left-[25%]'}`}
                    width='423'
                    height='468'
                    viewBox='0 0 423 468'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M2.50006 0C2.50006 465 2.50006 465 422.5 465' stroke='#BF22F7' strokeWidth='1' strokeLinejoin='round' strokeDasharray='20 20' />
                  </svg>
                )}
                <div className='max-w-[50%] min-w-[50%] aspect-square rounded-md font-light themeColorBackground flex p-[1px] sm:min-w-[50%]'>
                  <div className='z-10 rounded-md dark:bg-black  p-4 sm:p-6 md:p-8 min-w-full text-white border border-black'>
                    <div className='min-w-[100%] aspect-square rounded-md font-light themeColorBackground border border-black flex p-[1px] sm:min-w-[50%]'>
                      <div className='flex items-center justify-center z-10 rounded-md dark:bg-black/80    min-w-full text-white'>
                        <Image src={image} height={800} width={800} alt={image} className='max-h-full rounded-lg' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FramerAnimateOV>
          );
        })}
      </div>
    </main>
  );
}

const Blobs = ({ size, className }) => {
  return (
    <span
      className={`
      absolute
      min-h-[${size?.height || 100}px]
      min-w-[${size?.width || 100}px] 
      bg-gradient-to-b from-sky-800 via-purple-800 to-pink-800
      ${className}
      -z-10
      rounded-full
      blur-3xl
      `}
    ></span>
  );
};
