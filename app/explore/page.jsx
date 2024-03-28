import ExploreIntro from '@/components/Explore/Intro';
import ExploreMain from '@/components/Explore/Main';
async function getExploreProjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}getExploreProjects`, {
      cache: 'no-store',
    });
    const projects = await res.json();
    return projects;
  } catch (error) {
    console.log(error);
  }
}

export default async function Explore() {
  const projects = await getExploreProjects();
  return (
    <main className='min-h-screen w-full p-2 px-4'>
      <ExploreIntro />
      <ExploreMain projects={projects} />
    </main>
  );
}
