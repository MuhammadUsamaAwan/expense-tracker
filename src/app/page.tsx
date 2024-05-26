import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button, Flex, Space, Text, Title } from '@mantine/core';
import { IconLogout, IconTag } from '@tabler/icons-react';
import dayjs from 'dayjs';

import { signout } from '~/lib/actions';
import { getUser } from '~/lib/auth';
import { getCategories, getExpenses } from '~/lib/fetchers';
import { AddExpense } from '~/components/add-expense';
import { DateRangeFilter } from '~/components/daterange-filter';
import { ExpensesDonutChart } from '~/components/expenses-donut-chart';
import { ExpensesLineChart } from '~/components/expenses-line-chart';
import { ExpensesTable } from '~/components/expenses-table';

type HomePageProps = {
  searchParams: {
    startDate: string | undefined;
    endDate: string | undefined;
  };
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const user = await getUser();
  const categories = await getCategories();
  const startDate = searchParams.startDate ?? dayjs().startOf('month').format('YYYY-MM-DD');
  const endDate = searchParams.endDate ?? dayjs().endOf('month').format('YYYY-MM-DD');
  const expenses = await getExpenses({ startDate, endDate });

  if (!user) {
    redirect('/signin');
  }

  return (
    <>
      <Title order={1} mb='sm' ta='center' flex={1}>
        Expense Tracker
      </Title>
      <Flex mb='lg' justify='space-between' wrap='wrap' gap='sm'>
        <Flex align='center'>
          <AddExpense categories={categories} />
          <Button leftSection={<IconTag size={14} />} component={Link} href='/manage-categories' ml='sm'>
            Manage Categories
          </Button>
        </Flex>
        <form action={signout}>
          <Button leftSection={<IconLogout size={14} />} variant='outline' type='submit'>
            Logout
          </Button>
        </form>
      </Flex>
      <DateRangeFilter />
      <Space h='md' />
      {expenses.length === 0 ? (
        <Text>No expenses found...</Text>
      ) : (
        <>
          <ExpensesDonutChart expenses={expenses} />
          <Space h='md' />
          <ExpensesLineChart expenses={expenses} startDate={startDate} endDate={endDate} />
          <Space h='lg' />
          <Space h='lg' />
          <ExpensesTable categories={categories} expenses={expenses} />
        </>
      )}
    </>
  );
}
