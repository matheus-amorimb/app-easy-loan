import { SubmitHandler, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import './LoanForm.css';
import { SimulateLoanInput } from '../../models/SimulateLoanInput';
import {
  removeNonDigits,
  convertToDate,
  cleanCurrencyString,
  validateCpf,
  validateBirthdate,
  validateLoanAmount,
  currencyMask,
  validateMonthlyInstallment,
} from '../../utils/FormUtils';

interface LoanFormProps {
  onSubmit: (data: SimulateLoanInput) => void;
}

const LoanForm: React.FC<LoanFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SimulateLoanInput>({ reValidateMode: 'onChange' });

  const onSubmitHandler: SubmitHandler<SimulateLoanInput> = (data: any) => {
    const simulateInput: SimulateLoanInput = {
      userCpf: removeNonDigits(data?.userCpf),
      userUf: data?.userUf,
      userBirthdate: convertToDate(data?.userBirthdate).toDateString(),
      total: parseFloat(cleanCurrencyString(data?.total)),
      monthlyInstallment: parseFloat(
        cleanCurrencyString(data?.monthlyInstallment),
      ),
    };

    onSubmit(simulateInput);
  };

  return (
    <main className="container">
      <h2 className="loan-form-header">
        Preencha o formulário abaixo para simular
      </h2>
      <div className="main-box">
        <form
          action=""
          className="loan-form"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <InputMask
            mask="999.999.999-99"
            {...register('userCpf', {
              required: 'CPF é obrigatório.',
              validate: validateCpf,
            })}
            type="text"
            placeholder="CPF"
          />
          {errors.userCpf && (
            <div className="form-error-message">{errors.userCpf?.message}</div>
          )}
          <select
            {...register('userUf', {
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
          {errors.userUf && (
            <div className="form-error-message">{errors.userUf?.message}</div>
          )}
          <InputMask
            mask="99/99/9999"
            {...register('userBirthdate', {
              required: 'Data de nascimento é obrigatório.',
              validate: validateBirthdate,
            })}
            type="text"
            placeholder="DATA DE NASCIMENTO"
          />
          {errors.userBirthdate && (
            <div className="form-error-message">
              {errors.userBirthdate?.message}
            </div>
          )}
          <input
            {...register('total', {
              required: 'Valor do empréstimo é obrigatório.',
              validate: validateLoanAmount,
            })}
            type="text"
            placeholder="QUAL O VALOR DO EMPRÉSTIMO?"
            onChange={(e) => {
              e.target.value = currencyMask(e.target.value);
            }}
          />
          {errors.total && (
            <div className="form-error-message">{errors.total?.message}</div>
          )}
          <input
            {...register('monthlyInstallment', {
              required: 'Valor que deseja pagar é obrigatório.',
              validate: (value) =>
                validateMonthlyInstallment(value, getValues('total')),
            })}
            type="text"
            placeholder="QUAL VALOR DESEJA PAGAR POR MÊS?"
            onChange={(e) => {
              e.target.value = currencyMask(e.target.value);
            }}
          />
          {errors.monthlyInstallment && (
            <div className="form-error-message">
              {errors.monthlyInstallment?.message}
            </div>
          )}
          <button type="submit" className="simulate-button">
            SIMULAR
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoanForm;
