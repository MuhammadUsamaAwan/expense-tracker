import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button, Flex, Title } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';

import { getUser } from '~/lib/auth';
import { getCategories } from '~/lib/fetchers';
import { AddExpenseForm } from '~/components/add-expense-form';

export default async function HomePage() {
  const user = await getUser();
  const categories = await getCategories();

  if (!user) {
    redirect('/signin');
  }

  return (
    <>
      <Flex>
        <Title order={1} mb='lg' flex={1}>
          Add Expense
        </Title>
        <Button leftSection={<IconArrowNarrowLeft size={14} />} component={Link} href='/'>
          Back
        </Button>
      </Flex>
      <AddExpenseForm categories={categories} />
    </>
  );
}
