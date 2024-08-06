import './Installment.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Installment } from '../../models/Installment';
import { SimulateLoanInput } from '../../models/SimulateLoanInput';
import { ICMS } from '../../enums/ICMS.enum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import ApplyForLoanInput from '../../models/ApplyForLoanInput';
import Modal from 'react-modal';
const apiURL = import.meta.env.VITE_API_URL;

interface LoanFormProps {
  simulateLoanInput: SimulateLoanInput;
}

const LoanForm: React.FC<LoanFormProps> = ({
  simulateLoanInput: simulateLoanData,
}) => {
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [shouldDisplayInstallments, setShouldDisplayInstallments] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const getInstallments = async (url: string) => {
    try {
      const response = await axios.post<Installment[]>(url, simulateLoanData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const totalInterest = response?.data.reduce(
        (acc, installment) => acc + installment.interest,
        0,
      );
      setShouldDisplayInstallments(true);
      setTotalInterest(totalInterest);
      setInstallments(response?.data);
    } catch (error) {
      setShouldDisplayInstallments(false);
      console.error('Error fetching installments:', error);
    }
  };

  const submitLoan = async () => {
    setIsLoading(true);
    try {
      const requestUrl = `${apiURL}/loans/apply`;
      const applyForLoan: ApplyForLoanInput = {
        userCpf: simulateLoanData.userCpf,
        userUf: simulateLoanData.userUf,
        userBirthdate: new Date(simulateLoanData.userBirthdate),
        total: simulateLoanData.total,
        monthlyInstallment: simulateLoanData.monthlyInstallment,
      };
      const response = await axios.post<any>(requestUrl, applyForLoan, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setModalIsOpen(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Error fetching installments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const requestUrl = `${apiURL}/loans/simulate`;
    getInstallments(requestUrl);
  }, [simulateLoanData]);

  return (
    <main className="container">
      {!shouldDisplayInstallments && (
        <h2 className="loan-simulation-header">
          Houve um problema para realizar sua simulação. Tente novamente.
        </h2>
      )}
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
                  <h2>{FormatToCurrency(simulateLoanData?.total)}</h2>
                </div>
                <div>
                  <h3>total de meses para quitar</h3>
                  <h2>{installments?.length} meses</h2>
                </div>
              </div>
              <div className="loan-information-col-2">
                <div>
                  <h3>taxa de juros</h3>
                  <h2>{getICMSValue(simulateLoanData?.userUf)}% ao mês</h2>
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
                    {FormatToCurrency(simulateLoanData?.monthlyInstallment)}
                  </h2>
                </div>
                <div>
                  <h3>total a pagar</h3>
                  <h2>
                    {FormatToCurrency(simulateLoanData?.total + totalInterest)}
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
