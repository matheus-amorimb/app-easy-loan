import axios from 'axios';
import { useEffect, useState } from 'react';
import ApplyForLoanInput from '../models/ApplyForLoanInput';
import { Installment } from '../models/Installment';
import { SimulateLoanInput } from '../models/SimulateLoanInput';

const apiURL = 'http://18.231.175.178:3000/v1';

export function useLoan(simulateLoanData: SimulateLoanInput) {
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const shouldDisplayInstallments = installments.length > 0;

  const getInstallments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post<Installment[]>(
        `${apiURL}/loans/simulate`,
        simulateLoanData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const totalInterest = response.data.reduce(
        (acc, installment) => acc + installment.interest,
        0,
      );
      setInstallments(response.data);
      setTotalInterest(totalInterest);
    } catch (error) {
      setError('Erro ao buscar as parcelas.');
    } finally {
      setIsLoading(false);
    }
  };

  const submitLoan = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const applyForLoan: ApplyForLoanInput = {
        userCpf: simulateLoanData.userCpf,
        userUf: simulateLoanData.userUf,
        userBirthdate: new Date(simulateLoanData.userBirthdate),
        total: simulateLoanData.total,
        monthlyInstallment: simulateLoanData.monthlyInstallment,
      };
      await axios.post(`${apiURL}/loans/apply`, applyForLoan, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setModalIsOpen(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      setError('Erro ao efetivar o empréstimo.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInstallments();
  }, [simulateLoanData]);

  return {
    installments,
    totalInterest,
    isLoading,
    error,
    modalIsOpen,
    setModalIsOpen,
    shouldDisplayInstallments,
    submitLoan,
  };
}
