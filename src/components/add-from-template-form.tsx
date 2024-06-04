'use client';

import { useTransition } from 'react';
import { Anchor, Button, Flex, Modal, Select } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { zodResolver } from 'mantine-form-zod-resolver';

import type { Category, Template } from '~/types';
import { addFromTemplate } from '~/lib/actions';
import { showError } from '~/lib/utils';
import { addFromTemplateSchema } from '~/lib/validations';
import { AddEditTemplateForm } from '~/components/add-edit-template-form';

type AddFromTemplateFormProps = {
  templates: Template[];
  categories: Category[];
  onClose: () => void;
};

export function AddFromTemplateForm({ templates, categories, onClose }: AddFromTemplateFormProps) {
  const [isPending, startTransition] = useTransition();
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      date: new Date(),
      template: '',
    },
    validate: zodResolver(addFromTemplateSchema),
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit(values =>
          startTransition(async () => {
            try {
              await addFromTemplate(values);
              onClose();
            } catch (error) {
              showError(error);
            }
          })
        )}
      >
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
          label='Template'
          placeholder='Select template'
          key={form.key('template')}
          {...form.getInputProps('template')}
          data={templates?.map(c => ({ value: c.id, label: c.name }))}
          searchable
        />
        <Anchor component='button' fz='sm' mb='md' type='button' onClick={open}>
          Add New Template
        </Anchor>
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
        <AddEditTemplateForm categories={categories} onClose={close} />
      </Modal>
    </>
  );
}
