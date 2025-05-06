interface Option<T> {
  value: T;
  label: string;
}

export type SingleSelectPropsT<T> = {
  options: Option<T>[];
  selected: Option<T>;
  onChange: (value: Option<T>) => void;
  label?: string;
};
