import { useDispatch, useSelector } from 'react-redux';
import ProjectCard from '@/components/Dashboard/Projects/ProjectCard';
import Loading from '@/components/Loading/Loading';
import { Button } from '@/components/ui';
import { setDashActive } from '@/features/dashboard/dashboardSlice';
import { MdOutlineClose } from 'react-icons/md';
import { useEffect } from 'react';
export default function Projects() {
  const { projects, projectLoading } = useSelector((store) => store.Project);
  const dispatch = useDispatch();
  if (projectLoading) {
    return <Loading />;
  }
  // if (projectError) {
  //   return (
  //     <div className="flex flex-col space-y-5 ">
  //       <div className="flex items-start justify-between">
  //         <div className="space-y-2">
  //           <h1 className="responsiveHeading3 font-semibold">Projects</h1>
  //           <h1 className="responsiveText2 text-red-500">An error encountered while loading projects</h1>
  //         </div>
  //       </div>
  //       <h1
  //         onClick={() => {
  //           dispatch(getAllProjects());
  //           router.refresh();
  //         }}
  //         className="responsiveHeading3 font-semibold cursor-pointer hover:underline"
  //       >
  //         Click here to reload
  //       </h1>
  //     </div>
  //   );
  // }
  let projectsMap = '';
  if (projects?.length === 0) {
    return (
      <div className='flex flex-col space-y-5'>
        <div className='flex items-center justify-between'>
          <div className='space-y-2'>
            <h1 className='responsiveHeading3 font-semibold'>Projects</h1>
            <h1 className='responsiveText2 text-gray-500'>View and manage your projects.</h1>
          </div>
          <Button
            className='text-xl'
            onClick={() => {
              dispatch(setDashActive('Add Project'));
            }}
          >
            CREATE
          </Button>
        </div>
        <h1 className='text-2xl md:text-3xl lg:text-4xl text-center m-4'>You currently don&apos;t have any projects</h1>
      </div>
    );
  } else {
    projectsMap = projects?.map((item, i) => {
      const { _id } = item;
      return <ProjectCard key={_id} {...item} />;
    });
  }
  return (
    <div className='flex flex-col space-y-5'>
      <div className='flex items-center justify-between'>
        <div className='space-y-2'>
          <h1 className='responsiveHeading3 font-semibold'>Projects</h1>
          <h1 className='responsiveText2 text-gray-500'>View and manage your projects.</h1>
        </div>
        <Button
          onClick={() => {
            dispatch(setDashActive('Add Project'));
          }}
          className=' p-5 lg:p-6 space-x-3'
        >
          <MdOutlineClose size={20} className=' rotate-45' /> <p>Add Project</p>
        </Button>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5'>{projectsMap}</div>
    </div>
  );
}
