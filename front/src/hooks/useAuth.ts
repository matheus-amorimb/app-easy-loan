import { useState } from 'react';
import SignInInput from '../models/SignInInput';
import axios from 'axios';
import { SignInOutput } from '../models/SignInOutput';
import SignUpInput from '../models/SignUpInput';
import { SignUpOutput } from '../models/SignUpOutput';

const apiURL = 'http://localhost:3000/v2';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<any | string | null>(null);

  const signIn = async (data: SignInInput, onSucess: () => void) => {
    setLoading(true);
    setAuthError(null);
    try {
      const response = await axios.post<SignInOutput>(
        `${apiURL}/auth/signin`,
        data,
      );
      const { tokenJwt } = response.data;
      localStorage.setItem('tokenJwt', tokenJwt);
      onSucess();
    } catch (error) {
      if (!error) return;
      console.log(error);
      setAuthError(displayLogInMessage(error?.response?.data?.error));
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: SignUpInput, onSucess: () => void) => {
    setLoading(true);
    setAuthError(null);
    try {
      console.log(data);
      const response = await axios.post<SignUpOutput>(
        `${apiURL}/auth/signup`,
        data,
      );
      const { tokenJwt } = response.data;
      localStorage.setItem('token', tokenJwt);
      onSucess();
    } catch (error) {
      console.log(error);
      setAuthError(displaySignUpMessage(error.response.data.error));
    } finally {
      setLoading(false);
    }
  };

  return { signIn, signUp, loading, authError };
};

export default useAuth;

export function displayLogInMessage(responnse: string) {
  if (responnse.includes('User not found')) return 'Email não cadastrado.';
  if (responnse.includes('Password is incorrect')) return 'Senha incorreta.';
  return 'Error ao realizar o login. Por favor, tente novamente';
}

export function displaySignUpMessage(responnse: string) {
  let error = 'Error ao realizar o cadastro. Por favor, tente novamente';
  if (responnse.includes('Cpf already in use')) {
    error = 'Cpf já cadastrado.';
  }
  if (responnse.includes('Email already in use')) {
    error = 'Email já cadastrado.';
  }
  return error;
}
