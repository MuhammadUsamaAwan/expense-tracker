'use client';

import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';

import type { Category } from '~/types';

import { AddEditExpenseForm } from './add-edit-expense-form';

type AddExpenseProps = {
  categories: Category[];
};

export function AddExpense({ categories }: AddExpenseProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button leftSection={<IconPlus size={14} />} onClick={open}>
        Add Expense
      </Button>

      <Modal opened={opened} onClose={close} title='Add Expense'>
        <AddEditExpenseForm categories={categories} onClose={close} />
      </Modal>
    </>
  );
}
