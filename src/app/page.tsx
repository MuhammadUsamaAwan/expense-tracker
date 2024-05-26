import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button, Flex, Space, Text, Title } from '@mantine/core';
import { IconLogout, IconTag } from '@tabler/icons-react';

import { signout } from '~/lib/actions';
import { getUser } from '~/lib/auth';
import { getCategories, getExpenses } from '~/lib/fetchers';
import { AddExpense } from '~/components/add-expense';
import { DateRangeFilter } from '~/components/daterange-filter';
import { ExpensesDonutChart } from '~/components/expenses-donut-chart';
import { ExpensesTable } from '~/components/expenses-table';

type HomePageProps = {
  searchParams: {
    startDate: string | undefined;
    endDate: string | undefined;
  };
};

export default async function HomePage({ searchParams: { startDate, endDate } }: HomePageProps) {
  const user = await getUser();
  const categories = await getCategories();
  const expenses = await getExpenses({ startDate, endDate });

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
      <DateRangeFilter />
      {expenses.length === 0 ? (
        <Text>No expenses found...</Text>
      ) : (
        <>
          <ExpensesDonutChart expenses={expenses} />
          <Space h='md' />
          <ExpensesTable categories={categories} expenses={expenses} />
        </>
      )}
    </>
  );
}
