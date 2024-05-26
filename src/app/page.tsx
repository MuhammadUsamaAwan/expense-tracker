import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button, Flex, Title } from '@mantine/core';
import { IconLogout, IconPlus, IconTag } from '@tabler/icons-react';

import { signout } from '~/lib/actions';
import { getUser } from '~/lib/auth';
import { ExpensesTable } from '~/components/expenses-table';

export default async function HomePage() {
  const user = await getUser();

  if (!user) {
    redirect('/signin');
  }

  return (
    <>
      <Flex>
        <Title order={1} mb='lg' flex={1}>
          Expense Tracker
        </Title>
        <Button leftSection={<IconPlus size={14} />} component={Link} href='/add-expense'>
          Add Expense
        </Button>
        <Button leftSection={<IconTag size={14} />} component={Link} href='/manage-categories' ml='sm'>
          Manage Categories
        </Button>
        <form action={signout}>
          <Button leftSection={<IconLogout size={14} />} variant='outline' ml='sm' type='submit'>
            Logout
          </Button>
        </form>
      </Flex>
      <ExpensesTable />
    </>
  );
}
