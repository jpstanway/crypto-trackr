export default function (percent) {
  let numbered = Number(percent);
  numbered = numbered.toPrecision(1);
  return numbered + "%";
}
