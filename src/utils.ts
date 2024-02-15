export const formatCurrency = (value: number) => {
  const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  return currencyFormat.format(value);
};

export const newLineToBr = (value: string) => value.replace(/\n/g, '<br />');
