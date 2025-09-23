import { Center, Loader } from '@mantine/core';

export const Fallback = () => {
  return (
    <Center style={{ width: '100%', height: '100vh' }}>
      <Loader />
    </Center>
  );
};