import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDashActive } from '@/features/dashboard/dashboardSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { getUser } from '@/features/user/userSlice';
import { Button, Switch, Textarea, Input, useToast } from '@/components/ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { IoIosArrowBack } from 'react-icons/io';
import axios from 'axios';
import { projectSchema } from '@/components/models/Project/Project';
import { skills } from '../Data';
import TechnologySelector from './TechnologySelector';
import TagSelector from './TagSelector';
import { getAllProjects } from '@/features/project/projectSlice';

import { createProject } from '@/features/project/projectSlice';
export default function AddProject() {
  const { toast } = useToast();
  const { user, token } = useSelector((store) => store.User);
  const { url } = useSelector((store) => store.Global);
  const { projects } = useSelector((store) => store.Project);
  const { portfolio } = useSelector((store) => store.Portfolio);
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const [currentTechnologies, setCurrentTechnologies] = useState([]);
  const [currentTags, setCurrentTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [technologies, setTechnologies] = useState([]);

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: '',
      projectDesc: '',
      projectImage: '',
      githubLink: '',
      liveLink: '',
      showcase: false,
    },
  });
  // 2. Define a submit handler.
  const formData = new FormData();
  async function onSubmit(values) {
    formData.append('projectName', values.projectName);
    formData.append('projectDesc', values.projectDesc);
    formData.append('picture', image);
    formData.append('liveLink', '');
    formData.append('githubLink', '');
    formData.append('technologies', technologies);
    formData.append('projectTags', tags);
    formData.append('showcase', values.showcase);
    dispatch(createProject(formData));
  }
  function handleImage(e) {
    const file = e.target.files[0];
    if (!file || file.type.split('/')[0] !== 'image') {
      setImage('error');
      return;
    }
    setImage(file);
  }
  function importSkills(e) {
    e.preventDefault();
    setCurrentTechnologies((prev) => Array(...new Set([...prev, ...portfolio.skills])));
  }
  function removeTechnologies(e) {
    e.preventDefault();
    setCurrentTechnologies([]);
  }
  const getTech = (tech) => {
    setTechnologies(tech);
  };
  const getTags = (tags) => {
    setTags(tags);
  };
  const showcaseMessage = user.showcaseProjects >= 3 ? 'You can have upto 3 projects on showcase.' : 'Showcasing a project puts it on explore page.';
  return (
    <div className="grid grid-cols-1 w-full place-items-center space-y-5">
      <div className="w-full grid grid-cols-7">
        <Button
          onClick={() => {
            dispatch(setDashActive('Projects'));
          }}
          className=" p-5 lg:p-6 space-x-2 max-w-[100px]"
        >
          <IoIosArrowBack size={25} />
        </Button>
        <div className="space-y-2 col-start-2 col-span-5 text-center">
          <h1 className="responsiveHeading3 font-semibold">Create New Project</h1>
          <h1 className="responsiveText2 text-gray-500">Create a Unique Portfolio Presence.</h1>
        </div>
        <p></p>
      </div>
      <div className="flex flex-col items-center w-full sm:max-w-[500px] space-y-4 px-3 pb-3">
        {projects?.length >= 6 && <p className="text-destructive text-sm text-center">Only 6 projects are allowed at most</p>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name *</FormLabel>
                  <FormControl>
                    <Input className="customInput" placeholder="Project Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectDesc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description *</FormLabel>
                  <FormControl>
                    <Textarea className="customInput min-h-[6rem]" placeholder="Project Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Image *</FormLabel>

                  <FormControl
                    onChange={(e) => {
                      handleImage(e);
                    }}
                  >
                    <Input className="customInput" style={{ cursor: 'pointer' }} type="file" accept="image/*" {...field} />
                  </FormControl>
                  {image === 'error' && <FormDescription className="text-destructive">Invalid image type</FormDescription>}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between space-x-3 max-w-full">
              <FormField
                control={form.control}
                name="githubLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Github Link</FormLabel>
                    <FormControl>
                      <Input className="customInput" placeholder="Github Link" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="liveLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live Link</FormLabel>
                    <FormControl>
                      <Input className="customInput" placeholder="Live Link" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Technologies */}
            <FormItem>
              <TechnologySelector
                currentArr={currentTechnologies}
                suggestedArr={skills}
                label="Technologies"
                placeholder="Technologies"
                getTech={getTech}
                maxLength={15}
              />
            </FormItem>
            <div className="flex justify-between space-x-3 max-w-full">
              <Button onClick={importSkills} className="self-end">
                Add from skills
              </Button>
              <Button className="self-end" onClick={removeTechnologies}>
                Remove All
              </Button>
            </div>
            {/* Tags Section */}
            <FormItem>
              <TagSelector currentArr={currentTags} label="Tags" placeholder="Eg. Frontend, Backend..." getTags={getTags} maxLength={25} />
            </FormItem>
            <FormField
              control={form.control}
              name="showcase"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between space-x-4 rounded-lg border p-4">
                  <div className="space-y-1">
                    <FormLabel className="text-base">Showcase</FormLabel>
                    <FormDescription className={user.showcaseProjects >= 3 ? 'text-destructive' : ''}>
                      {showcaseMessage}
                      <br />
                      Put your best projects on showcase to get recruiters attention.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch disabled={user.showcaseProjects >= 3} checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="min-w-full flex justify-end sm:justify-center">
              <Button disabled={projects?.length >= 6 || image === 'error'} type="submit">
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
