import { useTransition } from 'react';
import { Button, Flex, Text } from '@mantine/core';

import { deleteExpense } from '~/lib/actions';
import { showError } from '~/lib/utils';

type DeleteExpenseProps = {
  expenseId?: string;
  onClose: () => void;
};

export function DeleteExpense({ expenseId, onClose }: DeleteExpenseProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <Text>Deleting this will permanently remove this. This action can&apos;t be undone.</Text>
      <Flex mt='md' justify='flex-end'>
        <Button
          color='red'
          onClick={() => {
            startTransition(async () => {
              try {
                if (expenseId) {
                  await deleteExpense(expenseId);
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
