'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { Anchor, Button, Flex, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';

import { signin } from '~/lib/actions';
import { showError } from '~/lib/utils';
import { authSchema } from '~/lib/validations';

export function SigninForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
    },
    validate: zodResolver(authSchema),
  });

  return (
    <form
      onSubmit={form.onSubmit(values =>
        startTransition(async () => {
          try {
            await signin(values);
          } catch (error) {
            showError(error);
          }
        })
      )}
    >
      <TextInput
        withAsterisk
        label='Username'
        placeholder='Enter your username'
        key={form.key('username')}
        {...form.getInputProps('username')}
        mb='md'
      />
      <PasswordInput
        withAsterisk
        label='Password'
        placeholder='Enter your password'
        key={form.key('password')}
        {...form.getInputProps('password')}
      />
      <Flex justify='space-between' align='center' mt='md'>
        <div>
          Don&apos;t have an account?{' '}
          <Anchor component={Link} href='/signin'>
            Sign up
          </Anchor>
        </div>
        <Button type='submit' loading={isPending}>
          Submit
        </Button>
      </Flex>
    </form>
  );
}
