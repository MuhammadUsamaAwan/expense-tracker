import { notifications } from '@mantine/notifications';

export function showError(error?: string) {
  notifications.show({
    color: 'red',
    title: 'Error',
    message: error ?? 'Something went wrong.',
  });
}
