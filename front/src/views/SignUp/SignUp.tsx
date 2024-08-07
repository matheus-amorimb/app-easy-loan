import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import InputMask from 'react-input-mask';
import { useForm, SubmitHandler } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import SignUpInput from '../../models/SignUpInput';
import {
  convertToDate,
  removeNonDigits,
  validateBirthdate,
  validateCpf,
} from '../../utils/FormUtils';
import { validateEmail } from '../../utils/AuthUtils';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpInput>({ reValidateMode: 'onChange' });

  const { signUp, loading, authError } = useAuth();
  const navigate = useNavigate();

  const onSubmitHandler: SubmitHandler<SignUpInput> = (data: SignUpInput) => {
    const input = {
      fullName: data.fullName,
      email: data.email,
      cpf: removeNonDigits(data?.cpf),
      password: data.password,
      confirmPassword: data.confirmPassword,
      birthdate: convertToDate(data?.birthdate).toDateString(),
      uf: data.uf,
    };
    signUp(input, () => navigate('/home'));
  };

  return (
    <main className="container signup-main">
      <div className="form-container-signup">
        <h2>easy loan</h2>
        <form
          className="signup-form"
          action=""
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <input
            type="text"
            placeholder="Nome Completo"
            {...register('fullName', {
              required: 'Nome completo é obrigatório.',
              validate: (data) => {
                if (data.split(' ').length === 1) {
                  console.log('data.split(');
                  return 'Favor preenche nome completo.';
                }
              },
            })}
          ></input>
          {errors.fullName && (
            <div className="form-error-message">{errors.fullName?.message}</div>
          )}
          <InputMask
            mask="999.999.999-99"
            type="text"
            placeholder="CPF"
            {...register('cpf', {
              required: 'CPF é obrigatório.',
              validate: validateCpf,
            })}
          ></InputMask>
          {errors.cpf && (
            <div className="form-error-message">{errors.cpf?.message}</div>
          )}
          <InputMask
            mask="99/99/9999"
            type="text"
            placeholder="Data de nascimento"
            {...register('birthdate', {
              required: 'Data de nascimento é obrigatório.',
              validate: validateBirthdate,
            })}
          ></InputMask>
          {errors.birthdate && (
            <div className="form-error-message">
              {errors.birthdate?.message}
            </div>
          )}
          <select
            {...register('uf', {
              required: 'UF é obrigatório.',
            })}
          >
            <option value="" hidden>
              UF
            </option>
            <option value="ES">ES</option>
            <option value="MG">MG</option>
            <option value="RJ">RJ</option>
            <option value="SP">SP</option>
          </select>
          {errors.uf && (
            <div className="form-error-message">{errors.uf?.message}</div>
          )}
          <input
            type="text"
            placeholder="Email"
            {...register('email', {
              required: 'Email é obrigatório.',
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
                if (value.length < 6) {
                  return 'A senha deve conter no mínimo 6 caracteres.';
                }
              },
            })}
          ></input>
          {errors.password && (
            <div className="form-error-message">{errors.password?.message}</div>
          )}
          <input
            type="password"
            placeholder="Confirmar Senha"
            {...register('confirmPassword', {
              required: 'Senha é obrigatório.',
              validate: (value) => {
                if (value !== getValues('password')) {
                  return 'As senhas não coincidem.';
                }
              },
            })}
          ></input>
          {errors.confirmPassword && (
            <div className="form-error-message">
              {errors.confirmPassword?.message}
            </div>
          )}
          <button type="submit">registrar</button>
          {authError && <div className="form-error-message">{authError}</div>}
        </form>
        <span>
          {' '}
          Já tem uma conta? <a href="/sign_in">Entrar</a>{' '}
        </span>
      </div>
    </main>
  );
};

export default SignUp;
