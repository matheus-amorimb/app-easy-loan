import './Installment.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
const apiURL = import.meta.env.VITE_API_URL;

export interface SimulateLoanInput {
  userCpf: string;
  userUf: string;
  userBirthdate: string;
  total: number;
  monthlyInstallment: number;
}

export interface Installment {
  id: string;
  loanId: string | null;
  number: number;
  outstandingBalance: number;
  interest: number;
  adjustedOutstandingBalance: number;
  amount: number;
  dueData: string;
}

export enum ICMS {
  'ES' = '1,10',
  'MG' = '1,00',
  'RJ' = '0,90',
  'SP' = '0,80',
}

const LoanForm = () => {
  const [installments, setInstallments] = useState<Installment[]>([]);
  const simulateLoanData: SimulateLoanInput = {
    userCpf: '148036',
    userUf: 'MG',
    userBirthdate: '1998-06-18',
    total: 300000,
    monthlyInstallment: 4000,
  };
  const getInstallments = async (url: string) => {
    try {
      const response = await axios.post<Installment[]>(url, simulateLoanData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setInstallments(response?.data);
    } catch (error) {
      console.error('Error fetching installments:', error);
    }
  };

  useEffect(() => {
    const requestUrl = `${apiURL}/loans/simulate`;
    getInstallments(requestUrl);
  }, []);

  return (
    <main className="container">
      <h2 className="loan-simulation-header">
        Veja a simulação para o seu empréstimo antes de efetivar
      </h2>
      <div className="loan-simulation">
        <div className="loan-information-container">
          <div className="loan-information-col-1">
            <div>
              <h3>valor requerido</h3>
              <h2>{FormatToCurrency(simulateLoanData.total)}</h2>
            </div>
            <div>
              <h3>total de meses para quitar</h3>
              <h2>{installments?.length} meses</h2>
            </div>
          </div>
          <div className="loan-information-col-2">
            <div>
              <h3>taxa de juros</h3>
              <h2>{getICMSValue(simulateLoanData.userUf)}% ao mês</h2>
            </div>
            <div>
              <h3>total de juros</h3>
              <h2>{FormatToCurrency(simulateLoanData.total)}</h2>
            </div>
          </div>
          <div className="loan-information-col-3">
            <div>
              <h3>valor que deseja pagar por mês</h3>
              <h2>{FormatToCurrency(simulateLoanData.monthlyInstallment)}</h2>
            </div>
            <div>
              <h3>valor requerido</h3>
              <h2>{FormatToCurrency(simulateLoanData.total)}</h2>
            </div>
          </div>
        </div>
        <div className="installments-container">
          <h3>projeção das parcelas</h3>
          <table className="installments-table">
            <thead>
              <tr className="installment-row">
                <th>saldo do devedor</th>
                <th>juros</th>
                <th>saldo devedor ajustado</th>
                <th>valor da parcela</th>
                <th>vencimento</th>
              </tr>
            </thead>
            <tbody>
              {installments?.map((installment: Installment) => (
                <tr className="installment-row" key={installment.number}>
                  <td>{FormatToCurrency(installment.outstandingBalance)}</td>
                  <td>{FormatToCurrency(installment.interest)}</td>
                  <td>
                    {FormatToCurrency(installment.adjustedOutstandingBalance)}
                  </td>
                  <td>{FormatToCurrency(installment.amount)}</td>
                  <td>{FormatDateToDDMMYY(installment.dueData)}</td>
                </tr>
              ))}
              <tr className="installment-row">
                <td>{FormatToCurrency(0)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="applyForLoan active">efetivar o empréstimo</button>
      </div>
    </main>
  );
};

function FormatDateToDDMMYY(date: string): string {
  const rawDate = new Date(date);
  const day = rawDate.getDate().toString().padStart(2, '0');
  const month = (rawDate.getMonth() + 1).toString().padStart(2, '0');
  const year = rawDate.getUTCFullYear();
  const shortYear = year % 100;

  return `${day}/${month}/${shortYear}`;
}

function FormatToCurrency(input: number): string {
  const currency = input.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return currency;
}

function getICMSValue(key: string): string | undefined {
  return ICMS[key as keyof typeof ICMS];
}

export default LoanForm;
