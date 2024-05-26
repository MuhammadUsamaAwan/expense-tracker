import { redirect } from 'next/navigation';
import { Title } from '@mantine/core';

import { getUser } from '~/lib/auth';
import { SigninForm } from '~/components/signin-form';

export default async function SignupPage() {
  const user = await getUser();

  if (user) {
    redirect('/');
  }

  return (
    <>
      <Title order={1} ta='center' mb='lg'>
        Sign in to Expense Tracker
      </Title>
      <SigninForm />
    </>
  );
}
