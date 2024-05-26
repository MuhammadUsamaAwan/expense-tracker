import { Flex, Loader } from '@mantine/core';

export default function Loading() {
  return (
    <Flex
      style={{
        height: 'calc(100dvh - 40px)',
      }}
      align='center'
      justify='center'
    >
      <Loader color='blue' type='dots' size={100} />
    </Flex>
  );
}
