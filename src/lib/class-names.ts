type ClassName =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassNameList
  | ClassNameMap;

type ClassNameList = ClassName[];

type ClassNameMap = { [className: string]: boolean | undefined | null };

export function classNames(...classes: ClassName[]): string {
  return classes
    .filter((cn) => cn || cn === 0)
    .map((cn) => {
      if (Array.isArray(cn)) {
        return classNames(...cn);
      }

      if (typeof cn === 'object' && cn !== null) {
        return Object.keys(cn)
          .filter((key) => cn[key])
          .join(' ');
      }

      return cn;
    })
    .join(' ');
}

export default classNames;
