import { Container, Paper, Title } from '@mantine/core';
import LoginForm from '../features/auth/components/LoginForm';

const LoginPage = () => {
  return (
    <Container>
      <Paper shadow="md" p="md" withBorder mt="xl">
        <Title style={{ textAlign: 'center' }} order={2}>
          Login
        </Title>
        <LoginForm />
      </Paper>
    </Container>
  );
};

export default LoginPage;