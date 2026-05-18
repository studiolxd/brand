import { useState } from 'react';
import './LoginForm.css';
import { Form } from '../../molecules/Form/Form';
import { InputField } from '../../molecules/InputField/InputField';
import { Heading } from '../../atoms/Heading/Heading';
import { Button } from '../../atoms/Button/Button';
import { Logo } from '../../atoms/Logo/Logo';

export interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string }) => void;
  errors?: string[];
  loading?: boolean;
  title?: string;
}

export function LoginForm({
  onSubmit,
  errors,
  loading = false,
  title = 'Iniciar sesión',
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit?.({ email, password });
  };

  const handleFormSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="login-form">
      <Logo width={140} />
      <Heading level={2} size={5}>{title}</Heading>
      <Form onSubmit={handleFormSubmit} errors={errors}>
        <InputField
          id="login-email"
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          id="login-password"
          label="Contraseña"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form>
      <Button variant="primary" disabled={loading} onClick={handleSubmit}>
        {loading ? 'Iniciando sesión…' : 'Iniciar sesión'}
      </Button>
    </div>
  );
}
