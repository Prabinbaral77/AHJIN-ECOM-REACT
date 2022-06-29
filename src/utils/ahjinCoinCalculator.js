export const ahjinCoinCalculator = (priceInRs) => {
  if (priceInRs > 0 && priceInRs < 100) {
    return 2;
  } else if (priceInRs >= 100 && priceInRs < 200) {
    return 3;
  } else if (priceInRs >= 200 && priceInRs < 300) {
    return 4;
  } else if (priceInRs >= 300 && priceInRs < 400) {
    return 5;
  } else if (priceInRs >= 400 && priceInRs < 500) {
    return 6;
  } else if (priceInRs >= 500 && priceInRs < 600) {
    return 7;
  } else if (priceInRs >= 600 && priceInRs < 700) {
    return 8;
  } else if (priceInRs >= 700 && priceInRs < 800) {
    return 9;
  } else if (priceInRs >= 800 && priceInRs < 900) {
    return 10;
  } else if (priceInRs >= 900 && priceInRs < 1000) {
    return 11;
  } else if (priceInRs >= 1000 && priceInRs < 1200) {
    return 12;
  } else if (priceInRs >= 1200 && priceInRs < 1300) {
    return 13;
  } else if (priceInRs >= 1300 && priceInRs < 1400) {
    return 14;
  } else if (priceInRs >= 1400 && priceInRs < 1500) {
    return 15;
  } else if (priceInRs >= 1500 && priceInRs < 1600) {
    return 16;
  } else if (priceInRs >= 1600 && priceInRs < 1700) {
    return 17;
  } else if (priceInRs >= 1700 && priceInRs < 2000) {
    return 18;
  } else if (priceInRs >= 2000 && priceInRs < 2500) {
    return 20;
  } else if (priceInRs >= 2500 && priceInRs < 3000) {
    return 22;
  } else if (priceInRs >= 3000 && priceInRs < 4000) {
    return 24;
  } else if (priceInRs >= 4000 && priceInRs < 5000) {
    return 26;
  } else if (priceInRs >= 5000 && priceInRs < 6000) {
    return 28;
  } else {
    return 30;
  }
};
