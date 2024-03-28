'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { motion as m, useInView } from 'framer-motion';
import { Perspective } from '@/components/FramerMotion/Persoective';
import { FramerAnimateOV } from '@/components/FramerMotion/TextAppers';
import { AiOutlineLink, AiOutlineLinkedin, AiOutlineInstagram, AiOutlineGithub, AiOutlineMail } from 'react-icons/ai';
const Creative = ({ user, portfolio, projects }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { url } = useSelector((store) => store.Global);

  const GitHub = portfolio.socials?.GitHub || '';
  const LinkedIn = portfolio.socials?.LinkedIn || '';
  const Instagram = portfolio.socials?.Instagram || '';

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <main className='relative bg-[#fffefa] w-full text-black px-8 space-y-20  sm:px-[96px] sm:space-y-[92px] min-h-full  overflow-hidden'>
      <m.span ref={ref} className='absolute top-[50%] right-[-4%] blur-[10rem] bg-gradient-to-r from-purple-700 to-sky-700  min-h-[5%] min-w-[40%] rounded-[100%] '></m.span>
      <m.span ref={ref} className='absolute top-[30%] left-[-4%] blur-[10rem] bg-gradient-to-r from-purple-700 to-[#cb0f9c]  min-h-[5%] min-w-[40%] rounded-[100%] '></m.span>
      <m.span ref={ref} className='absolute top-[70%] left-[-4%] blur-[10rem] bg-gradient-to-r from-[#fe6d44] to-[#faa333]  min-h-[5%] min-w-[40%] rounded-[100%] '></m.span>
      <m.span ref={ref} className='absolute top-[80%] right-[-4%] blur-[10rem] bg-gradient-to-r from-[#007cf0] to-[#00dfd8]  min-h-[5%] min-w-[40%] rounded-[100%] '></m.span>
      <div className='flex-col justify-between items-center'>
        <div className='flex-col justify-start items-center font-[500]  text-[4rem] sm:text-[7rem] lg:text-[10rem]'>
          <h1 className='bg-gradient-to-r from-[#8226c5] to-[#cb0f9c] bg-clip-text text-transparent sm:mb-[-8%] xl:mb-[-6%] mb-[-7%] '>{user.firstname}</h1>
          <div>
            <h1 className='bg-gradient-to-r from-[#8226c5] to-[#cb0f9c] bg-clip-text text-transparent'>{user.lastname}</h1>
          </div>
        </div>
        <div className='leading-relaxed tracking-tight sm:tracking-tighter sm:leading-relaxed font-[300] text-[#ff810c] text-2xl sm:text-[3rem] lg:text-[4rem] sm:pt-[5rem] pt-[3rem]'>
          <h1>{portfolio.whatYouDo}</h1>
        </div>
        <div className='sm:pt-[10rem] pt-[3rem] flex lg:flex-row flex-col justify-between items-start lg:space-y-0 sm:space-y-[5rem] space-y-[1rem]'>
          <div className=' flex-col justify-center items-center'>
            <h1 className='sm:tracking-wide font-[500] text-4xl sm:text-[4rem] lg:text-[5rem]'>About Me</h1>
            <h1 className='text-[#9775f5] sm:pt-[2rem] lg:pt-[5rem] pt-[2rem] leading-relaxed tracking-tight sm:tracking-tighter sm:leading-relaxed font-[300] text-2xl sm:text-[3rem] lg:text-[4rem] '>
              {portfolio.aboutMe}
            </h1>
          </div>
        </div>
        <div className=' flex flex-col pt-[3rem] sm:pt-[10rem] justify-center items-center space-y-10 pb-20'>
          <h1 className=' font-[500] sm:text-[4rem] lg:text-[6rem]'>My works</h1>
          {projects.slice(0, showModal ? projects.length : 3).map((item, i) => {
            const { projectName, projectImage, projectDesc, liveLink, githubLink } = item;
            return (
              <>
                <Perspective key={i} src={projectImage} className={' sm:border-[40px] border-gray-200 rounded-2xl overflow-hidden '} height={1000} width={1000} perspective={800} alt={projectName} />
                <FramerAnimateOV direction={'up'} delay={0.2}>
                  <div className='pt-[2rem] flex-col justify-center items-center space-y-10 sm:space-y-20'>
                    <div className='flex justify-between items-center'>
                      <h1 className='text-[2rem] sm:text-[4rem]'>{projectName}</h1>
                      <div className='flex items-center justify-center'>
                        <Link className={liveLink ? 'cursor-pointer px-[1rem] sm:px-[2rem] hover:text-gray-600' : 'hidden'} target='_blank' href={liveLink}>
                          <AiOutlineLink className='sm:text-[4rem] text-[2rem]' />
                        </Link>
                        <Link className={githubLink ? 'cursor-pointer hover:text-gray-600' : 'hidden'} target='_blank' href={githubLink}>
                          <AiOutlineGithub className='sm:text-[4rem] text-[2rem]' />
                        </Link>
                      </div>
                    </div>
                    <div className=''>
                      <h1 className='text-[1.5rem] sm:text-[2rem] text-[#92999e]'>{projectDesc}</h1>
                    </div>
                  </div>
                </FramerAnimateOV>
              </>
            );
          })}
        </div>
        {!showModal && (
          <div className='flex justify-center items-center'>
            <h1 onClick={() => setShowModal(true)} className='z-[1] text-black cursor-pointer py-[2rem] font-[500] text-2xl sm:text-[3rem] hover:text-gray-500'>
              See More...
            </h1>
          </div>
        )}
        <div className='pt-[4rem]'>
          <h1 className='text-black font-[400] sm:text-[4rem] lg:text-[5rem] text-[2rem]'>Contact Me</h1>
          <div className='sm:py-[3rem] flex flex-col justify-center items-start py-[1.5rem] '>
            <h1
              onClick={() => window.open(`mailto:${user.email}?subject=Hello from Portify`)}
              className='cursor-pointer text-[#9966ff] hover:underline lg:text-[4.5rem] sm:text-[3rem] text-2xl font-[400] pt-4'
            >
              Say Hello
            </h1>
            <Link className={Instagram ? 'text-fuchsia-500 hover:underline cursor-pointer  text-[1.5rem] sm:text-[3rem] lg:text-[4.5rem]' : 'hidden'} target='_blank' href={Instagram}>
              Instagram
            </Link>
            <Link className={LinkedIn ? 'hover:underline cursor-pointer text-[1.5rem] sm:text-[3rem] lg:text-[4.5rem] text-blue-600 ' : 'hidden'} target='_blank' href={LinkedIn}>
              LinkedIn
            </Link>
            <Link className={GitHub ? 'hover:underline text-gray-500 cursor-pointer text-[1.5rem] sm:text-[3rem] lg:text-[4.5rem]' : 'hidden'} target='_blank' href={GitHub}>
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Creative;
