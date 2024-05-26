'use client';

import { useTransition } from 'react';
import { Button, Flex, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';

import type { Category } from '~/types';
import { addCategory, updateCategory } from '~/lib/actions';
import { showError } from '~/lib/utils';
import { categorySchema } from '~/lib/validations';

type AddEditCategoryFormProps = {
  onClose: () => void;
  category?: Category | null;
};

export function AddEditCategoryForm({ onClose, category }: AddEditCategoryFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: category?.name ?? '',
    },
    validate: zodResolver(categorySchema),
  });

  return (
    <form
      onSubmit={form.onSubmit(values =>
        startTransition(async () => {
          try {
            if (category) {
              await updateCategory({ ...values, id: category.id });
            } else {
              await addCategory(values);
            }
            onClose();
          } catch (error) {
            showError(error);
          }
        })
      )}
    >
      <TextInput
        withAsterisk
        label='Name'
        placeholder='Enter name'
        key={form.key('name')}
        {...form.getInputProps('name')}
        min={0}
        mb='md'
        data-autofocus
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
  );
}
