import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { deleteProject } from '@/features/project/projectSlice';
export default function SingleProject({ _id, projectName, projectImage, showcase }) {
  const dispatch = useDispatch();
  const asPath = usePathname();
  return (
    <div className={`flex flex-col items-center p-6 space-y-3 shadow-xl border-2 dark:offBaseColor rounded-lg`}>
      <div className='flex items-center justify-between min-w-full max-w-full'>
        <h1 className='font-semibold text-xl whitespace-nowrap max-w-[80%] overflow-hidden'>{projectName}</h1>
        {showcase ? (
          <div className='flex items-center space-x-2 text-sm text-white pointer-events-none bg-emerald-500 rounded-full p-1 px-2'>
            <p>Showcased</p>
          </div>
        ) : (
          <span></span>
        )}
      </div>
      <Image className='object-cover max-h-[400px] min-h-[400px] overflow-hidden ' src={projectImage} alt='ProjectImage' layout='responsive' width={500} height={500}></Image>
      <div className='min-w-full flex justify-between'>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='outline' className='hover:bg-red-500'>
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone. This will permanently delete this project and remove this from our servers.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(deleteProject({ projectId: _id }));
                }}
                type='submit'
                className='bg-destructive bg-red-500 text-white hover:bg-red-800'
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Link href={`${asPath + '/projects/' + _id}`}>
          <Button>Edit</Button>
        </Link>
      </div>
    </div>
  );
}
