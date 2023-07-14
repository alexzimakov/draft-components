export abstract class AbstractFilter {
  abstract type: string;
  abstract field: string;
  abstract label: string;
  abstract isEmpty(): boolean;
}
