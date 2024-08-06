import React from 'react';
import { useState } from 'react';
import LoanForm from '../../components/LoanForm/LoanForm';
import { SimulateLoanInput } from '../../models/SimulateLoanInput';
import './Loan.css';
import Installment from '../../components/Installment/Installment';

function Loan() {
  const [loanInput, setLoanInput] = useState<SimulateLoanInput | null>(null);

  const handleFormSubmit = (data: SimulateLoanInput) => {
    setLoanInput(data);
  };

  return (
    <>
      <h1 className="title container">Simule e solicite o seu empréstimo.</h1>
      <LoanForm onSubmit={handleFormSubmit} />
      {loanInput && <Installment simulateLoanInput={loanInput} />}
    </>
  );
}

export default Loan;
