'use client';

import { useTransition } from 'react';
import { Button, ColorInput, DEFAULT_THEME, Flex, TextInput } from '@mantine/core';
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
      color: category?.color ?? '',
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
      <ColorInput
        withAsterisk
        label='Color'
        placeholder='Enter color'
        key={form.key('color')}
        {...form.getInputProps('color')}
        mb='md'
        swatches={[
          DEFAULT_THEME.colors.dark[6],
          DEFAULT_THEME.colors.gray[6],
          DEFAULT_THEME.colors.red[6],
          DEFAULT_THEME.colors.grape[6],
          DEFAULT_THEME.colors.violet[6],
          DEFAULT_THEME.colors.indigo[6],
          DEFAULT_THEME.colors.blue[6],
          DEFAULT_THEME.colors.cyan[6],
          DEFAULT_THEME.colors.teal[6],
          DEFAULT_THEME.colors.green[6],
          DEFAULT_THEME.colors.lime[6],
          DEFAULT_THEME.colors.yellow[6],
          DEFAULT_THEME.colors.orange[6],
        ]}
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
