import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button, Flex, Title } from '@mantine/core';
import { IconLogout, IconTag } from '@tabler/icons-react';

import { signout } from '~/lib/actions';
import { getUser } from '~/lib/auth';
import { getCategories, getExpenses } from '~/lib/fetchers';
import { AddExpense } from '~/components/add-expense';
import { ExpensesTable } from '~/components/expenses-table';

export default async function HomePage() {
  const user = await getUser();
  const categories = await getCategories();
  const expenses = await getExpenses();

  if (!user) {
    redirect('/signin');
  }

  return (
    <>
      <Flex>
        <Title order={1} mb='lg' flex={1}>
          Expense Tracker
        </Title>
        <AddExpense categories={categories} />
        <Button leftSection={<IconTag size={14} />} component={Link} href='/manage-categories' ml='sm'>
          Manage Categories
        </Button>
        <form action={signout}>
          <Button leftSection={<IconLogout size={14} />} variant='outline' ml='sm' type='submit'>
            Logout
          </Button>
        </form>
      </Flex>
      <ExpensesTable categories={categories} expenses={expenses} />
    </>
  );
}
