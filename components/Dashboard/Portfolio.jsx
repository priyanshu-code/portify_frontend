import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePortfolio } from '@/features/portfolio/portfolioSlice';
import { Button, Input, Textarea } from '@/components/ui';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { aboutMeSchema } from '../models/Portfolio/Portfolio';
import Link from 'next/link';
import { MdArrowOutward } from 'react-icons/md';
import JobTitle from './JobTitle';
import Skills from './Skills';
import Socials from './Socials';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

export default function Portfolio() {
  const aboutMeRef = useRef(null);
  const skillsRef = useRef(null);
  const jobTitleRef = useRef(null);
  const { portfolio } = useSelector((store) => store.Portfolio);
  const { subService } = useSelector((store) => store.Dashboard);
  const dispatch = useDispatch();
  const [y, setY] = useState(0);

  //Destructure props
  const { aboutMe, template } = portfolio;
  const [skills, setSkills] = useState(portfolio?.skills || []);
  const [jobTitle, setJobTitle] = useState(portfolio?.jobTitle || []);
  const [jobTitleValue, setJobTitleValue] = useState('');
  const [skillFieldeValue, setSkillFieldValue] = useState('');

  // About me form section
  const aboutMeForm = useForm({
    resolver: zodResolver(aboutMeSchema),
    defaultValues: {
      aboutMe,
    },
  });

  // Update portfolio button
  const handleUpdatePortfolio = async () => {
    const isValid = await aboutMeForm.trigger();
    const { aboutMe } = aboutMeForm.getValues();
    if (isValid) {
      const data = { skills, jobTitle, aboutMe };
      dispatch(updatePortfolio(data));
    } else {
      aboutMeForm.setFocus('aboutMe');
    }
  };

  // Skill use Effect
  useEffect(() => {
    if (skillsRef.current?.offsetTop) setY(skillsRef.current?.offsetTop);
  }, [skillFieldeValue]);

  // Job title use Effect
  useEffect(() => {
    if (jobTitleRef.current?.offsetTop || jobTitleRef.current?.offsetTop === 0) setY(jobTitleRef.current?.offsetTop);
  }, [jobTitleValue]);

  const getSkills = (skills) => {
    setSkills(skills);
  };
  const onSkillValueChange = (value) => {
    setSkillFieldValue(value);
  };

  // Skills Form
  const skillsForm = (
    <div ref={skillsRef} className='w-full space-y-2'>
      <div>
        <h1 className='responsiveHeading4 font-semibold'>Skills</h1>
        <h1 className='responsiveText3 text-gray-500'>Add your skills (Langauage/Tech Stacks).</h1>
      </div>
      <Skills getSkills={getSkills} onSkillValueChange={onSkillValueChange} portfolio={portfolio} />
    </div>
  );

  // About form
  const aboutForm = (
    <div ref={aboutMeRef}>
      <Form {...aboutMeForm} className='w-full space-y-2'>
        <form onSubmit={aboutMeForm.handleSubmit()} className='space-y-4 min-w-full'>
          <div>
            <h1 className='responsiveHeading4 font-semibold'>About Yourself</h1>
            <h1 className='responsiveText3 text-gray-500'>Share a glimpse of who you are and your interests.</h1>
          </div>
          <FormField
            control={aboutMeForm.control}
            name='aboutMe'
            render={({ field }) => (
              <FormItem>
                <FormControl
                  onChange={async () => {
                    if (aboutMeRef.current?.offsetTop) setY(aboutMeRef.current?.offsetTop);
                    await aboutMeForm.trigger();
                  }}
                >
                  <Textarea className='customInput min-h-[8rem]' placeholder='About me' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );

  const getJobTitle = (titles) => {
    setJobTitle(titles);
  };
  const onJobTitleChange = (value) => {
    setJobTitleValue(value);
  };

  //Job title form
  const jobTitleForm = (
    <form ref={jobTitleRef} className='space-y-2' onSubmit={(e) => e.preventDefault()}>
      <div>
        <h1 className='responsiveHeading4 font-semibold'>Job Title</h1>
        <h1 className='responsiveText3 text-gray-500'>Highlight your current role or standout skills.</h1>
      </div>
      {/* Job Title */}
      <div className='max-w-full'>
        <JobTitle getJobTitle={getJobTitle} portfolio={portfolio} onJobTitleChange={onJobTitleChange} />
      </div>
    </form>
  );

  // Template form
  const templateForm = (
    <div className='space-y-2'>
      <div>
        <h1 className='responsiveHeading4 font-semibold'>Current Template</h1>
        <h1 className='responsiveText3 text-gray-500'>We are currently working on modular/customisable templates.</h1>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <Input className='cursor-default text-center font-semibold' value={template} readOnly />
        <Link className='peer' target='_blank' href='/templates'>
          <Button className='w-full flex group' type='button'>
            Change
            <MdArrowOutward className='pb-1 group-hover:pb-2 transition-all duration-300 ' size={20} />
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className='flex flex-col space-y-10 min-h-screen w-full'>
      <div className='space-y-2'>
        <h1 className='responsiveHeading3 font-semibold'>Portfolio</h1>
        <h1 className='responsiveText2 text-gray-500'>View and manage your portfolio details.</h1>
      </div>
      <div className='grid grid-cols-1 place-items-center'>
        {subService === 'Manage' && (
          <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -100, opacity: 0 }} className='relative w-full max-w-[min(800px,95%)] space-y-10'>
            {jobTitleForm}
            {skillsForm}
            {aboutForm}
            {templateForm}
            <motion.div style={{ y: y - 40 }} className='absolute right-0 top-0 transition-all duration-300'>
              <Button className='sm:w-40 sm:h-10' onClick={handleUpdatePortfolio}>
                Save
              </Button>
            </motion.div>
          </motion.div>
        )}
        {subService === 'Socials' && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -100, opacity: 0 }} className='w-full max-w-[min(800px,95%)] space-y-10'>
            <Socials />
          </motion.div>
        )}
      </div>
    </div>
  );
}
