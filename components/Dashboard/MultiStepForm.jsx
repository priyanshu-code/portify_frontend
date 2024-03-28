import React, { useState, useEffect } from 'react';
import * as z from 'zod';
import { Button, Textarea, Input, useToast } from '@/components/ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { motion, useMotionValue } from 'framer-motion';
import { BsCheck2 } from 'react-icons/bs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createPortfolio } from '@/features/portfolio/portfolioSlice';
import { aboutMeSchema } from '../models/Portfolio/Portfolio';
import Skills from './Skills';
import JobTitle from './JobTitle';
import { socialsSchema } from '../models/Portfolio/Socials';
export default function MultiStepForm() {
  const fromSteps = 3;
  const [currentStep, setCurrentStep] = useState(1);
  const [skills, setSkills] = useState([]);
  const [jobTitle, setJobTitle] = useState([]);

  const dispatch = useDispatch();
  const { toast } = useToast();
  const x = useMotionValue(0);
  //Set next currentStep state
  async function nextStep() {
    if (currentStep <= fromSteps) {
      // Extra validation for step 1
      if (currentStep === 1) {
        if (jobTitle.length > 0) {
          setCurrentStep((prev) => prev + 1);
        } else {
          toast({
            variant: 'destructive',
            title: 'Please add at least 1 job title.',
          });
        }
      } else if (currentStep === 2 && skills.length === 0) {
        toast({
          variant: 'destructive',
          title: 'Please add at least 1 skill.',
        });
      } else if (currentStep === 3) {
        const { aboutMe } = aboutMeForm.getValues();
        const socials = socialForm.getValues();
        // Submit the form
        const data = {
          aboutMe,
          jobTitle,
          socials,
          skills,
          template: 'portifyInteractive',
        };
        dispatch(createPortfolio(data));
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
  }
  // For framer motion animations
  useEffect(() => {
    if (currentStep <= fromSteps) {
      x.set((currentStep - 1) * 80 + 40);
    }
  }, [currentStep, x, fromSteps]);

  // Job title section

  const getJobTitle = (titles) => {
    setJobTitle(titles);
  };
  // About me form section
  const aboutMeForm = useForm({
    resolver: zodResolver(aboutMeSchema),
    defaultValues: {
      aboutMe: '',
      template: 'Portify Interactive',
    },
  });
  const onJobTitleChange = () => {
    // dummy function
    return;
  };
  const aboutForm = (
    <Form {...aboutMeForm} className='w-full'>
      <form onSubmit={aboutMeForm.handleSubmit(nextStep)} className='space-y-4 min-w-full'>
        <div className='space-y-2'>
          <div>
            <h1 className='responsiveHeading4 font-semibold'>Job Title</h1>
            <h1 className='responsiveText3 text-gray-500'>Highlight your current role or standout skills.</h1>
          </div>
          {/* Job Title */}
          <div className='max-w-full'>
            <JobTitle getJobTitle={getJobTitle} portfolio={{ jobTitle: jobTitle }} onJobTitleChange={onJobTitleChange} />
          </div>
        </div>
        <div>
          <h1 className='responsiveHeading4 font-semibold'>About Yourself</h1>
          <h1 className='responsiveText3 text-gray-500'>Share a glimpse of who you are and your interests.</h1>
        </div>
        <FormField
          control={aboutMeForm.control}
          name='aboutMe'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea className='customInput min-h-[8rem]' placeholder='About me' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='space-y-2'>
          <div>
            <h1 className='responsiveHeading4 font-semibold'>Current Template</h1>
            <h1 className='responsiveText3 text-gray-500'>You can change this after creating your portfolio.</h1>
          </div>
          <FormField
            control={aboutMeForm.control}
            name='template'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input disabled className='text-center responsiveHeading4 font-semibold' placeholder='Template' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='min-w-max flex flex-col items-center '>
          <Button type='submit'>Next</Button>
        </div>
      </form>
    </Form>
  );
  // Skills Section
  const getSkills = (skills) => {
    setSkills(skills);
  };
  const onSkillValueChange = () => {
    // dummy function
    return;
  };
  const skillsForm = (
    <div>
      <h1 className='responsiveHeading4 font-semibold'>Skills</h1>
      <h1 className='responsiveText3 text-gray-500'>Add your skills (Langauage/Tech Stacks).</h1>
      <Skills getSkills={getSkills} portfolio={{ skills: skills }} onSkillValueChange={onSkillValueChange} />
      <div className='min-w-full flex justify-center'>
        <Button type='submit' onClick={nextStep}>
          Next
        </Button>
      </div>
    </div>
  );

  //Social Form
  const socialForm = useForm({
    resolver: zodResolver(socialsSchema),
    defaultValues: {
      LinkedIn: 'https://www.linkedin.com',
      GitHub: 'https://github.com',
      Instagram: 'https://www.instagram.com',
    },
  });
  const socialsForm = (
    <Form {...socialForm} className='min-w-full'>
      <form onSubmit={socialForm.handleSubmit(nextStep)} className='space-y-6 w-full '>
        <div>
          <h1 className='responsiveHeading4 font-semibold'>Unlock Your Social Potential</h1>
          <h1 className='responsiveText3 text-gray-500'>Expand your reach and connect with your audience.</h1>
        </div>
        <FormField
          control={socialForm.control}
          name='LinkedIn'
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn</FormLabel>
              <FormControl>
                <Input className='customInput' placeholder='LinkedIn' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={socialForm.control}
          name='GitHub'
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub</FormLabel>
              <FormControl>
                <Input className='customInput' placeholder='GitHub' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={socialForm.control}
          name='Instagram'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram</FormLabel>
              <FormControl>
                <Input className='customInput' placeholder='Instagram' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='min-w-full flex justify-center'>
          <Button type='submit'>Create</Button>
        </div>
      </form>
    </Form>
  );

  return (
    <div className='flex flex-col space-y-6'>
      <div className='space-y-2 grid grid-cols-1 place-items-center'>
        <h1 className='responsiveHeading3 font-semibold'>Create Your portfolio</h1>
        <h1 className='responsiveText2 text-gray-500'>Create a brand new look.</h1>
      </div>
      <div className='grid grid-cols-1 place-items-center w-full h-full'>
        <div className='grid grid-cols-1 place-content-center min-w-[min(95%,600px)] gap-6'>
          {/* Form Navigation/progress */}
          <div className=' flex w-full items-center justify-center'>
            <div className='relative flex items-center justify-center w-[500]'>
              <motion.span style={{ width: x }} className={`absolute h-10 z-20 text left-0 bg-indigo-200 rounded-full transition-all duration-300`}></motion.span>
              <div className='w-full flex items-center gap-10 bg-zinc-100 dark:bg-black'>
                {[...Array(fromSteps).keys()].map((i) => {
                  i++;
                  const stepCompleted = i < currentStep;
                  const iscurrentStep = i === currentStep;
                  return (
                    <div key={i} className='flex items-center justify-center w-[40px] '>
                      <h1
                        onClick={() => {
                          if (stepCompleted) setCurrentStep(i);
                        }}
                        className={`text-xl h-[40px] w-[40px] ${
                          iscurrentStep ? 'bg-black dark:bg-amber-200 dark:text-black text-white' : stepCompleted ? 'bg-emerald-400' : 'bg-zinc-300 dark:bg-slate-500'
                        } z-20 rounded-full flex items-center justify-center cursor-pointer `}
                        key={i}
                      >
                        <p className={stepCompleted ? 'text-black z-20 ' : ''}>{iscurrentStep ? i : stepCompleted ? <BsCheck2 /> : i}</p>
                      </h1>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* From Content */}
          {currentStep === 1 && <div className='w-full'>{aboutForm}</div>}
          {currentStep === 2 && <div className='w-full'>{skillsForm}</div>}
          {currentStep === 3 && <div className='w-full'>{socialsForm}</div>}
          {currentStep === 4 && (
            <div className='w-full mt-24'>
              <motion.div style={{ x: 0, scale: 0 }} animate={{ x: 0, scale: 2.5 }} transition={{ duration: 0.25 }}>
                <h1 className=' font-extrabold text-center text-xs sm:text-xl '>
                  Thank You <br />
                  For Signing up!
                </h1>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
