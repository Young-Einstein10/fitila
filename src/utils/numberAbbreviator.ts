export const abbreviateNumberFactory = (symbols: string[]) => (
  number,
  minDigits = null,
  maxDigits = null
) => {
  if (number === 0) return number;

  // determines SI symbol
  const tier = Math.floor(Math.log10(Math.abs(number)) / 3);

  // get suffix and determine scale
  const suffix = symbols[tier];
  const scale = 10 ** (tier * 3);

  // scale the number
  const scaled = number / scale;

  // format number and add suffix
  return (
    scaled.toLocaleString(undefined, {
      minimumFractionDigits: minDigits,
      maximumFractionDigits: maxDigits,
    }) + suffix
  );
};

const SI_SYMBOLS = ["", "k", "M", "G", "T", "P", "E"];
const SHORT_SYMBOLS = ["", "K", "M", "B", "T", "Q"];
const LONG_SYMBOLS = [
  "",
  " thousand",
  " million",
  " billion",
  " trillion",
  " quadrillion",
];

const abbreviateNumberSI = abbreviateNumberFactory(SI_SYMBOLS);
const abbreviateNumberShort = abbreviateNumberFactory(SHORT_SYMBOLS);
const abbreviateNumberLong = abbreviateNumberFactory(LONG_SYMBOLS);

// const tests = [
//   1e5,
//   -9e7,
//   [1009999.999, 2],
//   [245345235.34513, 1, 1],
//   [-72773144123, 3],
// ];

//   tests.forEach((test) => {
//     const testValue = Array.isArray(test) ? test : [test];
//     Object.entries(functions).forEach(([key, func]) => {
//       console.log(`${key}(${testValue.join(', ')}) = ${func(...testValue)}`);
//     });
//   });

export { abbreviateNumberSI, abbreviateNumberShort, abbreviateNumberLong };
