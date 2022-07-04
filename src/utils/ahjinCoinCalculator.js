export const ahjinCoinCalculator = (priceInRs) => {
  let AC = 0;
  for (let i = 0; i <= priceInRs; i = i + 100) {
    AC += 1;
  }
  return AC;
};
