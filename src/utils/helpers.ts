export const numberWithCommas = num => {
  if (!num || num === undefined) return;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const capitalize = str => {
  if (typeof str === "string") {
    return str.replace(/\b\w/g, c => c.toUpperCase());
  } else {
    return "";
  }
};
