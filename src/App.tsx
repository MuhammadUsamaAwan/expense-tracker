import { useState } from 'react';
import { Container, Title, Button } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import { IconDatabase, IconPlus } from '@tabler/icons-react';
import CreateExpense from './CreateExpense';
import ExpenseChart from './ExpenseChart';
import ExpenseTable from './ExpenseTable';
import Categories from './Categories';

export default function App() {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    dayjs().startOf('month').toDate(),
    new Date(),
  ]);

  const [opened, { open, close }] = useDisclosure(false);
  const [openedCategories, { open: openCategories, close: closeCategories }] = useDisclosure(false);

  return (
    <Container className='py-5' size='xs'>
      <Title order={2} className='mb-4 text-center'>
        Expense Tracker
      </Title>
      <Button className='w-full mb-3' leftIcon={<IconPlus />} onClick={open}>
        Add Expense
      </Button>
      <Button color='gray' className='w-full mb-3' leftIcon={<IconDatabase />} onClick={openCategories}>
        Manage Categories
      </Button>
      <DatePickerInput
        type='range'
        placeholder='Pick date range'
        value={dateRange}
        onChange={setDateRange}
        maxDate={new Date()}
        className='mb-10'
      />

      <ExpenseChart dateRange={dateRange} />
      <ExpenseTable dateRange={dateRange} />

      <Categories opened={openedCategories} close={closeCategories} />
      <CreateExpense opened={opened} close={close} />
    </Container>
  );
}
