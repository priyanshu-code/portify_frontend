// External Libraries
import Image from 'next/image';
import { MdOutlineCameraAlt, MdOutlineClose, MdLock } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// React and Redux
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef } from 'react';

// UI Components
import { Input, Switch, Button, Separator } from '@/components/ui';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// Features
import { updateUser, resetPassword } from '@/features/user/userSlice';

// Schemas
import { userSchema, resetPasswordSchema, resetPasswordUsingCurrentPasswordSchema } from '../models/User/User';

// Modal Component
import Modal from '../Modal';
import Loading from '../Loading/Loading';

export default function User() {
  const uploadImage = useRef(null);
  const { user, userData, userLoading } = useSelector((store) => store.User);
  const { firstname, lastname, email, picturePath, providers } = user;
  const [edit, setEdit] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [privateProfile, setPrivateProfile] = useState(user.privateProfile || false);
  const passwordSet = providers.includes('portify');
  const dispatch = useDispatch();
  const {
    allPasswordResets,
    createdAt,
    currentStorage,
    imageUploadLimit,
    imageUploads,
    imagesOnS3,
    passwordResetLimit,
    passwordResetRequests,
    totalDataUploaded,
    totalImagesDeleted,
    totalImagesUploaded,
    totalPasswordResets,
  } = userData;

  // Default values for password reset form
  const defaultValuesForPassowrdResetFrom = {
    currentPassword: '',
    password: '',
    confirm: '',
  };
  defaultValuesForPassowrdResetFrom.currentPassword = passwordSet ? '' : undefined;
  const passwordResetForm = useForm({
    resolver: zodResolver(passwordSet ? resetPasswordUsingCurrentPasswordSchema : resetPasswordSchema),
    defaultValues: { ...defaultValuesForPassowrdResetFrom },
  });

  // Pass
  const onPasswordSubmit = async (values) => {
    dispatch(resetPassword({ values, message: passwordSet ? 'Password succesfully updated!' : 'Password succesfully created!' }));
    passwordResetForm.reset();
    setChangePasswordModal(false);
  };

  // User Data update.
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: user.username || '',
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      email: user.email || '',
    },
  });
  // 2. Define a submit handler.
  const formData = new FormData();
  const formImage = new FormData();
  function onSubmit(values) {
    formData.append('firstname', values.firstname);
    formData.append('lastname', values.lastname);
    formData.append('privateProfile', privateProfile);
    dispatch(updateUser(formData));
  }
  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    formImage.append('picture', file);
    dispatch(updateUser(formImage));
  }
  function timeAgo(time) {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - new Date(time);
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 1) {
      return `${days} days ago`;
    } else if (hours > 1) {
      return `${hours} hours ago`;
    } else if (minutes > 1) {
      return `${minutes} minutes ago`;
    } else {
      return 'Just now';
    }
  }

  if (userLoading) return <Loading />;

  return (
    <div className='flex flex-col space-y-5'>
      {/* Update user modal */}
      <Modal isOpen={edit}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} encType='multipart/form-data' className='space-y-4 max-w-[min(502px,95%)] bg-white dark:bg-black p-6 rounded-xl'>
            <div className='flex items-center justify-between'>
              <h1 className='responsiveHeading3'>Update User</h1>
              <MdOutlineClose size={20} onClick={() => setEdit(false)} className='cursor-pointer' />
            </div>
            <div className='flex justify-between max-w-full '>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input className='customInput' disabled placeholder='Username' {...field} />
                    </FormControl>
                    <FormDescription>This is your unique identifer</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex justify-between space-x-3 max-w-full'>
              <FormField
                control={form.control}
                name='firstname'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input className='customInput' placeholder='First Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastname'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input className='customInput' placeholder='First Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input className='customInput' disabled placeholder='First Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='privateProfile'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-2 px-4'>
                  <FormLabel className='text-base'>Private profile</FormLabel>
                  <FormControl>
                    <Switch
                      checked={privateProfile}
                      onCheckedChange={() => {
                        setPrivateProfile((prev) => !prev);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='min-w-full flex justify-end sm:justify-center'>
              <Button type='submit'>Update</Button>
            </div>
          </form>
        </Form>
      </Modal>
      {/* Reset password modal */}
      <Modal isOpen={changePasswordModal}>
        <Form {...passwordResetForm}>
          <form onSubmit={passwordResetForm.handleSubmit(onPasswordSubmit)} encType='multipart/form-data' className='space-y-4 min-w-[min(502px,95%)] bg-white dark:bg-black p-6 rounded-xl'>
            <div className='flex items-center justify-between'>
              <h1 className='responsiveHeading3'>{passwordSet ? 'Reset Password' : 'Create new password'}</h1>
              <MdOutlineClose size={20} onClick={() => setChangePasswordModal(false)} className='cursor-pointer' />
            </div>

            <div className='flex justify-between max-w-full '>
              {passwordSet && (
                <FormField
                  control={passwordResetForm.control}
                  name='currentPassword'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Current Password *</FormLabel>
                      <FormControl>
                        <Input className='customInput' disabled={!passwordSet} type='password' placeholder='Current password' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <FormField
              control={passwordResetForm.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password *</FormLabel>
                  <FormControl>
                    <Input className='customInput' type='password' placeholder='New Password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={passwordResetForm.control}
              name='confirm'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password *</FormLabel>
                  <FormControl>
                    <Input className='customInput' type='password' placeholder='Confirm Password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='min-w-full flex justify-end sm:justify-center'>
              <Button type='submit'>{passwordSet ? 'Update' : 'Create'}</Button>
            </div>
          </form>
        </Form>
      </Modal>
      <div className='space-y-2'>
        <h1 className='responsiveHeading3 font-semibold'>Account</h1>
        <h1 className='responsiveText2 text-gray-500'>View and manage your account.</h1>
      </div>
      <div className='flex py-5'>
        <div className='flex sm:items-center max-sm:flex-col w-full  sm:space-x-10'>
          <div className='relative max-w-[160px] self-center max-sm:mb-5'>
            <Image className=' aspect-square object-cover rounded-full mb-4' src={picturePath} width={150} height={150} alt='Profile picture'></Image>
            <span
              onClick={() => {
                uploadImage.current.click();
              }}
              className='absolute cursor-pointer baseColor dark:bg-black rounded-full p-2 bottom-0 -right-4'
            >
              <MdOutlineCameraAlt className='h-12 w-12 p-2  bg-slate-300 rounded-full' />
              <Input ref={uploadImage} className='hidden' type='file' name='picturePath' accept='image/*' onChange={handleImage} />
            </span>
          </div>
          <div className='flex flex-col space-y-3'>
            <h1 className='text-slate-500  uppercase'>PERSONAL</h1>
            <div>
              <h1 className='font-bold'>Full name: {firstname + ' ' + lastname}</h1>
              <h1>Email: {email}</h1>
            </div>
            <Button onClick={() => setEdit(true)} className='rounded-full self-center w-full p-2'>
              Change
            </Button>
          </div>
        </div>
      </div>
      <Separator />
      <div className='flex flex-col space-y-2'>
        <h1 className='text-slate-500 my-3 uppercase'>SECURITY</h1>
        <h1 className='uppercase font-bold text-sm'>PROVIDERS</h1>
        <div className='flex gap-1'>
          {providers.map((item, i) => {
            return (
              <h1 key={item} className='text-sm text-[0.7rem] uppercase'>
                {item}
                {i < providers.length - 1 ? ',' : ''}
              </h1>
            );
          })}
        </div>

        {!passwordSet ? (
          <>
            <h1 className='text-[0.7rem] flex items-center space-x-1 flex-nowrap text-slate-500'>
              <MdLock />
              <p> Password not set</p>
            </h1>
            <Button
              onClick={() => {
                setChangePasswordModal(true);
              }}
              className='rounded-full p-1 px-4 max-w-[200px]'
            >
              Set a password
            </Button>
          </>
        ) : (
          <>
            {allPasswordResets?.length > 0 && <p>Last reset: {timeAgo(allPasswordResets[allPasswordResets.length - 1].resetTime)}</p>}
            <Button
              className='rounded-full p-1 px-4 max-w-[200px]'
              onClick={() => {
                setChangePasswordModal(true);
              }}
            >
              Change password
            </Button>
          </>
        )}
      </div>
      <Separator />

      <div className='flex flex-col space-y-2'>
        <h1 className='text-slate-500  uppercase'>USER DATA</h1>
        <h1 className='text-slate-500  uppercase'>Joined on: {createdAt.split('T')[0]}</h1>
        <div className='grid gap-4 grid-cols-1 md:grid-cols-3 w-full max-w-[1000px]'>
          <div>
            <h1 className='uppercase font-bold'>AWS</h1>
            <p>Total images uploaded: {totalImagesUploaded}</p>
            <p>Total images deleted: {totalImagesDeleted}</p>
            <p>Images On S3: {imagesOnS3.length}</p>
            <p>Daily Upload Limit: {imageUploads.length + ' / ' + imageUploadLimit}</p>
            <p>Storage used on S3: {currentStorage.toFixed(2)}Mb</p>
          </div>
          <div>
            <h1 className='uppercase font-bold'>Storage</h1>
            <p>Total data uploaded: {totalDataUploaded.toFixed(2)}Mb</p>
            <p>Current storage: {currentStorage.toFixed(2)}Mb</p>
          </div>
          <div>
            <h1 className='uppercase font-bold'>Security</h1>
            <p>Total password resets: {totalPasswordResets}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
