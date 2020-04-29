// checks if a number is negative
// returns appropriate class if true
export const checkNegative = (number, pct) => {
  if (number[0] === "-" && pct) {
    return "tabbed-container__price-change-pct--negative";
  } else if (number[0] === "-") {
    return "tabbed-container__price-change--negative";
  }

  return "";
};

// places the negative sign infront of the dollar sign
export const reformatNegative = (number) => {
  if (number[1] === "-") {
    let integers = number.substring(2, number.length);
    return "-$" + integers;
  }

  return number;
};
