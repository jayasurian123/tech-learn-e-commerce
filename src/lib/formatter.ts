export function formatCurrency(amount: number, countryCode = 'en-US'): string {
  const formatter = new Intl.NumberFormat(countryCode, {
    style: 'currency',
    currency: 'EUR',
  });

  return formatter.format(amount);
}

export function formatNumber(number: number): string {
  return new Intl.NumberFormat('en-US').format(number);
}
