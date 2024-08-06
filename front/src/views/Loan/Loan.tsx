import Installment from '../../components/installment/Installment';
import './Loan.css';

function Loan() {
  return (
    <>
      <h1 className="title">Simule e solicite o seu empréstimo.</h1>
      <Installment />
    </>
  );
}

export default Loan;
