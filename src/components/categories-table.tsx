'use client';

import { useState } from 'react';
import { ActionIcon, Modal, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconTrash } from '@tabler/icons-react';

import type { Category } from '~/types';
import { DeleteCategory } from '~/components//delete-category';
import { AddEditCategoryForm } from '~/components/add-edit-category-form';

type CategoriesTableProps = {
  categories: Category[];
};

export function CategoriesTable({ categories }: CategoriesTableProps) {
  const [category, setCategory] = useState<Category | null>(null);
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);

  return (
    <>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {categories.map(c => (
            <Table.Tr key={c.id}>
              <Table.Td>{c.name}</Table.Td>
              <Table.Td width={100}>
                <ActionIcon
                  variant='subtle'
                  color='gray'
                  onClick={() => {
                    setCategory(c);
                    openEdit();
                  }}
                >
                  <IconEdit size={16} />
                </ActionIcon>
                <ActionIcon
                  variant='subtle'
                  color='red'
                  onClick={() => {
                    setCategory(c);
                    openDelete();
                  }}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Modal opened={openedEdit} onClose={closeEdit} title='Edit Category'>
        <AddEditCategoryForm category={category} onClose={closeEdit} />
      </Modal>

      <Modal opened={openedDelete} onClose={closeDelete} title='Delete Category?'>
        <DeleteCategory categoryId={category?.id} onClose={closeDelete} />
      </Modal>
    </>
  );
}
