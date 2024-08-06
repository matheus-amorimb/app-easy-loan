import { SubmitHandler, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import './LoanForm.css';
import { SimulateLoanInput } from '../../models/SimulateLoanInput';

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

function validateCpf(data: any): string | boolean {
  if (removeNonDigits(data).length < 11) return 'CPF inválido';
  return true;
}

function validateBirthdate(data: any): string | boolean {
  const [day, month, year] = data.split('/').map(Number);
  if (year < 1900) return 'Data de nascimento inválida';
  if (day <= 0 || day > 31) return 'Data de nascimento inválida';
  if (month <= 0 || month > 12) return 'Data de nascimento inválida';
  if (removeNonDigits(data).length < 8) return 'Data de nascimento inválida';
  if (convertToDate(data) > new Date()) return 'Data de nascimento inválida';
  return true;
}

function validateLoanAmount(data: any): string | boolean {
  if (
    cleanCurrencyString(data) === '' ||
    parseFloat(cleanCurrencyString(data)) < 50000
  ) {
    return 'Valor mínimo para empréstimo é de R$50.000,00';
  }
  return true;
}

function validateMonthlyInstallment(data: any, total: any): string | boolean {
  data = cleanCurrencyString(data);
  total = cleanCurrencyString(total);
  if (total < 50000 || data === '' || total === '')
    return 'Valor mínimo da parcela é de R$5.000,00';
  if (parseFloat(data) / parseFloat(total) < 0.015)
    return `Valor mínimo da parcela é de ${formatToCurrency(total * 0.015)} para total simulado.`;
  if (parseFloat(data) / parseFloat(total) >= 1)
    return `Valor da parcela não pode ser maior que ${formatToCurrency(parseFloat(total))}.`;
  return true;
}

function formatToCurrency(input: number): string {
  const currency = input.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return currency;
}

function currencyMask(value: string): string {
  const numberValue = value.replace(/\D/g, '');
  const formattedValue = numberValue
    .replace(/(\d)(\d{2})$/, '$1,$2')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    .replace(/^/, 'R$ ');

  return formattedValue;
}

function removeNonDigits(value: string): string {
  return value.replace(/\D/g, '');
}

function cleanCurrencyString(currencyString: string): string {
  return currencyString
    .replace(/R\$|\s+/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
}

function convertToDate(dateString: string): Date {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
}
