'use client';

import { useMemo, useState } from 'react';
import { ActionIcon, Box, Flex, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';

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

  const columns = useMemo<MRT_ColumnDef<Category>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Color',
        size: 100,
        Cell: ({ row }) => (
          <Flex align='center'>
            <Box
              w={10}
              h={10}
              bg={row.original.color}
              style={{
                borderRadius: '50%',
              }}
              mb={2}
            ></Box>
            <Box ml={2}>{row.original.color}</Box>
          </Flex>
        ),
      },
      {
        header: 'Actions',
        size: 80,
        Cell: ({ row }) => (
          <Flex>
            <ActionIcon
              variant='subtle'
              color='gray'
              onClick={() => {
                setCategory(row.original);
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
                setCategory(row.original);
                openDelete();
              }}
              aria-label='Delete category'
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Flex>
        ),
      },
    ],
    [openDelete, openEdit]
  );

  const table = useMantineReactTable({
    columns,
    data: categories ?? [],
    enablePagination: false,
    enableBottomToolbar: false,
    initialState: {
      density: 'xs',
    },
  });

  return (
    <>
      <MantineReactTable table={table} />

      <Modal opened={openedEdit} onClose={closeEdit} title='Edit Category'>
        <AddEditCategoryForm category={category} onClose={closeEdit} />
      </Modal>

      <Modal opened={openedDelete} onClose={closeDelete} title='Delete Category?'>
        <DeleteCategory categoryId={category?.id} onClose={closeDelete} />
      </Modal>
    </>
  );
}
