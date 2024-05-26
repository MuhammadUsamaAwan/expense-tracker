'use client';

import { useState } from 'react';
import { ActionIcon, Box, Flex, Modal, Table } from '@mantine/core';
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
      <Table.ScrollContainer minWidth={375}>
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Color</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {categories.map(c => (
              <Table.Tr key={c.id}>
                <Table.Td>{c.name}</Table.Td>
                <Table.Td width={100}>
                  <Flex align='center'>
                    <Box
                      w={10}
                      h={10}
                      bg={c.color}
                      style={{
                        borderRadius: '50%',
                      }}
                      mb={2}
                    ></Box>
                    <Box ml={2}>{c.color}</Box>
                  </Flex>
                </Table.Td>
                <Table.Td width={80}>
                  <ActionIcon
                    variant='subtle'
                    color='gray'
                    onClick={() => {
                      setCategory(c);
                      openEdit();
                    }}
                    aria-label='Edit category'
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
                    aria-label='Delete category'
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Modal opened={openedEdit} onClose={closeEdit} title='Edit Category'>
        <AddEditCategoryForm category={category} onClose={closeEdit} />
      </Modal>

      <Modal opened={openedDelete} onClose={closeDelete} title='Delete Category?'>
        <DeleteCategory categoryId={category?.id} onClose={closeDelete} />
      </Modal>
    </>
  );
}
