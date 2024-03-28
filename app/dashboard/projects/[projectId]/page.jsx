'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { updateProject, deleteProject } from '@/features/project/projectSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// UI Components
import { Button, Textarea, Input, Switch, Label } from '@/components/ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';

// Custom Components
import TechnologySelector from '@/components/Dashboard/Projects/TechnologySelector';
import TagSelector from '@/components/Dashboard/Projects/TagSelector';

// Data
import { skills } from '@/components/Dashboard/Data';

// Schemas
import { projectSchema } from '@/components/models/Project/Project';

export default function Projects({ params }) {
  const { projectId } = params;
  const { user } = useSelector((store) => store.User);
  const { projects } = useSelector((store) => store.Project);
  const { portfolio } = useSelector((store) => store.Portfolio);
  const dispatch = useDispatch();
  const router = useRouter();
  const [project, setProject] = useState(
    projects?.filter((proj) => {
      return proj._id === projectId;
    })[0] || undefined
  );
  const [image, setImage] = useState('');
  const [currentTechnologies, setCurrentTechnologies] = useState(
    project?.technologies.length === 1 && project?.technologies[0] === '' ? [] : project?.technologies || []
  );
  const [currentTags, setCurrentTags] = useState(
    project?.projectTags.length === 1 && project?.projectTags[0] === '' ? [] : project?.projectTags || []
  );
  const [tags, setTags] = useState([]);
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    setProject(
      projects?.filter((proj) => {
        return proj._id === projectId;
      })[0]
    );
  }, [projects, project, projectId]);
  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: project?.projectName || '',
      projectDesc: project?.projectDesc || '',
      projectImage: project?.projectImage || '',
      githubLink: project?.githubLink || '',
      liveLink: project?.liveLink || '',
      showcase: project?.showcase || false,
    },
  });
  const formData = new FormData();
  async function onSubmit(values) {
    formData.append('projectName', values.projectName);
    formData.append('projectDesc', values.projectDesc);
    formData.append('picture', image === '' ? project.projectImage : image);
    formData.append('liveLink', values.liveLink || '');
    formData.append('githubLink', values.githubLink || '');
    formData.append('showcase', values.showcase);
    if (technologies.length !== 0) {
      technologies.forEach((item) => formData.append('technologies[]', item));
    } else {
      formData.append('technologies', []);
    }
    if (tags.length !== 0) {
      tags.forEach((item) => formData.append('projectTags[]', item));
    } else {
      formData.append('projectTags', []);
    }
    dispatch(updateProject({ projectId, formData }));
  }

  // Handle delete
  const handleDelete = () => {
    dispatch(deleteProject({ projectId }));
    router.push('/dashboard');
  };
  // Handle imgae
  function handleImage(e) {
    const file = e.target.files[0];
    if (!file || file.type.split('/')[0] !== 'image') {
      setImage('');
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

  if (!project) {
    return (
      <div className="fullHeight w-screen pt-20">
        <div className="grid grid-cols-1 place-items-center space-y-10">
          <div className="responsiveHeading4">No project with id &apos;&apos;{projectId}&apos;&apos;</div>
          <div className="responsiveHeading4">
            Return to{' '}
            <Link href={'/dashboard'} className="text-blue-500 hover:underline">
              dashboard.
            </Link>
          </div>
        </div>
      </div>
    );
  }
  const showcaseMessage = user.showcaseProjects >= 3 ? 'You can have upto 3 projects on showcase.' : 'Showcasing a project puts it on explore page.';
  return (
    <div className="flex flex-col items-center w-screen px-5 lg:px-10 min-h-screen py-5">
      <h1 className="text-3xl xs:text-3xl sm:text-4xl my-4 font-semibold">Update Project</h1>
      <div className="grid grid-cols-1 w-[min(700px,100%)] lg:w-[min(1200px,100%)] gap-4">
        <Button
          onClick={() => {
            router.back();
          }}
          className="max-w-[100px] col-span-full"
        >
          Back
        </Button>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Col Part 1 */}
            <div className="space-y-2">
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
              <div className="w-full grid grid-cols-2 gap-4">
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
            </div>
            {/* Col Part 2 */}
            <div className="space-y-2">
              {/* Image with label */}
              <div className="space-y-2 flex flex-col">
                <Label>Current Image</Label>
                <Image
                  className="customInput bg-gray-500 hover:bg-gray-500 w-full lg:max-h-[464px] lg:object-scale-down self-center border-solid border-2 border-black rounded-lg lg:aspect-square"
                  src={project.projectImage}
                  height={325}
                  width={475}
                  alt="PorjectImage"
                  name="currentImage"
                ></Image>
              </div>
              <FormField
                control={form.control}
                name="projectImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Image *</FormLabel>
                    <FormControl>
                      <Input className="customInput cursor-pointer" type="file" accept="image/*" onChange={handleImage} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="showcase"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Showcase</FormLabel>
                      <FormDescription className={user.showcaseProjects >= 3 ? 'text-destructive' : ''}>
                        {showcaseMessage}
                        <br />
                        Put your best projects on showcase to get recruiters attention.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        disabled={user.showcaseProjects === 3 && project.showcase === false}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-full flex items-center justify-between ">
              <Button
                className="bg-destructive hover:bg-red-600"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete();
                }}
              >
                Delete
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
