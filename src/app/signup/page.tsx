import { redirect } from 'next/navigation';
import { Title } from '@mantine/core';

import { getUser } from '~/lib/auth';
import { SignupForm } from '~/components/signup-form';

export default async function SignupPage() {
  const user = await getUser();

  if (user) {
    redirect('/');
  }

  return (
    <>
      <Title order={1} ta='center' mb='lg'>
        Signup for Expense Tracker
      </Title>
      <SignupForm />
    </>
  );
}
