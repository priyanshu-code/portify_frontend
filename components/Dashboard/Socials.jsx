import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, Button, useToast, Separator } from '@/components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { updatePortfolio } from '@/features/portfolio/portfolioSlice';
import { socialsSchema } from '@/components/models/Portfolio/Socials';
export default function Socials() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { portfolio } = useSelector((store) => store.Portfolio);
  const { projects } = useSelector((store) => store.Project);
  const { user } = useSelector((store) => store.User);
  const { socials, portfolioLikes } = portfolio;
  const { likedProjects, likedPortfolios } = user;
  const totalLikesGiven = likedProjects.length + likedPortfolios.length;
  function getLikes(total, element) {
    return total + element.projectLikes;
  }
  const totalProjectLikes = projects.reduce(getLikes, 0);
  // Define Form
  const socialsForm = useForm({
    resolver: zodResolver(socialsSchema),
    defaultValues: {
      LinkedIn: socials?.LinkedIn || '',
      GitHub: socials?.GitHub || '',
      Instagram: socials?.Instagram || '',
    },
  });
  // Submit handler
  function onSubmit(values) {
    dispatch(updatePortfolio({ socials: values }));
  }
  return (
    <div className="flex flex-col space-y-5">
      <div className="space-y-2">
        <h1 className="responsiveHeading4 font-semibold">Likes</h1>
        <h1 className="responsiveText3 text-gray-500">Who liked your portfolio/projects.</h1>
      </div>
      <div className="flex gap-4 items-center w-full">
        <div className="flex responsiveText">
          <p>Portfolio Likes: {portfolioLikes}</p>
        </div>
        <Separator className="w-[2px] h-10" orientation="vertical" />

        <div className="flex responsiveText">
          <p>Project Likes: {totalProjectLikes}</p>
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="responsiveHeading4 font-semibold">Liked By You</h1>
        <h1 className="responsiveText3 text-gray-500">Everyone who was liked by you.</h1>
      </div>
      <div className="flex gap-4 items-center w-full">
        <div className="flex responsiveText">
          <p>Total Likes Given: {totalLikesGiven}</p>
        </div>
        <Separator className="w-[2px] h-10" orientation="vertical" />
        <div className="flex responsiveText">
          <p>Liked Portfolios: {likedPortfolios.length}</p>
        </div>
        <Separator className="w-[2px] h-10" orientation="vertical" />
        <div className="flex responsiveText">
          <p>Liked Projects: {likedProjects.length}</p>
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="responsiveHeading4 font-semibold">Social</h1>
        <h1 className="responsiveText3 text-gray-500">View and manage your socials.</h1>
      </div>

      <Form {...socialsForm} className="w-full">
        <form onSubmit={socialsForm.handleSubmit(onSubmit)} className="space-y-4 w-full">
          <FormField
            control={socialsForm.control}
            name="LinkedIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input className="customInput" placeholder="LinkedIn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={socialsForm.control}
            name="GitHub"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub</FormLabel>
                <FormControl>
                  <Input className="customInput" placeholder="GitHub" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={socialsForm.control}
            name="Instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input className="customInput" placeholder="Instagram" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="min-w-full flex justify-end sm:justify-start">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
