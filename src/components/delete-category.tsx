import { useTransition } from 'react';
import { Button, Flex, Text } from '@mantine/core';

import { deleteCategory } from '~/lib/actions';
import { showError } from '~/lib/utils';

type DeleteCategoryProps = {
  categoryId?: string;
  onClose: () => void;
};

export function DeleteCategory({ categoryId, onClose }: DeleteCategoryProps) {
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
                onClose();
              } catch (error) {
                showError(error);
              }
            });
          }}
          loading={isPending}
        >
          Yes
        </Button>
        <Button ml='sm' variant='default' onClick={onClose}>
          No
        </Button>
      </Flex>
    </>
  );
}
