'use client';

import exploreHeaderImage from '@/public/exploreHeader.jpg';
import Image from 'next/image';
export default function ExploreIntro() {
  return (
    <div className='relative h-[max(400px,30vh)] w-full text-black rounded-3xl overflow-hidden'>
      <Image className='w-full h-full object-cover filter brightness-[0.6]' src={exploreHeaderImage} height={1920} width={1080} alt='exploreHeader' />
      <div className='absolute grid grid-cols-1 place-items-center top-0 w-full h-[max(400px,30vh)]'>
        <div className='text-white text-center space-y-1 px-4 sm:px-6 md:px-10'>
          <h1 className='font-extrabold responsiveHeading leading-relaxed'> Exhibit your brilliance.</h1>
          <p className=' responsiveText leading-7 p-5 sm:p-8'>Showcase your projects and join Portify - the premier platform for sharing your creative projects with the world.</p>
        </div>
      </div>
    </div>
  );
}

{
  /* <button className='button'>Discover</button>
          <button className='button'>Portfolios</button>
          <button className='button'>Web Design</button>
          <button className='button'>Product Design</button> */
}
