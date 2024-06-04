'use client';

import { useTransition } from 'react';
import { Anchor, Button, Flex, Modal, NumberInput, Select, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { zodResolver } from 'mantine-form-zod-resolver';

import type { Category, Expense } from '~/types';
import { addExpense, updateExpense } from '~/lib/actions';
import { showError } from '~/lib/utils';
import { expenseSchema } from '~/lib/validations';
import { AddEditCategoryForm } from '~/components/add-edit-category-form';

type AddEditExpenseFormProps = {
  categories: Category[];
  onClose: () => void;
  expense?: Expense | null;
};

export function AddEditExpenseForm({ categories, onClose, expense }: AddEditExpenseFormProps) {
  const [isPending, startTransition] = useTransition();
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      amount: expense?.amount ?? undefined,
      date: expense?.date ?? new Date(),
      category: expense?.category.id ?? '',
      description: expense?.description ?? undefined,
    },
    validate: zodResolver(expenseSchema),
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit(values =>
          startTransition(async () => {
            try {
              if (expense) {
                // @ts-expect-error: values are not typed
                await updateExpense({ ...values, id: expense.id });
              } else {
                // @ts-expect-error: values are not typed
                await addExpense(values);
              }
              onClose();
            } catch (error) {
              showError(error);
            }
          })
        )}
      >
        <NumberInput
          withAsterisk
          label='Amount'
          placeholder='Enter amount'
          key={form.key('amount')}
          {...form.getInputProps('amount')}
          min={0}
          mb='md'
          data-autofocus
        />
        <DateInput
          withAsterisk
          label='Date'
          placeholder='Enter date'
          key={form.key('date')}
          {...form.getInputProps('date')}
          mb='md'
        />
        <Select
          withAsterisk
          label='Category'
          placeholder='Select category'
          key={form.key('category')}
          {...form.getInputProps('category')}
          data={categories?.map(c => ({ value: c.id, label: c.name }))}
          searchable
        />
        <Anchor component='button' fz='sm' mb='md' type='button' onClick={open}>
          Add New Category
        </Anchor>
        <Textarea
          label='Description'
          placeholder='Enter description'
          key={form.key('description')}
          {...form.getInputProps('description')}
          mb='md'
        />
        <Flex justify='flex-end' mt='md'>
          <Button type='button' variant='default' onClick={onClose}>
            Cancel
          </Button>
          <Button type='submit' ml='sm' loading={isPending}>
            Submit
          </Button>
        </Flex>
      </form>

      <Modal opened={opened} onClose={close} title='Add Expense'>
        <AddEditCategoryForm onClose={close} />
      </Modal>
    </>
  );
}
