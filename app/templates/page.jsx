'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getAllTemplates, starTemplate, unStarTemplate } from '@/features/template/templateSlice';
import { getUser } from '@/features/user/userSlice';
import { BsFilter, BsFillHeartFill } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { MdCancel } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Templates() {
  const router = useRouter();
  const { isAuth, user } = useSelector((store) => store.User);
  const { url } = useSelector((store) => store.Global);
  const { allTemplates, templatesLoading } = useSelector((store) => store.Template);
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [search, setSearch] = useState({ value: '', focus: false });
  const ref = useRef(null);
  useEffect(() => {
    dispatch(getAllTemplates());
    dispatch(getUser());
  }, [update, dispatch]);
  const handleClick = async ({ _id }) => {
    if (!isAuth) {
      router.push('/login');
      return;
    }
    setDisabled(true);
    if (user.starredTemplates.includes(_id)) {
      dispatch(unStarTemplate(_id));
    } else {
      dispatch(starTemplate(_id));
    }
    setUpdate(update + 1);
    setTimeout(() => {
      setDisabled(false);
    }, 10);
  };

  return (
    <>
      <main className='flex flex-col items-center min-w-screen max-w-screen overflow-hidden'>
        <h1 className='mt-16 text-2xl sm:text-4xl  md:text-5xl lg:text-5xl text-center font-[600] '>Pick the Website Template You Love</h1>
        <p className='mt-10 text-xl sm:text-2xl  md:text-3xl lg:text-4xl text-center '>Portfolios Website Templates</p>
        {/* Search Input */}
        <div
          className={`${
            search.focus ? 'border-transparent' : ''
          } flex flex-col items-center border-b-[2.5px] border-gray-300/50 w-[40%] min-w-[300px] max-w-[700px] hover:border-gray-400/50   my-[4rem]`}
        >
          <div className='grid grid-cols-[25px_auto_25px] items-center w-[100%] '>
            <FiSearch className='text-xl' />
            <input
              ref={ref}
              onFocus={() => {
                setSearch((prev) => {
                  return { ...prev, focus: true };
                });
              }}
              onBlur={() => {
                setSearch((prev) => {
                  return { ...prev, focus: false };
                });
              }}
              value={search.value}
              onChange={(e) => {
                setSearch((prev) => {
                  return { ...prev, value: e.target.value };
                });
              }}
              className='bg-transparent text-gray-700 outline-none p-2 w-[100%]'
              placeholder='Search portfolios templates'
              type='text'
            />
            {search.value.length > 0 && (
              <MdCancel
                onClick={(e) => {
                  setSearch((prev) => {
                    return { ...prev, value: '' };
                  });
                  ref.current.focus();
                }}
                className='text-gray-600 cursor-pointer text-md hover:text-gray-800'
              />
            )}
            <div className='flex col-span-full items-center justify-center'>
              <span className={`flex h-[2px] ${search.focus ? 'w-[100%]' : 'w-[0%]'} bg-black transition-all duration-300`}></span>
            </div>
          </div>
        </div>
        {/* Filter Input */}
        <div className='flex w-screen max-w-[900px] justify-between items-center p-5'>
          <h1 className='  font-bold text-3xl z-10 pb-5'>All Portfolios Templates</h1>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className='flex items-center justify-between space-x-3'>
                <BsFilter />
                <p>Filter</p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='shadow-xl'>
              <DropdownMenuItem className='cursor-pointer hover:bg-gray-400/80'>Recomended</DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer hover:bg-gray-400/80'>Recent</DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer hover:bg-gray-400/80'>Popular</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className=' flex flex-wrap items-center justify-center max-w-screen px-4 xs:px-10 sm:px-20 gap-20'>
          <span className='fixed -left-[20%] -bottom-[50%] flex items-end justify-start min-w-[200vw] h-[80vh] -z-10 rotate-6'>
            <span className='min-w-[150vw] min-h-[80%] bg-gradient-to-r  from-sky-400 via-pink-500 to-purple-500 blur-[10rem] rounded-full rotate-6'></span>
          </span>

          {(allTemplates !== '' || allTemplates?.length === 0) &&
            allTemplates?.map((items) => {
              const { templateImage, templateName, stars, _id } = items;
              let starred = false;
              if (isAuth) {
                if (user.starredTemplates?.includes(_id)) {
                  starred = true;
                }
              }
              return (
                <div key={_id} className='z-10'>
                  <div className='bg-white rounded-2xl overflow-hidden cursor-pointer group relative flex items-center justify-center max-h-[300px] min-h-[300px] max-sm:min-w-[100%] min-w-[530px] max-w-[530px]'>
                    <Image
                      width={400}
                      height={400}
                      className=' rounded-lg transition-all duration-300 max-h-[300px] min-h-[300px]  max-sm:min-w-[100%] min-w-[530px] max-w-[530px] object-contain bg-background group-hover:opacity-20'
                      src={templateImage}
                      alt={templateName}
                    />
                    <button
                      onClick={() => {
                        router.push(`/templates/${templateName}`);
                      }}
                      className='absolute scale-0 group-hover:scale-100 hover:scale-100  font-bold text-xl text-blue-500 cursor-pointer rounded-full border-blue-600 border-2 hover:bg-blue-600 hover:text-white p-2 px-5 transition-all duration-200'
                    >
                      Visit
                    </button>
                  </div>
                  <div className='flex justify-between items-center pt-2 px-2'>
                    <div className='flex items-center justify-between'>
                      <h1 className='text-xl font-[600] px-2'>{templateName}</h1>
                      <div className='bg-gray-400 px-2 rounded cursor-pointer hover:bg-blue-600'>
                        <p className='text-white text-sm '>Free</p>
                      </div>
                    </div>
                    <div className='flex justify-center items-center'>
                      <button
                        disabled={disabled}
                        onClick={() => handleClick({ _id, starred })}
                        className={starred ? 'p-2 transition-colors duration-300 [color:red] text-xl cursor-pointer' : 'p-2 cursor-pointer text-xl  [color:gray] '}
                      >
                        <BsFillHeartFill />
                      </button>
                      <p className='text-[rgb(158, 158, 167)] font-[500] text-lg'>{stars}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </main>
    </>
  );
}
