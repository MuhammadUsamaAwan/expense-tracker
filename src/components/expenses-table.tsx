'use client';

import { useMemo, useState } from 'react';
import { ActionIcon, Box, Flex, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';

import type { Category, Expense } from '~/types';
import { AddEditExpenseForm } from '~/components/add-edit-expense-form';
import { DeleteExpense } from '~/components/delete-expense';

type ExpensesTableProps = {
  categories: Category[];
  expenses: Expense[];
};

export function ExpensesTable({ categories, expenses }: ExpensesTableProps) {
  const [expense, setExpense] = useState<Expense | null>(null);
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);

  const columns = useMemo<MRT_ColumnDef<Expense>[]>(
    () => [
      {
        header: 'Date',
        Cell: ({ row }) => dayjs(row.original.date).format('DD MMM, YYYY'),
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
      },
      {
        accessorKey: 'category.name',
        header: 'Category',
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        header: 'Actions',
        Cell: ({ row }) => (
          <Flex>
            <ActionIcon
              variant='subtle'
              color='gray'
              onClick={() => {
                setExpense(row.original);
                openEdit();
              }}
              aria-label='Edit expense'
            >
              <IconEdit size={16} />
            </ActionIcon>
            <ActionIcon
              variant='subtle'
              color='red'
              onClick={() => {
                setExpense(row.original);
                openDelete();
              }}
              aria-label='Delete expense'
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Flex>
        ),
        Footer: () => (
          <>
            <Box component='span' fw={600}>
              Total:
            </Box>{' '}
            {expenses.reduce((acc, e) => acc + e.amount, 0)}
          </>
        ),
      },
    ],
    [expenses, openDelete, openEdit]
  );

  const table = useMantineReactTable({
    columns,
    data: expenses ?? [],
    enablePagination: false,
    enableBottomToolbar: false,
    initialState: {
      density: 'xs',
    },
  });

  return (
    <>
      <MantineReactTable table={table} />

      <Modal opened={openedEdit} onClose={closeEdit} title='Edit Expense'>
        <AddEditExpenseForm categories={categories} expense={expense} onClose={closeEdit} />
      </Modal>

      <Modal opened={openedDelete} onClose={closeDelete} title='Delete Expense?'>
        <DeleteExpense expenseId={expense?.id} onClose={closeDelete} />
      </Modal>
    </>
  );
}
