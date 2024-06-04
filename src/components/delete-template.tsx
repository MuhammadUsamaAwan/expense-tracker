import { useTransition } from 'react';
import { Button, Flex, Text } from '@mantine/core';

import { deleteTemplate } from '~/lib/actions';
import { showError } from '~/lib/utils';

type DeleteTemplateProps = {
  templateId?: string;
  onClose: () => void;
};

export function DeleteTemplate({ templateId, onClose }: DeleteTemplateProps) {
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
                if (templateId) {
                  await deleteTemplate(templateId);
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
