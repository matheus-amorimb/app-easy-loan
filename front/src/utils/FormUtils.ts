export function validateCpf(data: any): string | boolean {
  if (removeNonDigits(data).length < 11) return 'CPF inválido';
  return true;
}

export function validateBirthdate(data: any): string | boolean {
  const [day, month, year] = data.split('/').map(Number);
  if (year < 1900) return 'Data de nascimento inválida';
  if (day <= 0 || day > 31) return 'Data de nascimento inválida';
  if (month <= 0 || month > 12) return 'Data de nascimento inválida';
  if (removeNonDigits(data).length < 8) return 'Data de nascimento inválida';
  if (convertToDate(data) > new Date()) return 'Data de nascimento inválida';
  return true;
}

export function validateLoanAmount(data: any): string | boolean {
  if (
    cleanCurrencyString(data) === '' ||
    parseFloat(cleanCurrencyString(data)) < 50000
  ) {
    return 'Valor mínimo para empréstimo é de R$50.000,00';
  }
  return true;
}

export function validateMonthlyInstallment(
  data: any,
  total: any,
): string | boolean {
  data = cleanCurrencyString(data);
  total = cleanCurrencyString(total);
  if (total < 50000 || data === '' || total === '')
    return 'Valor mínimo da parcela é de R$5.000,00';
  if (parseFloat(data) / parseFloat(total) < 0.015)
    return `Valor mínimo da parcela é de ${formatToCurrency(total * 0.015)} para total simulado.`;
  if (parseFloat(data) / parseFloat(total) >= 1)
    return `Valor da parcela não pode ser maior que ${formatToCurrency(parseFloat(total))}.`;
  return true;
}

export function formatToCurrency(input: number): string {
  const currency = input.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return currency;
}

export function currencyMask(value: string): string {
  const numberValue = value.replace(/\D/g, '');
  const formattedValue = numberValue
    .replace(/(\d)(\d{2})$/, '$1,$2')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    .replace(/^/, 'R$ ');

  return formattedValue;
}

export function removeNonDigits(value: string): string {
  return value.replace(/\D/g, '');
}

export function cleanCurrencyString(currencyString: string): string {
  return currencyString
    .replace(/R\$|\s+/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
}

export function convertToDate(dateString: string): Date {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
}
