'use client';

import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';

import type { Category } from '~/types';
import { AddEditTemplateForm } from '~/components/add-edit-template-form';

type AddTemplateProps = {
  categories: Category[];
};

export function AddTemplate({ categories }: AddTemplateProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button leftSection={<IconPlus size={14} />} onClick={open}>
        Add Template
      </Button>

      <Modal opened={opened} onClose={close} title='Add Template'>
        <AddEditTemplateForm onClose={close} categories={categories} />
      </Modal>
    </>
  );
}
