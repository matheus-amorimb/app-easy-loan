import React from 'react';
import { useState } from 'react';
import LoanForm from '../../components/LoanForm/LoanForm';
import { SimulateLoanInput } from '../../models/SimulateLoanInput';
import './Home.css';
import Installment from '../../components/Installment/Installment';
import logo from '../../assets/easy-loan-logo-header.svg';

function Home() {
  const [loanInput, setLoanInput] = useState<SimulateLoanInput | null>(null);

  const handleFormSubmit = (data: SimulateLoanInput) => {
    setLoanInput(data);
  };

  return (
    <>
      <header className="container header">
        {' '}
        <a href="/home">
          <img src={logo} alt="" />
        </a>
        <a href="/loans">Meu empréstimos</a>
      </header>
      <h1 className="title container">Simule e solicite o seu empréstimo.</h1>
      <LoanForm onSubmit={handleFormSubmit} />
      {loanInput && <Installment simulateLoanInput={loanInput} />}
    </>
  );
}

export default Home;
