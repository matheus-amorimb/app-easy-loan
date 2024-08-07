import React, { useEffect, useState } from 'react';
import './Loan.css';
import logo from '../../assets/easy-loan-logo-header.svg';
import axiosInstance from '../../AxiosConfig';
import GetLoansOutput from '../../models/GetLoansOutput';
import {
  formatDateToDDMMYY,
  getICMSValue,
  formatToCurrency,
  formatDateToDDMMYYHHMMSS,
} from '../../utils/InstallmentUtils';

function Loan() {
  const [loans, setLoans] = useState<GetLoansOutput[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  const getLoans = async () => {
    try {
      const response = await axiosInstance.get('/loans/all');
      setLoans(response.data);
      console.log(response.data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      setError('Erro ao buscar o seus empréstimos.');
    }
  };

  useEffect(() => {
    getLoans();
  }, []);

  return (
    <>
      <header className="container header">
        {' '}
        <img src={logo} alt="" />
        <a href="/home">Início</a>
      </header>
      <div className="container">
        <h1>Empréstimos</h1>
        {loans?.map((loan: GetLoansOutput) => (
          <div className="loans-container">
            <div className="loan-card">
              <div>
                <h3>data</h3>
                <h2>{formatDateToDDMMYYHHMMSS(loan.date)}</h2>
              </div>
              <div>
                <h3>taxa de juros</h3>
                <h2>{getICMSValue(loan.userUf)}% ao mês</h2>
              </div>
              <div>
                <h3>valor solicitado</h3>
                <h2>{formatToCurrency(parseFloat(loan.total))}</h2>
              </div>
              <div>
                <h3>valor escolhido pagar por mês</h3>
                <h2>{formatToCurrency(parseFloat(loan.monthlyInstallment))}</h2>
              </div>
              <div>
                <h3>total de parcelas</h3>
                <h2>{loans.length} parcelas</h2>
              </div>
              <></>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Loan;
