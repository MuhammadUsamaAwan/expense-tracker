import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button, Flex, Text, Title } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';

import { getUser } from '~/lib/auth';
import { getCategories, getTemplates } from '~/lib/fetchers';
import { AddTemplate } from '~/components/add-template';
import { TemplatesTable } from '~/components/template-table';

export default async function ManageTemplates() {
  const user = await getUser();
  const templates = await getTemplates();
  const categories = await getCategories();

  if (!user) {
    redirect('/signin');
  }

  return (
    <>
      <Title order={1} mb='sm' flex={1}>
        Manage Templates
      </Title>
      <Flex mb='lg' justify='space-between'>
        <AddTemplate categories={categories} />
        <Button leftSection={<IconArrowNarrowLeft size={14} />} component={Link} href='/' ml='sm'>
          Back
        </Button>
      </Flex>
      {templates.length === 0 ? (
        <Text>No templates yet..</Text>
      ) : (
        <TemplatesTable categories={categories} templates={templates} />
      )}
    </>
  );
}
