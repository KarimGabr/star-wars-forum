const ranges = [
  { divider: 1e6, suffix: "M" },
  { divider: 1e3, suffix: "k" },
];

function numberRangeFormatter(n) {
  for (var i = 0; i < ranges.length; i++) {
    if (n >= ranges[i].divider) {
      const num = (n / ranges[i].divider).toString();

      const _int = num.split(".")[0];
      const _precision = num.split(".")[1];
      const _precisionDigits = _precision ? _precision[0] : null;

      return `${_int}${_precisionDigits ? `.${_precisionDigits}` : ""}${
        ranges[i].suffix
      }`;
    }
  }

  return n.toString();
}

export default numberRangeFormatter;
