'use client';

import { Fragment, useTransition } from 'react';
import {
  ActionIcon,
  Anchor,
  Button,
  Fieldset,
  Flex,
  Group,
  Modal,
  NumberInput,
  Select,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { randomId, useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { zodResolver } from 'mantine-form-zod-resolver';

import type { Category, Template } from '~/types';
import { addTemplate, updateTemplate } from '~/lib/actions';
import { showError } from '~/lib/utils';
import { templateSchema } from '~/lib/validations';
import { AddEditCategoryForm } from '~/components/add-edit-category-form';

type AddEditTemplateFormProps = {
  onClose: () => void;
  categories: Category[];
  template?: Template | null;
};

export function AddEditTemplateForm({ onClose, categories, template }: AddEditTemplateFormProps) {
  const [isPending, startTransition] = useTransition();
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: template?.name ?? '',
      expenses: template?.expenses ?? [{ id: randomId() }],
    },
    validate: zodResolver(templateSchema),
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit(values =>
          startTransition(async () => {
            try {
              if (template) {
                // @ts-expect-error not properly typed
                await updateTemplate({ ...values, id: template.id });
              } else {
                // @ts-expect-error not properly typed
                await addTemplate(values);
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
        {form.getValues().expenses.map((e, i) => (
          <Fieldset key={e.id} mb='md' pb={0}>
            <Group justify='space-between' mb={2}>
              <Text fw={600}>Expense {i + 1}</Text>
              {i !== 0 && (
                <ActionIcon
                  variant='subtle'
                  color='red'
                  onClick={() =>
                    form.setFieldValue(
                      'expenses',
                      form.getValues().expenses.filter((_, j) => j !== i)
                    )
                  }
                  aria-label='Delete expense'
                >
                  <IconTrash size={16} />
                </ActionIcon>
              )}
            </Group>
            <NumberInput
              withAsterisk
              label='Amount'
              placeholder='Enter amount'
              key={form.key(`expenses.${i}.amount`)}
              {...form.getInputProps(`expenses.${i}.amount`)}
              min={0}
              mb='md'
              data-autofocus
            />
            <Select
              withAsterisk
              label='Category'
              placeholder='Select category'
              key={form.key(`expenses.${i}.category`)}
              {...form.getInputProps(`expenses.${i}.category`)}
              data={categories?.map(c => ({ value: c.id, label: c.name }))}
              searchable
            />
            <Anchor component='button' fz='sm' mb='md' type='button' onClick={open}>
              Add New Category
            </Anchor>
            <Textarea
              label='Description'
              placeholder='Enter description'
              key={form.key(`expenses.${i}.description`)}
              {...form.getInputProps(`expenses.${i}.description`)}
              mb='md'
            />
          </Fieldset>
        ))}
        <Group justify='center' mt='md'>
          <Button
            type='button'
            onClick={() => form.setFieldValue('expenses', [...form.getValues().expenses, { id: randomId() }])}
          >
            Add expense
          </Button>
        </Group>
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
