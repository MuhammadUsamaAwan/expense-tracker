import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Box, Button, Flex, Space, Text, Title } from '@mantine/core';
import { IconLogout, IconTag, IconTemplate } from '@tabler/icons-react';

import { signout } from '~/lib/actions';
import { getUser } from '~/lib/auth';
import { getCategories, getExpenses, getTemplates } from '~/lib/fetchers';
import { AddExpense } from '~/components/add-expense';
import { DateRangeFilter } from '~/components/daterange-filter';
import { ExpensesDonutChart } from '~/components/expenses-donut-chart';
import { ExpensesLineChart } from '~/components/expenses-line-chart';
import { ExpensesTable } from '~/components/expenses-table';

type ExpensePageProps = {
  startDate: string;
  endDate: string;
};

export default async function ExpensePage({ startDate, endDate }: ExpensePageProps) {
  const user = await getUser();

  if (!user) {
    redirect('/signin');
  }

  const categoriesPromise = getCategories();
  const templatesPromise = getTemplates();
  const expensesPromise = getExpenses({ startDate, endDate });

  const [categories, templates, expenses] = await Promise.all([categoriesPromise, templatesPromise, expensesPromise]);

  return (
    <>
      <Title order={1} mb='sm' ta='center' flex={1}>
        Expense Tracker
      </Title>
      <Flex mb='lg' wrap='wrap' gap='sm'>
        <AddExpense categories={categories} templates={templates} />
        <Button leftSection={<IconTag size={14} />} component={Link} href='/manage-categories'>
          Manage Categories
        </Button>
        <Button leftSection={<IconTemplate size={14} />} component={Link} href='/manage-templates'>
          Manage Templates
        </Button>
        <Box component='form' action={signout} ml='auto'>
          <Button leftSection={<IconLogout size={14} />} variant='outline' type='submit'>
            Logout
          </Button>
        </Box>
      </Flex>
      <DateRangeFilter />
      <Space h='md' />
      {expenses.length === 0 ? (
        <Text>No expenses found...</Text>
      ) : (
        <>
          <Flex justify='center' gap={4}>
            <Box component='span' fw={600}>
              Total Expense:
            </Box>
            <Box component='span'>{expenses.reduce((acc, e) => acc + e.amount, 0)}</Box>
          </Flex>
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
