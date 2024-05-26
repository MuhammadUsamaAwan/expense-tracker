import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button, Flex, Text, Title } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';

import { getUser } from '~/lib/auth';
import { getCategories } from '~/lib/fetchers';
import { AddCategory } from '~/components/add-edit-category';
import { CategoriesTable } from '~/components/categories-table';

export default async function ManageCategories() {
  const user = await getUser();
  const categories = await getCategories();

  if (!user) {
    redirect('/signin');
  }

  return (
    <>
      <Flex>
        <Title order={1} mb='lg' flex={1}>
          Add Category
        </Title>
        <AddCategory />
        <Button leftSection={<IconArrowNarrowLeft size={14} />} component={Link} href='/' ml='sm'>
          Back
        </Button>
      </Flex>
      {categories.length === 0 ? <Text>No categories yet..</Text> : <CategoriesTable categories={categories} />}
    </>
  );
}
