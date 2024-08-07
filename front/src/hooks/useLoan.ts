import axios from 'axios';
import { useEffect, useState } from 'react';
import ApplyForLoanInput from '../models/ApplyForLoanInput';
import { Installment } from '../models/Installment';
import { SimulateLoanInput } from '../models/SimulateLoanInput';
import axiosInstance from '../AxiosConfig';

export function useLoan(simulateLoanData: SimulateLoanInput) {
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [interest, setInterest] = useState<string>('');

  const shouldDisplayInstallments = installments.length > 0;

  const getInstallments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post<Installment[]>(
        '/loans/simulate',
        simulateLoanData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setInterest(
        (
          (response.data[0].interest * 100) /
          response.data[0].outstandingBalance
        ).toFixed(1),
      );
      const totalInterest = response.data.reduce(
        (acc, installment) => acc + installment.interest,
        0,
      );
      setInstallments(response.data);
      setTotalInterest(totalInterest);
    } catch (error) {
      setError(
        'Houve um problema para calcular suas parcelas. Favor tentar novamente.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const submitLoan = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const applyForLoan: ApplyForLoanInput = {
        total: simulateLoanData.total,
        monthlyInstallment: simulateLoanData.monthlyInstallment,
      };
      await axiosInstance.post('/loans/apply', applyForLoan, {
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
    interest,
  };
}
