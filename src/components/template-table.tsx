'use client';

import { useState } from 'react';
import { ActionIcon, Modal, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconTrash } from '@tabler/icons-react';

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

  return (
    <>
      <Table.ScrollContainer minWidth={375}>
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {templates.map(c => (
              <Table.Tr key={c.id}>
                <Table.Td>{c.name}</Table.Td>
                <Table.Td width={80}>
                  <ActionIcon
                    variant='subtle'
                    color='gray'
                    onClick={() => {
                      setTemplate(c);
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
                      setTemplate(c);
                      openDelete();
                    }}
                    aria-label='Delete template'
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Modal opened={openedEdit} onClose={closeEdit} title='Edit Template'>
        <AddEditTemplateForm categories={categories} template={template} onClose={closeEdit} />
      </Modal>

      <Modal opened={openedDelete} onClose={closeDelete} title='Delete Template?'>
        <DeleteTemplate templateId={template?.id} onClose={closeDelete} />
      </Modal>
    </>
  );
}
