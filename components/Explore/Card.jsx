'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { BsArrowUpLeft, BsGithub, BsFillHeartFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { likeProject, unlikeProject } from '@/features/project/projectSlice';
import { getUser } from '@/features/user/userSlice';
import Share from '@/components/Share/Share';
import { PiShareFatLight } from 'react-icons/pi';
import { useSession } from 'next-auth/react';

export default function Card({ item }) {
  const { status } = useSession();
  const isAuth = status === 'authenticated' ? true : false;
  const { _id, createdBy, projectName, projectImage, githubLink, liveLink, projectLikes, creator, creatorAvatar } = item;
  const toolTipRef = useRef(null);
  const { user } = useSelector((store) => store.User);
  const [disabled, setDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [clientLikes, setClientLikes] = useState(projectLikes);
  const [clientLikedProjects, setClientLikedProjects] = useState(user.likedProjects);
  const [toolTip, setToolTip] = useState(false);
  const [avatarHover, setAvatarHover] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const truncateStr = (str, len) => {
    if (str?.length > len) {
      return str.slice(0, len) + '...';
    } else {
      return str;
    }
  };
  let liked = false;
  if (isAuth) {
    if (clientLikedProjects?.includes(_id)) {
      liked = true;
    }
  }
  const handleClick = async ({ _id }) => {
    if (!isAuth) {
      router.push('/login');
      return;
    }
    setDisabled(true);
    if (clientLikedProjects.includes(_id)) {
      setClientLikedProjects((prev) => {
        {
          return prev.filter((item) => item !== _id);
        }
      });
      setClientLikes((prev) => prev - 1);
      dispatch(unlikeProject(_id));
    } else {
      setClientLikedProjects((prev) => {
        {
          return [...prev, _id];
        }
      });
      setClientLikes((prev) => prev + 1);
      dispatch(likeProject(_id));
    }
    setTimeout(() => {
      setDisabled(false);
    }, 300);
  };
  return (
    <div key={projectName} className='flex-col justify-center items-center rounded-xl'>
      <div className='cursor-pointer group relative flex items-center justify-center '>
        <Image width={400} height={400} className=' rounded-2xl object-cover transition-all duration-300 h-[300px] w-full' src={projectImage} alt={projectName} />
        <div className='flex justify-between items-end p-4 py-6 rounded-2xl bg-gradient-to-t from-black/50 opacity-0 group-hover:opacity-100 absolute bottom-0 w-full h-[60%]  transition-all duration-300'>
          <h1 className='text-2xl font-bold text-white'>{truncateStr(projectName, 20)}</h1>
          <div className='flex justify-center items-center'>
            <Link
              target='_blank'
              href={liveLink}
              className={liveLink ? 'text-white scale-0 rotate-90 group-hover:scale-100 hover:scale-100  font-bold text-xl  cursor-pointer px-4 transition-all duration-300' : 'hidden'}
            >
              <BsArrowUpLeft size={30} />
            </Link>
            <Link
              target='_blank'
              href={githubLink}
              className={githubLink ? 'text-white scale-0 group-hover:scale-100 hover:scale-100 font-bold text-xl  cursor-pointer transition-all duration-300' : 'hidden'}
            >
              <BsGithub size={30} />
            </Link>
          </div>
        </div>
        {(avatarHover || toolTip) && (
          <div
            ref={toolTipRef}
            onMouseLeave={() => {
              setToolTip(false);
            }}
            onMouseEnter={() => {
              setToolTip(true);
            }}
            className='absolute min-w-[104%] h-[40%] -bottom-1 rounded-2xl bg-[#f8f9fa] flex items-center justify-between p-4 shadow-2xl transition-all duration-300'
          >
            <div className='absolute w-5 h-5 left-[1.8rem] -bottom-1 rotate-[135deg] bg-[#f8f9fa] shadow-2xl z-10 transition-all duration-300'></div>
            <div className='absolute min-w-[104%] h-11   -bottom-8 bg-transparent  left-0'></div>
            <div className='flex space-x-2 items-center'>
              <Image height={300} width={300} className='h-16 w-16 rounded-full' src={creatorAvatar} alt={creator} />
              <div className='flex flex-col items-start'>
                <h1 className='text-black text-2xl sm:text-3xl'>{creator}</h1>
                <h1 className=''>{}</h1>
              </div>
            </div>
            <Link
              target='_blank'
              href={creator}
              className='hover:scale-105 text-center border-2 border-black p-1 xs:p-2 sm:p-4 rounded-xl text-black text-sm sm:text-[1rem] font-bold transition-all duration-300'
            >
              View portfilio
            </Link>
          </div>
        )}
      </div>
      <div className='flex items-center justify-between min-w-full'>
        <div className='flex items-center justify-center p-3 gap-2'>
          <Avatar
            onMouseEnter={() => {
              setAvatarHover(true);
            }}
            onMouseLeave={() => {
              setAvatarHover(false);
            }}
            className='cursor-pointer ring-2'
          >
            <AvatarImage src={creatorAvatar} alt={creator} />
            <AvatarFallback>{creator[0] + creator[1]}</AvatarFallback>
          </Avatar>
          <h1 className='text-xl z-10 font-[600] px-2'>{truncateStr(creator, 13)}</h1>
        </div>
        <div className='relative flex justify-center items-center'>
          <button
            disabled={disabled}
            onClick={() => handleClick({ _id, liked })}
            className={liked ? 'p-2 transition-colors duration-300 [color:red] text-xl cursor-pointer' : 'p-2 cursor-pointer text-xl  [color:gray] '}
          >
            <BsFillHeartFill />
          </button>
          <p className='font-[500] text-lg'>{clientLikes}</p>
          <button className='px-4' onClick={() => setShowModal(!showModal)}>
            <PiShareFatLight size={30} />
          </button>
          {showModal && (
            <div className='absolute bottom-10 right-0 min-w-[10%] h-[10%] px-[1.5rem] py-[3rem] rounded-2xl bg-[#f8f9fa] flex items-center justify-between shadow-2xl transition-all duration-300'>
              <div className='absolute w-5 h-5 right-[1.8rem] top-[88%] rotate-[135deg] bg-[#f8f9fa] shadow-2xl z-10 transition-all duration-300'></div>
              <Share creator={creator} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
