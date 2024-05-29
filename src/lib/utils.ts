import { notifications } from '@mantine/notifications';

export function showError(error?: unknown) {
  notifications.show({
    color: 'red',
    title: 'Error',
    message: typeof error === 'string' ? error : error instanceof Error ? error.message : 'Something went wrong.',
  });
}
