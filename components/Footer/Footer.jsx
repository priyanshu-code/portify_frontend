'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-background border-t py-4 w-full'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex-shrink-0'>
          <Image src='/android-chrome-192x192.png' height={192} width={192} alt='Logo' className='self-start w-16 lg:w-20' />
        </div>
        <nav className='pb-4'>
          <ul className='flex max-sm:flex-col gap-4'>
            <li>
              <Link href='/' className='hover:text-gray-400'>
                Home
              </Link>
            </li>
            <li>
              <Link target='_blank' href='https://priyanshu-six.vercel.app/' className='hover:text-gray-400'>
                My portfolio
              </Link>
            </li>
            <li>
              <Link target='_blank' href='https://www.linkedin.com/in/priyanshu-rawat-570b7a19b/' className='hover:text-gray-400'>
                LinkedIn
              </Link>
            </li>
            <li>
              <Link target='_blank' href='https://github.com/Priyanshu-Code' className='hover:text-gray-400'>
                GitHub
              </Link>
            </li>
          </ul>
        </nav>
        <div className='w-16 lg:w-20'></div>
      </div>
      <div className='text-center mt-4'>
        <p>&copy; {new Date().getFullYear()} Portify All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

// import Link from 'next/link';
// import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
// export default function Footer() {
//   const year = new Date();
//   return (
//     <div className='min-w-full flex min-w-screen flex-col items-center py-8 space-y-6 bg-black text-white p-4'>
//       <h3> © {year.getFullYear()} Portify All rights reserved.</h3>
//       <div className='flex flex-row space-x-3 text-4xl'>
//         {/* <Link href="https://github.com/Sushantdeygit" target="_blank">
//           <AiFillGithub className="hover:text-zinc-200" />
//         </Link> */}
//         <Link href='https://github.com/Priyanshu-Code' target='_blank'>
//           <AiFillGithub className='hover:text-zinc-200' />
//         </Link>
//         <Link href='https://www.linkedin.com/in/priyanshu-rawat-570b7a19b/' target='_blank'>
//           <AiFillLinkedin className='hover:text-sky-600' />
//         </Link>
//         {/* <Link href="https://www.linkedin.com/in/sushant-dey-947782214/" target="_blank">
//           <AiFillLinkedin className="hover:text-sky-600" />
//         </Link> */}
//       </div>
//     </div>
//   );
// }
