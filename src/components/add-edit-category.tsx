'use client';

import { useTransition } from 'react';
import { Button, Flex, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { zodResolver } from 'mantine-form-zod-resolver';

import type { Category } from '~/types';
import { addCategory, updateCategory } from '~/lib/actions';
import { showError } from '~/lib/utils';
import { categorySchema } from '~/lib/validations';

export function AddCategory() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button leftSection={<IconPlus size={14} />} onClick={open}>
        Add Category
      </Button>

      <Modal opened={opened} onClose={close} title='Add Cagtegory'>
        <AddEditCategoryForm onSuccess={close} />
      </Modal>
    </>
  );
}
type AddEditCategoryFormProps = {
  onSuccess: () => void;
  category?: Category;
};

export function AddEditCategoryForm({ onSuccess, category }: AddEditCategoryFormProps) {
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
            onSuccess();
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
        <Button type='submit' loading={isPending}>
          Submit
        </Button>
      </Flex>
    </form>
  );
}
