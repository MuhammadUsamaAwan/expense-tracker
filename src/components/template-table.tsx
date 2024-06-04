'use client';

import { useMemo, useState } from 'react';
import { ActionIcon, Flex, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';

import type { Category, Template } from '~/types';
import { DeleteTemplate } from '~/components//delete-template';
import { AddEditTemplateForm } from '~/components/add-edit-template-form';

type TemplatesTableProps = {
  categories: Category[];
  templates: Template[];
};

export function TemplatesTable({ categories, templates }: TemplatesTableProps) {
  const [template, setTemplate] = useState<Template | null>(null);
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);

  const columns = useMemo<MRT_ColumnDef<Template>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
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
                setTemplate(row.original);
                openEdit();
              }}
              aria-label='Edit template'
            >
              <IconEdit size={16} />
            </ActionIcon>
            <ActionIcon
              variant='subtle'
              color='red'
              onClick={() => {
                setTemplate(row.original);
                openDelete();
              }}
              aria-label='Delete template'
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
    data: templates ?? [],
    enablePagination: false,
    enableBottomToolbar: false,
    initialState: {
      density: 'xs',
    },
  });

  return (
    <>
      <MantineReactTable table={table} />

      <Modal opened={openedEdit} onClose={closeEdit} title='Edit Template'>
        <AddEditTemplateForm categories={categories} template={template} onClose={closeEdit} />
      </Modal>

      <Modal opened={openedDelete} onClose={closeDelete} title='Delete Template?'>
        <DeleteTemplate templateId={template?.id} onClose={closeDelete} />
      </Modal>
    </>
  );
}
