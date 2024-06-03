'use client';

import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';

import { AddEditCategoryForm } from '~/components/add-edit-category-form';

export function AddCategory() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button leftSection={<IconPlus size={14} />} onClick={open}>
        Add Category
      </Button>

      <Modal opened={opened} onClose={close} title='Add Category'>
        <AddEditCategoryForm onClose={close} />
      </Modal>
    </>
  );
}
