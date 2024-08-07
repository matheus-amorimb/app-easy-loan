import { ICMS } from '../enums/ICMS.enum';

export function formatDateToDDMMYY(date: string): string {
  const rawDate = new Date(date);
  const day = rawDate.getDate().toString().padStart(2, '0');
  const month = (rawDate.getMonth() + 1).toString().padStart(2, '0');
  const year = rawDate.getUTCFullYear();
  const shortYear = year % 100;

  return `${day}/${month}/${shortYear}`;
}

export function formatDateToDDMMYYHHMMSS(date: string): string {
  const rawDate = new Date(date);
  const day = rawDate.getDate().toString().padStart(2, '0');
  const month = (rawDate.getMonth() + 1).toString().padStart(2, '0');
  const year = rawDate.getUTCFullYear();
  const shortYear = year % 100;

  const hours = String(rawDate.getHours()).padStart(2, '0');
  const minutes = String(rawDate.getMinutes()).padStart(2, '0');
  const seconds = String(rawDate.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${shortYear}\n${hours}:${minutes}:${seconds}`;
}

export function formatToCurrency(input: number): string {
  const currency = input.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return currency;
}

export function getICMSValue(key: string): string | undefined {
  return ICMS[key as keyof typeof ICMS];
}
