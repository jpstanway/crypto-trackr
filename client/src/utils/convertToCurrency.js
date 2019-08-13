export default function(num, fiat = false) {
  if (fiat) {
    let convert = Number(num);

    convert = convert.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    return `$${convert}`;
  }

  return Number(num).toLocaleString();
}
