export abstract class PercentDataAdapter {

  constructor(private title: string) { }

  abstract adapt(values: number[]): number[];
}
