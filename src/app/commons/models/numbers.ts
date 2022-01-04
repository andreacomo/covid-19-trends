export class Numbers {

    public static beautifyZeroesAsText(value: number): string {
      const v = Math.abs(value);
      if (v === 0) {
        return '0';
      } else if (v < 1999) {
        return value.toString();
      } else if (v < 1000000) {
        const thousand = value / 1000;
        return thousand + ' Mila';
      } else {
        return (value / 1000000) + ' Mln';
      }
    }

    public static beautifyWithSeparators(value: string): string {
      return parseInt(value, 10).toLocaleString();
    }

    public static appendPercent(value): string {
        return value + '%';
    }

    public static appendPercentWithPrecisionFromString(value: string, precision = 2): string {
        return parseFloat(value).toFixed(precision) + '%';
    }

    public static appendPercentWithSignAndPrecision(value: number, precision = 2): string {
      return (value > 0 ? `+${value.toFixed(precision)}` : value.toFixed(precision)) + '%';
    }
}
