// Inspiration https://www.figma.com/community/file/1275872056595984414
'use client';
import { useRef, useState } from 'react';
import { JetBrains_Mono } from 'next/font/google';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { DeckCard } from './DeckCards';
import { FramerAnimateOV } from '@/components/Home/FramerAnimateOV';
import { useSelector } from 'react-redux';
import Image from 'next/image';

const jetBrains = JetBrains_Mono({ subsets: ['cyrillic-ext'] });

export default function Deck({ user, portfolio, projects }) {
  const { url } = useSelector((store) => store.Global);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);
  const [showMore, setShowMore] = useState(false);
  return (
    <main className={`${jetBrains.className} min-h-screen flex flex-col items-center bg-[rgb(20,20,20)] p-10 space-y-96`}>
      <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }} className='relative flex items-center justify-center w-full min-h-screen'>
        {['#63B96C', '#C8B2E5', '#325DC0', '#7E549F', '#F2A156'].map((item, i) => {
          return <DeckCard key={item} color={item} i={i} user={user} portfolio={portfolio} />;
        })}
      </motion.div>
      <div className='relative flex items-center  w-full h-full py-20'>
        <div className='min-w-[50%] min-h-full flex flex-col items-center justify-evenly space-y-20'>
          <FramerAnimateOV direction={'up'} className='responsiveHeading text-white'>
            WHO
            <p className='ml-20'> AM I?</p>
          </FramerAnimateOV>
          <FramerAnimateOV direction={'up'} className='text-xl text-white flex flex-col'>
            <div>[DESIGNATION]</div>
            <div>{portfolio.jobTitle[0]}</div>
          </FramerAnimateOV>
        </div>
        <div className='min-w-[50%] h-full flex items-center justify-center'>
          <FramerAnimateOV direction={'up'} className='text-9xl text-white'>
            <Image src={user.picturePath} height={1000} width={500} className=' shadow-[25px_25px_#F2A156]' alt='User' />
          </FramerAnimateOV>
        </div>
      </div>
      <div className='relative flex items-center justify-between w-full h-full '>
        <div className='min-h-full w-[50%] flex flex-col items-center justify-around'>
          <FramerAnimateOV direction={'up'} className='responsiveText flex flex-col items-center text-white min-w-[50%] space-y-8'>
            <p className='text-center text-xl'>[PART ONE]</p>
            <p className='w-full sm:w-[60%]'>{portfolio.whatYouDo}</p>
          </FramerAnimateOV>
        </div>
        <div className=' flex-1 min-w-[50%] h-full flex items-center justify-center'>
          <FramerAnimateOV direction={'up'} className='responsiveHeading text-white'>
            WHAT I DO
          </FramerAnimateOV>
        </div>
      </div>
      {projects?.length > 0 && (
        <div className='space-y-40'>
          <div className='relative flex items-center justify-center w-full h-full '>
            <div className='min-h-full flex flex-col items-center justify-around'>
              <FramerAnimateOV direction={'up'} className='responsiveText flex flex-col items-center text-white min-w-[50%] space-y-2 sm:space-y-8'>
                <p className='text-center text-xl'>[PART TWO]</p>
                <p className='w-full sm:w-[60%]'>Where I describe projects that I selected to present and show my skills through it.</p>
              </FramerAnimateOV>
            </div>
            <div className=' flex-1 min-w-[50%] h-full flex items-center justify-center'>
              <FramerAnimateOV direction={'up'} className='responsiveHeading text-white'>
                PROJECTS
              </FramerAnimateOV>
            </div>
          </div>
          {projects.slice(0, showMore ? projects.length : 3).map((item) => {
            const { projectName, projectDesc, projectImage, githubLink, liveLink } = item;
            return (
              <div key={item._id} className='relative flex flex-col sm:flex-row items-center justify-center w-full h-full space-y-5 sm:space-y-0 '>
                <div className='min-h-full min-w-[50%] flex flex-col items-center justify-around'>
                  <FramerAnimateOV direction={'up'} className='responsiveText text-white min-w-[50%] space-y-2 sm:space-y-8'>
                    <p className='text-center responsiveHeading3'>[{projectName}]</p>
                    <p>{projectDesc} </p>
                  </FramerAnimateOV>
                </div>
                <div className=' min-w-[50%] h-full flex items-center justify-center text-center'>
                  <FramerAnimateOV direction={'up'} className=' text-white'>
                    <Image src={projectImage} height={1000} width={500} alt='User' layout='responsive' className='min-w-[500px] min-h-[500px] max-w-[500px] max-h-[500px] object-cover' />
                  </FramerAnimateOV>
                </div>
              </div>
            );
          })}
          {!showMore && (
            <p
              onClick={() => {
                setShowMore(true);
              }}
              className='responsiveHeading3 text-center text-white hover:underline cursor-pointer'
            >
              Show more...
            </p>
          )}
        </div>
      )}
      <div className='relative flex items-center justify-between w-full h-full '>
        <div className='min-h-full w-[50%] flex flex-col items-center justify-around'>
          <FramerAnimateOV direction={'up'} className='responsiveText flex flex-col items-center text-white min-w-[50%] space-y-8'>
            <p className='text-center text-xl'>[PART THREE]</p>
            <p className='w-full sm:w-[100%]'>E-mail :- {user.email}</p>

            <p className='w-full sm:w-[100%]'>LinkedIn :- {portfolio.socials?.LinkedIn}</p>
            <p className='w-full sm:w-[100%]'>Instagram :- {portfolio.socials?.Instagram}</p>
            <p className='w-full sm:w-[100%]'>GitHub :- {portfolio.socials?.GitHub}</p>
          </FramerAnimateOV>
        </div>
        <div className=' flex-1 min-w-[50%] h-full flex items-center justify-center'>
          <FramerAnimateOV direction={'up'} className='responsiveHeading text-white text-center'>
            CONNECT
            <br /> WITH ME
          </FramerAnimateOV>
        </div>
      </div>
    </main>
  );
}
