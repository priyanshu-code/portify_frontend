import Ronaldo from './Ronaldo/Ronaldo';
import Framer from './Framer/Framer';
import Creative from './Creative/Creative';
import Deck from './Deck/Deck';
// import Space from './Space/Space';
// import Rings from './Rings/Rings';
export const templatesArr = ['Framer', 'Creative', 'Deck'];
export default function Template({ current, data, className }) {
  const template = templatesArr.find((item) => item === current);
  if (!template) {
    return (
      <div className='min-h-[calc(100vh-64px)] flex flex-col items-center justify-center'>
        <h1 className='text-4xl'>No template with name {current}</h1>
        <p className='text-3xl bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-purple-600'>Please contact the admin for further details</p>
      </div>
    );
  } else {
    const { user, portfolio, projects } = data;
    switch (template) {
      case 'Ronaldo':
        return (
          <div className={className || ''}>
            <Ronaldo user={user} portfolio={portfolio} projects={projects} />
          </div>
        );
      case 'Framer':
        return <Framer user={user} portfolio={portfolio} projects={projects} />;
      case 'Creative':
        return <Creative user={user} portfolio={portfolio} projects={projects} />;
      case 'Deck':
        return <Deck user={user} portfolio={portfolio} projects={projects} />;
    }
  }
}
