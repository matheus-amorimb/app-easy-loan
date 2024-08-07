import { ICMS } from '../enums/ICMS.enum';

export function FormatDateToDDMMYY(date: string): string {
  const rawDate = new Date(date);
  const day = rawDate.getDate().toString().padStart(2, '0');
  const month = (rawDate.getMonth() + 1).toString().padStart(2, '0');
  const year = rawDate.getUTCFullYear();
  const shortYear = year % 100;

  return `${day}/${month}/${shortYear}`;
}

export function FormatToCurrency(input: number): string {
  const currency = input.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return currency;
}

export function getICMSValue(key: string): string | undefined {
  return ICMS[key as keyof typeof ICMS];
}
