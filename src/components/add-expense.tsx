'use client';

import { Button, Modal, Tabs } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';

import type { Category, Template } from '~/types';
import { AddEditExpenseForm } from '~/components/add-edit-expense-form';
import { AddFromTemplateForm } from '~/components/add-from-template-form';

type AddExpenseProps = {
  categories: Category[];
  templates: Template[];
};

export function AddExpense({ categories, templates }: AddExpenseProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button leftSection={<IconPlus size={14} />} onClick={open}>
        Add Expense
      </Button>

      <Modal opened={opened} onClose={close} title='Add Expense'>
        <Tabs defaultValue='manually'>
          <Tabs.List mb='sm'>
            <Tabs.Tab value='manually'>Add Manually</Tabs.Tab>
            <Tabs.Tab value='template'>Add from Template</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value='manually'>
            <AddEditExpenseForm categories={categories} onClose={close} />
          </Tabs.Panel>
          <Tabs.Panel value='template'>
            <AddFromTemplateForm categories={categories} templates={templates} onClose={close} />
          </Tabs.Panel>
        </Tabs>
      </Modal>
    </>
  );
}
