import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button, Flex, Text, Title } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';

import { getUser } from '~/lib/auth';
import { getCategories } from '~/lib/fetchers';
import { AddCategory } from '~/components/add-category';
import { CategoriesTable } from '~/components/categories-table';

export default async function ManageCategories() {
  const user = await getUser();
  const categories = await getCategories();

  if (!user) {
    redirect('/signin');
  }

  return (
    <>
      <Title order={1} mb='sm' flex={1}>
        Manage Categories
      </Title>
      <Flex mb='lg' justify='space-between'>
        <AddCategory />
        <Button leftSection={<IconArrowNarrowLeft size={14} />} component={Link} href='/' ml='sm'>
          Back
        </Button>
      </Flex>
      {categories.length === 0 ? <Text>No categories yet..</Text> : <CategoriesTable categories={categories} />}
    </>
  );
}
