import './Installment.css';
import { Installment } from '../../models/Installment';
import { SimulateLoanInput } from '../../models/SimulateLoanInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import {
  FormatToCurrency,
  getICMSValue,
  FormatDateToDDMMYY,
} from '../../utils/InstallmentUtils';
import { useLoan } from '../../hooks/useLoan';

const LoanForm: React.FC<{ simulateLoanInput: SimulateLoanInput }> = ({
  simulateLoanInput,
}) => {
  const {
    installments,
    totalInterest,
    isLoading,
    error,
    modalIsOpen,
    setModalIsOpen,
    shouldDisplayInstallments,
    submitLoan,
  } = useLoan(simulateLoanInput);

  return (
    <main className="container">
      {error && <h2 className="loan-simulation-header">{error}</h2>}
      {shouldDisplayInstallments && (
        <>
          <h2 className="loan-simulation-header">
            Veja a simulação para o seu empréstimo antes de efetivar
          </h2>
          <div className="loan-simulation">
            <div className="loan-information-container">
              <div className="loan-information-col-1">
                <div>
                  <h3>valor requerido</h3>
                  <h2>{FormatToCurrency(simulateLoanInput?.total)}</h2>
                </div>
                <div>
                  <h3>total de meses para quitar</h3>
                  <h2>{installments?.length} meses</h2>
                </div>
              </div>
              <div className="loan-information-col-2">
                <div>
                  <h3>taxa de juros</h3>
                  <h2>{getICMSValue(simulateLoanInput?.userUf)}% ao mês</h2>
                </div>
                <div>
                  <h3>total de juros</h3>
                  <h2>{FormatToCurrency(totalInterest)}</h2>
                </div>
              </div>
              <div className="loan-information-col-3">
                <div>
                  <h3>valor que deseja pagar por mês</h3>
                  <h2>
                    {FormatToCurrency(simulateLoanInput?.monthlyInstallment)}
                  </h2>
                </div>
                <div>
                  <h3>total a pagar</h3>
                  <h2>
                    {FormatToCurrency(simulateLoanInput?.total + totalInterest)}
                  </h2>
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
                      <td>
                        {FormatToCurrency(installment.outstandingBalance)}
                      </td>
                      <td>{FormatToCurrency(installment.interest)}</td>
                      <td>
                        {FormatToCurrency(
                          installment.adjustedOutstandingBalance,
                        )}
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
            <button
              className="apply-loan-button"
              disabled={isLoading}
              onClick={submitLoan}
            >
              {isLoading ? 'Carregando...' : 'Efetivar o empréstimo'}
              {!isLoading && (
                <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
              )}
            </button>
          </div>
        </>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Loan Application Success"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <button
          className="modal-close-button"
          onClick={() => setModalIsOpen(false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Empréstimo solicitado com sucesso!</h2>
      </Modal>
    </main>
  );
};

export default LoanForm;
