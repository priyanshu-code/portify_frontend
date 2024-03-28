'use client';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { AiOutlineLink, AiOutlineLinkedin, AiOutlineInstagram, AiOutlineGithub, AiOutlineMail } from 'react-icons/ai';
import { FramerAnimateOV } from '@/components/Home/FramerAnimateOV';
export default function Framer({ user, portfolio, projects }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { url } = useSelector((store) => store.Global);
  const GitHub = portfolio.socials?.GitHub || '';
  const LinkedIn = portfolio.socials?.LinkedIn || '';
  const Instagram = portfolio.socials?.Instagram || '';

  const about = useRef(null);
  const home = useRef(null);
  const project = useRef(null);
  const contact = useRef(null);

  const handleClick1 = () => {
    home.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  const handleClick2 = () => {
    about.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  const handleClick3 = () => {
    project.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  const handleClick4 = () => {
    contact.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  return (
    <main className='bg-black text-white px-8 space-y-20  sm:px-[96px] sm:space-y-[92px] overflow-hidden w-full'>
      <nav
        className={
          !isOpen
            ? 'sticky top-0 flex flex-row items-center min-h-[4rem] bg-black/[0.9] px-6 text-white text-xl '
            : 'pt-[4rem] min-h-[100vh] min-w-[100vw] max-h-[100vh] max-w-[100vw] fixed top-0 flex flex-col items-center  bg-zinc-900 px-6 scroll-m-0'
        }
      >
        <h1 className={`font-bold text-transparent text-white ${!isOpen ? 'text-2xl sm:text-4xl' : 'text-2xl sm:text-4xl'}`}>{user.firstname + ' ' + user.lastname}</h1>
        <div className='block md:hidden ml-auto '>
          <button
            onClick={() => {
              if (!isOpen) setIsOpen(true);
              else setIsOpen(false);
            }}
            className='fixed h-16 w-20 top-0 right-5 rounded-full flex items-center '
          >
            <span className='relative min-w-full min-h-full flex items-center justify-center '>
              <span className={`absolute bg-white w-10 h-[1px]  transfrom-all duration-300 ${isOpen ? ' rotate-[42deg]' : '-rotate-[0deg] top-[42%]'}`}></span>
              <span className={`absolute bg-white w-10 h-[1px]  transfrom-all duration-300 ${isOpen ? '-rotate-[42deg]' : 'rotate-[0deg] top-[58%]'}`}></span>
              <svg className=' absolute bottom-0  h-[1rem] w-[5rem]   rotate-90 '>
                <path d='M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80' stroke='black' />
              </svg>
            </span>
          </button>
        </div>
        <ul onClick={() => setIsOpen(false)} className={!isOpen ? 'hidden ml-auto md:flex items-center space-x-5 ' : ' font-semibold mt-5 flex flex-col items-center space-y-16 text-4xl text-white '}>
          <li onClick={handleClick1} className='group  cursor-pointer'>
            <h1>Home</h1>
            <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-white'></span>
          </li>
          <li onClick={handleClick2} className='group  cursor-pointer'>
            <h1>About</h1>
            <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-white'></span>
          </li>
          <li onClick={handleClick3} className='group  cursor-pointer'>
            <h1>Projects</h1>
            <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-white'></span>
          </li>
          <li onClick={handleClick4} className='group  cursor-pointer'>
            <h1>Contact</h1>
            <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-white'></span>
          </li>
        </ul>
      </nav>
      <div className=''>
        <h1 data-aos='fade-down' data-aos-duration='800' className=' font-bold sm:text-[4rem] xl:text-[6rem] text-[1.9rem] pb-[2rem]  '>
          Hello — I&apos;m {user.firstname}.
        </h1>
        <h1 data-aos='fade-down' data-aos-delay='200' data-aos-duration='1000' className=' font-bold sm:text-[4rem] xl:text-[6rem]  text-[2rem]'>
          I am a {portfolio.jobTitle[0]}
        </h1>
        <div>
          <h1
            data-aos='fade-right'
            data-aos-delay='400'
            data-aos-duration='800'
            className='py-[50px]  lg:text-3xl sm:text-xl text-xl font-[500] xl:leading-relaxed  sm:leading-relaxed leading-relaxed'
          >
            {portfolio.whatYouDo}
          </h1>
        </div>
      </div>
      <div ref={about} className=''>
        <h1 data-aos='fade-down' data-aos-duration='800' className=' font-bold sm:text-[5rem] text-[4rem]'>
          About Me
        </h1>
        <div className='sm:py-[30px] flex justify-between sm:flex-col lg:flex-row flex-col'>
          <h1
            data-aos='fade-down'
            data-aos-delay='300'
            data-aos-duration='800'
            className=' w-[70vw] font-bold lg:text-3xl sm:text-2xl text-lg xl:leading-relaxed  sm:leading-relaxed leading-relaxed  py-[3rem] '
          >
            {portfolio.whatYouDo}
          </h1>
        </div>
      </div>
      <div ref={project} className=''>
        <h1 data-aos='fade-down' data-aos-duration='800' className='font-bold sm:text-[5rem] lg:text-[6rem] text-[3rem]'>
          Projects
        </h1>
        <div className=' flex-col justify-center items-center'>
          {projects?.length > 0 &&
            projects.slice(0, showModal ? projects.length : 3).map((item, i) => {
              const { githubLink, liveLink, projectImage, projectName, projectDesc } = item;
              return (
                <div key={i} className=''>
                  <h1 className=' font-bold sm:text-[10rem] lg:text-[20rem] text-[6rem]'>0{i + 1}</h1>
                  <FramerAnimateOV direction={'left'} className='group relative flex items-center justify-center  lg:w-[90vw] lg:h-[95vh]  bg-[#1f1f1f] rounded-3xl hover:bg-[#37373f]'>
                    <div className='sm:w-full sm:h-full lg:w-[85vw] lg:h-[87vh] cursor-pointer'>
                      <img className='h-full w-full rounded-2xl object-cover' src={projectImage}></img>
                    </div>
                    <div className='z-[2] rounded-2xl absolute flex justify-center items-center h-full w-screen bg-gradient-to-t from-black opacity-0 group-hover:opacity-60'>
                      <Link className={liveLink ? 'cursor-pointer px-[3rem]' : 'hidden'} target='_blank' href={liveLink}>
                        <AiOutlineLink size={50} />
                      </Link>
                      <Link className={githubLink ? 'cursor-pointer' : 'hidden'} target='_blank' href={githubLink}>
                        <AiOutlineGithub size={50} />
                      </Link>
                    </div>
                  </FramerAnimateOV>
                  <div className='py-[4rem] px-[2rem]'>
                    <h1 data-aos='fade-down' data-aos-duration='800' className='font-bold sm:text-[4rem] lg:text-[5rem] text-[2rem]'>
                      {projectName}
                    </h1>
                    <h1
                      data-aos='fade-down'
                      data-aos-delay='300'
                      data-aos-duration='800'
                      className='py-[2rem] w-[70vw] font-bold lg:text-3xl sm:text-2xl text-lg xl:leading-relaxed  sm:leading-relaxed leading-relaxed  text-[#787878] '
                    >
                      {projectDesc}
                    </h1>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {!showModal && (
        <div className='flex justify-center items-center'>
          <h1 onClick={() => setShowModal(true)} className='text-white cursor-pointer py-[2rem] font-[500] text-2xl hover:opacity-80'>
            See More...
          </h1>
        </div>
      )}
      <div ref={contact} className=''>
        <h1 data-aos='fade-down' data-aos-duration='800' className='font-bold sm:text-[4rem] lg:text-[5rem] text-[2rem]'>
          Contact Me
        </h1>
        <div className='sm:py-[5rem] flex justify-between items-center flex-col lg:flex-row py-[2rem]'>
          <div className='flex items-center'>
            <AiOutlineMail size={50} />
            <h1 className='xs:text-lg sm:text-3xl md:text-4xl text-2xl font-bold pl-2 py-10'>{user.email}</h1>
          </div>
          <div className='flex items-center justify-center'>
            <Link className={Instagram ? 'hover:text-fuchsia-500 cursor-pointer px-[1rem] sm:px-[2rem]' : 'hidden'} target='_blank' href={Instagram}>
              <AiOutlineInstagram size={50} />
            </Link>
            <Link className={LinkedIn ? 'cursor-pointer pr-[1rem] hover:text-blue-600 sm:pr-[2rem]' : 'hidden'} target='_blank' href={LinkedIn}>
              <AiOutlineLinkedin size={50} />
            </Link>
            <Link className={GitHub ? 'hover:text-gray-500 cursor-pointer' : 'hidden'} target='_blank' href={GitHub}>
              <AiOutlineGithub size={50} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
