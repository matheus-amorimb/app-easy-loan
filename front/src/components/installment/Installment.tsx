import axios from 'axios';
import { useEffect, useState } from 'react';
const apiURL = import.meta.env.VITE_API_URL;

const LoanForm = () => {
  const [installments, setInstallments] = useState([]);

  const getInstallments = async (url: string) => {
    try {
      console.log(url)
      const response = await axios.get(url);
      console.log(response);
    } catch (error) {
      console.error('Error fetching installments:', error);
    }
  };

  useEffect(() => {
    const requestUrl = `${apiURL}/loans/all`;
    getInstallments(requestUrl);
  }, []);

  return <h1>ESTOU FUNCIONANDO</h1>;
};

async function fetchInstallments() {}

export default LoanForm;
