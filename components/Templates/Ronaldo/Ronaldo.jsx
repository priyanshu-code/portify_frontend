'use client';
import Image from 'next/image';
import s from './Ronaldo.module.css';
import arrow from './arrow.png';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineLink, AiOutlineLinkedin, AiOutlineInstagram, AiOutlineGithub } from 'react-icons/ai';
import Link from 'next/link';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { StaggerChildren } from '@/components/FramerMotion/StaggerChildren';
export default function Ronaldo({ user, portfolio, projects }) {
  const about = useRef(null);
  const handleClick = () => {
    about.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  const { url } = useSelector((store) => store.Global);

  const GitHub = portfolio.socials?.GitHub || '';
  const LinkedIn = portfolio.socials?.LinkedIn || '';
  const Instagram = portfolio.socials?.Instagram || '';
  return (
    <main className={s.container}>
      <div className="fixed right-0 top-[20%] min-h-[100vh] z-10">
        <ul className="text-[2rem] md:text-[3rem] lg:text-[4rem] space-y-4 pr-2">
          <li>
            <Link className={LinkedIn ? '' : 'pointer-events-none'} target="_blank" href={LinkedIn}>
              <AiOutlineLinkedin className="cursor-pointer hover:text-blue-600" />
            </Link>
          </li>
          <li>
            <Link className={Instagram ? '' : 'pointer-events-none'} target="_blank" href={Instagram}>
              <AiOutlineInstagram className="cursor-pointer hover:text-fuchsia-500" />
            </Link>
          </li>
          <li>
            <Link className={GitHub ? '' : 'pointer-events-none'} target="_blank" href={GitHub}>
              <AiOutlineGithub className="cursor-pointer hover:text-gray-500" />
            </Link>
          </li>
        </ul>
      </div>
      <div className={s.intro}>
        <section className={s.introSection1}></section>
        <section className={s.introSection2}></section>
        <div className={s.introContent}>
          <p data-aos="fade-up" data-aos-duration="800">
            HEY! I AM
          </p>
          <h1 data-aos="fade-up" data-aos-duration="1000">
            {user.firstname + ' ' + user.lastname}
          </h1>
          <h2 data-aos="fade-up" data-aos-duration="1000">
            {portfolio?.occupation[0]}
          </h2>
          <button onClick={handleClick}>
            <Image onClick={handleClick} src={arrow} alt="arrow"></Image>
          </button>
        </div>
      </div>
      <div className={s.content}>
        <div ref={about} className={s.aboutMeSection}>
          <div className={s.aboutImage}>
            <Image src={user.picturePath} width={500} height={400} alt=""></Image>
          </div>
          <div className={s.aboutMe}>
            <h1 data-aos="fade-up" data-aos-duration="800">
              About me
            </h1>
            <p data-aos="fade-left" data-aos-duration="1000">
              {portfolio.aboutMe}
            </p>
            <ul>
              <li>
                <strong>Name</strong> : {user.firstname + ' ' + user.lastname}
              </li>
              {/* <li>
                <strong>Date of Birth</strong> : 8 September 2002
              </li> */}
              <li>
                <strong>Email</strong> : {user.email}
              </li>
            </ul>
          </div>
        </div>
        {/* <div className={s.whatYouDo}>
          <h1 data-aos="fade-left" data-aos-duration="1000">
            What I do
          </h1>
          <p data-aos="fade-left" data-aos-duration="1000">
            {portfolio.whatYouDo}
          </p>
        </div> */}
        <div className="mt-[5rem] min-w-[70%] max-w-[70%] flex flex-col">
          <h1 data-aos="fade-up" data-aos-duration="800" className="text-[4rem] mb-[4rem] underline">
            Skills
          </h1>
          <div
            data-aos="fade-up"
            data-aos-duration="800"
            className="self-center min-w-[100%] grid text-3xl gap-6 px-6 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
          >
            {portfolio.skills?.map((skillName, i) => {
              return (
                <StaggerChildren className="text-center cursor-none " key={skillName} delay={i}>
                  <Image
                    src={url + `assets/icons/${skillName}/${skillName}-original.svg`}
                    height={100}
                    width={100}
                    alt="skill"
                    className="min-h-20 min-w-20"
                  />
                </StaggerChildren>
              );
            })}
          </div>
        </div>
        <div className="pt-[5rem] min-w-[70%] max-w-[70%] flex flex-col mb-16">
          <h1 className="text-[4rem] mb-[4rem] underline" data-aos="fade-up" data-aos-duration="800">
            My Projects
          </h1>
          <div className="self-center grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 ">
            {/* <div className="columns-3   self-center"> */}
            {projects &&
              projects.map((item, i) => {
                const { githubLink, liveLink, projectImage, projectName, projectDesc } = item;
                return (
                  <div
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-delay={`${i * 50}`}
                    key={item._id}
                    className="group cursor-pointer rounded-lg border-solid border-2  border-black overflow-hidden"
                  >
                    <Image
                      src={projectImage}
                      alt=""
                      className=" relative min-h-32 min-w-20 aspect-[16/10]  group-hover:opacity-[0.1]  object-cover transition-all duration-100 "
                      width={500}
                      height={250}
                    ></Image>
                    <p className="hidden group-hover:block top-[10%] w-full absolute text-center text-4xl text-black pointer-events-none ">
                      {projectName}
                    </p>
                    <p className="hidden group-hover:block top-[35%]  overflow-hidden px-10 w-full absolute text-sm max-h-[4rem] overflow-y-scroll text-center text-black pointer-events-none">
                      {projectDesc}
                    </p>
                    <div className="hidden group-hover:flex top-[70%] w-full absolute  text-4xl  flex-row items-center justify-center space-x-5 ">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Link className={githubLink ? '' : 'pointer-events-none'} target="_blank" href={githubLink}>
                            <AiOutlineGithub />
                          </Link>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-full py-1 px-2 flex justify-between  text-sm">
                          {githubLink ? githubLink : '#'}
                        </HoverCardContent>
                      </HoverCard>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Link className={liveLink ? '' : 'pointer-events-none'} target="_blank" href={liveLink}>
                            <AiOutlineLink />
                          </Link>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-full py-1 px-2 flex justify-between  text-sm">{liveLink ? liveLink : '#'}</HoverCardContent>
                      </HoverCard>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
}
