import { redirect } from 'next/navigation';
import { Container, Title } from '@mantine/core';

import { getUser } from '~/lib/auth';
import { ExpensesTable } from '~/components/expenses-table';

export default async function HomePage() {
  const user = await getUser();

  if (!user) {
    redirect('/signin');
  }

  return (
    <Container py='lg'>
      <Title order={1} ta='center' mb='lg'>
        Expense Tracker
      </Title>
      <ExpensesTable />
    </Container>
  );
}
