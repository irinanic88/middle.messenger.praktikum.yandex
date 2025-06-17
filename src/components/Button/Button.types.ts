export interface ButtonPropsTypes {
  name: string;
  events?: {
    [key: string]: (event: Event) => void;
  };
  attributes?: Record<string, string>[];
  classList?: string[];
}
