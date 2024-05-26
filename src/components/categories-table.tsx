'use client';

import { useState, useTransition } from 'react';
import { ActionIcon, Button, Flex, Modal, Table, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconTrash } from '@tabler/icons-react';

import type { Category } from '~/types';
import { deleteCategory } from '~/lib/actions';
import { showError } from '~/lib/utils';
import { AddEditCategoryForm } from '~/components/add-edit-category';

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
        <AddEditCategoryForm category={category!} onSuccess={closeEdit} />
      </Modal>

      <Modal opened={openedDelete} onClose={closeDelete} title='Delete Category?'>
        <DeleteCategory categoryId={category?.id} onSuccess={closeDelete} />
      </Modal>
    </>
  );
}

type DeleteCategoryProps = {
  categoryId?: string;
  onSuccess: () => void;
};

function DeleteCategory({ categoryId, onSuccess }: DeleteCategoryProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <Text>
        Deleting this will permanently remove all expenses in this category. This action can&apos;t be undone.
      </Text>
      <Flex mt='md' justify='flex-end'>
        <Button
          color='red'
          onClick={() => {
            startTransition(async () => {
              try {
                if (categoryId) {
                  await deleteCategory(categoryId);
                }
                onSuccess();
              } catch (error) {
                showError(error);
              }
            });
          }}
          loading={isPending}
        >
          Yes
        </Button>
        <Button ml='sm' variant='default' onClick={onSuccess}>
          No
        </Button>
      </Flex>
    </>
  );
}
