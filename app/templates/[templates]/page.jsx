import { templatesArr } from '@/components/Templates';
import { Ronaldo, Framer, Creative } from '@/components/Templates';
import SetTemplate from '@/components/SetTemplate/SetTemplate';
import Template from '@/components/Templates';
const getUser = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}public/priyanshu`, {
    cache: 'no-store',
  });
  const data = await res.json();
  return data;
};

export default async function SingleTemplate({ params: templates }) {
  const data = await getUser();
  if (templatesArr.includes(templates.templates.toString())) {
    return (
      <>
        <SetTemplate name={templates.templates.toString()} />
        <Template data={data} current={templates.templates.toString()} />
      </>
    );
  } else {
    return <Template current={templates.templates.toString()} />;
  }
}
