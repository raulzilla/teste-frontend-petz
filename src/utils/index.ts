export const convertForCoin = (number?: number) => {
  const coin = number ?? 0
  const value = parseFloat(coin.toString());
  if (!isNaN(value)) {
    const valueFormat = value.toFixed(2);
    return `R$ ${valueFormat.replace('.', ',')}`;
  }

  return 0
}