'use client';

import { useTransition } from 'react';
import { Button, Flex, NumberInput, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';

import { showError } from '~/lib/utils';
import { expenseSchema } from '~/lib/validations';

type AddExpenseFormProps = {
  categories: { id: string; name: string }[];
};

export function AddExpenseForm({ categories }: AddExpenseFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {},
    validate: zodResolver(expenseSchema),
  });

  return (
    <form
      onSubmit={form.onSubmit(values =>
        startTransition(async () => {
          try {
            // form action
            console.log(values);
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
      />
      <DateInput
        withAsterisk
        label='Date'
        placeholder='Enter date'
        key={form.key('date')}
        {...form.getInputProps('date')}
        mb='md'
      />
      <Textarea
        label='Description'
        placeholder='Enter description'
        key={form.key('description')}
        {...form.getInputProps('description')}
        mb='md'
      />
      <Flex justify='flex-end' mt='md'>
        <Button type='submit' loading={isPending}>
          Submit
        </Button>
      </Flex>
    </form>
  );
}
