
export function formatNumber(n: number, precision: number = 4) {
  const s = ["", "K", "M", "B", "T", "P", "E", "Z", "Y", "R", "Q"];

  // Find the order of magnitude
  const orderOfMagnitude = Math.floor(Math.log10(n));
  // Determine the index in the abbreviation array
  const index = Math.floor(orderOfMagnitude / 3);
  // Calculate the abbreviated value
  const abbreviatedValue = parseFloat(
    (n / Math.pow(1000, index)).toPrecision(precision)
  );
  // Append the abbreviation
  if (isNaN(abbreviatedValue)) {
    return { value: 0, unit: "" };
  }
  return {
    value: abbreviatedValue,
    unit: s[index],
    combined: `${abbreviatedValue}${s[index] ? s[index] : ""}`,
  };
}
