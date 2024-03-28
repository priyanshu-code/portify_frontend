'use client';
import axios from 'axios';
import { StaggerChildren } from '../FramerMotion/StaggerChildren';
const getProjects = async (query) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}exploreSearch` + query);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};
import Card from './Card';
import { FiSearch } from 'react-icons/fi';
import { useState, useRef } from 'react';
export default function ExploreMain({ projects }) {
  const [currentProject, setCurrentProject] = useState(projects);
  const [projectState, setProjectState] = useState({
    loading: false,
    notFound: false,
  });
  const [search, setSearch] = useState('');
  const searchRef = useRef(null);
  const SeachFunction = async (query) => {
    if (query.length > 0) {
      setProjectState({ loading: true, notFound: false });
      const tempQuery = '/?q=' + query.split(' ').join(' ');
      const result = await getProjects(tempQuery);
      if (result?.length === 0) {
        setProjectState({ loading: false, notFound: true });
        setCurrentProject(projects);
      } else {
        setCurrentProject(result?.searchResults);
        setProjectState({ loading: false, notFound: false });
      }
    } else {
      setCurrentProject(projects);
    }
  };
  return (
    <main className='py-10 max-w-screen overflow-hidden min-w-screen'>
      <div className='flex-1 min-w-screen flex items-center justify-center mt-auto'>
        <div className='group text-2xl px-2 py-0 sm:px-8 flex flex-col w-full max-w-[700px]'>
          <div className='flex items-center space-x-4 group'>
            <FiSearch
              onClick={() => {
                searchRef.current.focus();
              }}
              size={30}
              color='gray'
              className='cursor-pointer'
            />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                projectState.notFound ? setProjectState({ loading: false, notFound: false }) : {};
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  SeachFunction(e.target.value.trim().toLowerCase());
                }
              }}
              className='border-none bg-transparent dark:text-white  dark:caret-white focus:outline-none ml-2  focus:ring-0  w-[90%] py-4 placeholder-gray-400 group-hover:placeholder-gray-600 dark:group-hover:placeholder-gray-200'
              placeholder='Search...'
            />
          </div>
          <span className='dark:bg-gray-200 bg-gray-800  h-1 w-[10%] group-hover:w-full transition-all duration-300'></span>
        </div>
      </div>
      {projectState.notFound && <h1 className='text-lg text-center pt-4 sm:pt-8 md:pt-10 lg:pt-[2.5rem]'>No Project found for &apos;&apos;{search}&apos;&apos;</h1>}
      <div className='w-full xl:max-w-[1400px] mx-auto py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {!projectState.loading &&
            currentProject.map((item, i) => {
              return (
                <StaggerChildren key={item._id} delay={i % 4} direction={'left'}>
                  <Card item={item} />
                </StaggerChildren>
              );
            })}
        </div>
      </div>
    </main>
  );
}
