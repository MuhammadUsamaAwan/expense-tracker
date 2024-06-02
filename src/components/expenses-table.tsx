'use client';

import { useState } from 'react';
import { ActionIcon, Box, Flex, Modal, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';

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

  return (
    <>
      <Table.ScrollContainer minWidth={375}>
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Date</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {expenses.map(e => (
              <Table.Tr key={e.id}>
                <Table.Td>{dayjs(e.date).format('DD MMM, YYYY')}</Table.Td>
                <Table.Td>{e.amount}</Table.Td>
                <Table.Td>{e.category.name}</Table.Td>
                <Table.Td>{e.description}</Table.Td>
                <Table.Td width={80}>
                  <Flex>
                    <ActionIcon
                      variant='subtle'
                      color='gray'
                      onClick={() => {
                        setExpense(e);
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
                        setExpense(e);
                        openDelete();
                      }}
                      aria-label='Delete expense'
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Flex>
                </Table.Td>
              </Table.Tr>
            ))}
            <Table.Tr>
              <Table.Td colSpan={5} align='center'>
                <Box component='span' fw={600}>
                  Total:
                </Box>{' '}
                {expenses.reduce((acc, e) => acc + e.amount, 0)}
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Modal opened={openedEdit} onClose={closeEdit} title='Edit Expense'>
        <AddEditExpenseForm categories={categories} expense={expense} onClose={closeEdit} />
      </Modal>

      <Modal opened={openedDelete} onClose={closeDelete} title='Delete Expense?'>
        <DeleteExpense expenseId={expense?.id} onClose={closeDelete} />
      </Modal>
    </>
  );
}
