import { Container, Paper, Title } from '@mantine/core';
import RegisterForm from '../features/auth/components/RegisterForm';

const RegisterPage = () => {
  return (
    <Container>
      <Paper shadow="md" p="md" withBorder mt="xl">
        <Title ta="center" order={2}>
          Register
        </Title>
        <RegisterForm />
      </Paper>
    </Container>
  );
};

export default RegisterPage;