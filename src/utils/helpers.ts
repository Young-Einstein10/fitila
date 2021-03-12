export const numberWithCommas = num => {
  if (!num || num === undefined) return;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
