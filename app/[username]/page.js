import Link from 'next/link';
import { Ronaldo } from '@/components/Templates';
import Template from '@/components/Templates';
const getUser = async ({ username }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}public/${username}`, {
    cache: 'no-store',
  });
  const data = await res.json();
  return data;
};
export default async function Username({ params: username }) {
  const data = await getUser(username);
  if (!data?.found) {
    if (data.msg === 'No user') {
      return (
        <div className='min-h-[calc(100vh-64px)] flex flex-col items-center justify-center'>
          <h1 className='text-4xl'>No user with username :- {username.username}</h1>
          <Link href='/login'>
            <p className='text-3xl bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-purple-600'>Create your new portfolio here</p>
          </Link>
        </div>
      );
    } else if (data.msg === 'No portfolio') {
      const { firstname, lastname } = data.user;
      return (
        <div className='min-h-[calc(100vh-64px)] flex flex-col items-center justify-center'>
          <h1 className='text-4xl'>{firstname[0].toUpperCase() + firstname.slice(1) + ' ' + lastname} has not created a portfolio yet.</h1>
          <Link href={'templates'}>
            <p className='text-3xl bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-purple-600'>Create your new portfolio</p>
          </Link>
        </div>
      );
    }
  }
  return <Template current={data.portfolio.template} data={data} />;
}
