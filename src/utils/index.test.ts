import { convertForCoin } from '.';

describe('convertForCoin function', () => {
  it('should convert a number to a currency format', () => {
    const result = convertForCoin(234.56);
    expect(result).toBe('R$ 234,56');
  });

  it('should convert zero to a currency format', () => {
    const result = convertForCoin(0);
    expect(result).toBe('R$ 0,00');
  });

  it('should handle undefined input', () => {
    const result = convertForCoin(undefined);
    expect(result).toBe('R$ 0,00');
  });
});