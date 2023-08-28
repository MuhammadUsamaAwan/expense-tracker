import { useMemo } from 'react';
import { Table, ActionIcon } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import dayjs from 'dayjs';
import { IconTrashX } from '@tabler/icons-react';

type ExpenseTableProps = {
  dateRange: [Date | null, Date | null];
};

export default function ExpenseTable({ dateRange }: ExpenseTableProps) {
  const [expenses, setExpenses] = useLocalStorage<{ date: string; category: string; amount: number }[]>({
    key: 'expenses',
    defaultValue: [],
  });

  const data = useMemo(() => {
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      const startDate = dateRange[0] !== null ? new Date(dateRange[0]) : null;
      const endDate = dateRange[1] !== null ? new Date(dateRange[1]) : null;

      if (!startDate && !endDate) return true;
      if (!startDate) return expenseDate <= dayjs(endDate).endOf('day').toDate();
      if (!endDate) return expenseDate >= startDate;

      return expenseDate >= startDate && expenseDate <= dayjs(endDate).endOf('day').toDate();
    });
  }, [dateRange, expenses]);

  const handleDelete = (index: number) => {
    const newExpenses = [...expenses];
    newExpenses.splice(index, 1);
    setExpenses(newExpenses);
  };

  if (data.length === 0) return null;

  return (
    <Table striped withBorder withColumnBorders className='mt-10'>
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((expense, index) => (
          <tr key={index}>
            <td>{dayjs(expense.date).format('DD MMM YY')}</td>
            <td>{expense.category}</td>
            <td>{expense.amount}</td>
            <td>
              <ActionIcon onClick={() => handleDelete(index)}>
                <IconTrashX size='1.25rem' />
              </ActionIcon>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
