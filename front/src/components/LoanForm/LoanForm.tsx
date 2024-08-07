import { SubmitHandler, useForm } from 'react-hook-form';
import './LoanForm.css';
import { SimulateLoanInput } from '../../models/SimulateLoanInput';
import {
  cleanCurrencyString,
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
          <input
            {...register('total', {
              required: 'Valor do empréstimo é obrigatório.',
              validate: validateLoanAmount,
            })}
            type="text"
            placeholder="Qual valor do empréstimo?"
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
            placeholder="Qual valor deseja pagar por mês?"
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
