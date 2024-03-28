'use client';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useState } from 'react';
import { IoIosCheckmark } from 'react-icons/io';

const pricingData = [
  {
    planName: 'Free',
    actualPrice: '$5',
    sellingPrice: '$0',
    planDetail1: '',
    planDetail2: '',
    planDescription: 'Access to limited courses on Framer Motion, Tailwind, and Remix',
    planItemsList: [
      'Basic access to current premium Build UI courses.',
      'No new video additions',
      'No access to Private Discord community',
      'Code summaries not included',
      'Limited access to course materials and resources',
    ],
  },
  {
    planName: 'Annual Subscription',
    actualPrice: '$50',
    sellingPrice: '$29/mo',
    planDetail1: 'early bird discount',
    planDetail2: 'paid annualy',
    planDescription: 'Full access to current premium Build UI courses with yearly commitment.',
    planItemsList: [
      'Courses on Framer Motion, Tailwind, and Remix',
      'Weekly new video additions',
      'Refactoring videos focused on React',
      'Access to Private Discord community',
      'Code summaries included',
      'Discounted rate with annual commitment',
    ],
  },
  {
    planName: 'Lifetime Membership',
    actualPrice: '$249',
    sellingPrice: '$149',
    planDetail1: 'early bird discount',
    planDetail2: 'one-time payment',
    planDescription: 'Unlimited access to all current and future premium Build UI courses, forever.',
    planItemsList: [
      'Courses on Framer Motion, Tailwind, and Remix',
      'Weekly new video additions',
      'Refactoring videos focused on React',
      'Access to Private Discord community',
      'Code summaries included',
      'One-time payment for lifetime access',
    ],
  },
];

export default function Pricing() {
  return (
    <div className='w-full fullHeight  xl:max-w-[1400px] m-auto p-6 py-8'>
      <div className='space-y-2 mb-5'>
        <h1 className='responsiveHeading3 font-semibold'>Perfect Plans</h1>
        <h1 className='responsiveText2 text-gray-500'>Explore our flexible pricing options tailored to meet your needs.</h1>
      </div>
      <div className='grid grid-cols-1 place-items-center min-h-[650px]'>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {pricingData.map((item) => {
            return <PricingCard key={item.planName} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

function PricingCard({ item }) {
  const { planName, actualPrice, sellingPrice, planDetail1, planDetail2, planDescription, planItemsList } = item;
  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    x.set(clientX - left);
    y.set(clientY - top);
  }
  const [comp, setComp] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <div
      onMouseEnter={() => {
        setComp(true);
      }}
      onMouseLeave={() => {
        setComp(false);
      }}
      onMouseMove={handleMouseMove}
      className='relative border-2 border-[#28323C] rounded-[32px] overflow-hidden min-h-[550px]'
    >
      <div className='grid grid-cols-1 gap-2 p-6  h-full'>
        <p className='text-blue-500 font-bold text-lg'>{planName}</p>
        <p className='text-lg line-through opacity-65'>{actualPrice}</p>
        <div className='flex items-center gap-2'>
          <p className='text-3xl mr-2'>{sellingPrice}</p>
          <div>
            <p className='opacity-80'>{planDetail1}</p>
            <p className='opacity-50'>{planDetail2}</p>
          </div>
        </div>
        <div className='opacity-50 mt-3'>{planDescription}</div>
        <ul className='list-none grid grid-cols-1 gap-1 mt-3'>
          {planItemsList.map((item, index) => (
            <li key={index} className='flex items-start gap-1'>
              <IoIosCheckmark size={25} className='text-sky-500 min-w-[25px]' />
              <p>{item}</p>
            </li>
          ))}
        </ul>
        <button className='mt-auto text-center text-xl rounded-full outline-none h-14 min-w-104 text-white cursor-pointer bg-blue-700 px-4 z-10'>Buy Now</button>
      </div>
      <motion.div
        className='absolute inset-0'
        style={{
          background: useMotionTemplate`radial-gradient(circle 400px at ${x}px ${y}px, rgb(48, 40, 150,0.25), transparent 80%)`,
          borderRadius: 30,
          opacity: comp ? 1 : 0,
          transition: '0.3s',
        }}
        transition={{ duration: 100 }}
      ></motion.div>
    </div>
  );
}
