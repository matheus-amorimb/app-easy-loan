import { SubmitHandler, useForm } from 'react-hook-form';
import './SignIn.css';
import SignInInput from '../../models/SignInInput';
import { validateEmail } from '../../utils/AuthUtils';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({ reValidateMode: 'onChange' });

  const { signIn, authError } = useAuth();
  const navigate = useNavigate();

  const onSubmitHandler: SubmitHandler<SignInInput> = (data: SignInInput) => {
    signIn(data, () => navigate('/home'));
  };
  return (
    <main className="container signin-main">
      <div className="form-container">
        <h2>easy loan</h2>
        <form
          className="signin-form"
          action=""
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <input
            type="text"
            placeholder="Email"
            {...register('email', {
              required: 'Email é obrigatório',
              validate: validateEmail,
            })}
          ></input>
          {errors.email && (
            <div className="form-error-message">{errors.email?.message}</div>
          )}
          <input
            type="password"
            placeholder="Senha"
            {...register('password', {
              required: 'Senha é obrigatório.',
              validate: (value) => {
                if (value.length < 6)
                  return 'A senha deve conter no mínimo 6 caracteres.';
              },
            })}
          ></input>
          {errors.password && (
            <div className="form-error-message">{errors.password?.message}</div>
          )}
          <button type="submit">entrar</button>
          {authError && <div className="form-error-message">{authError}</div>}
          <span>
            {' '}
            Não tem uma conta ainda? <a href="/sign_up">Cadastrar-se</a>{' '}
          </span>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
