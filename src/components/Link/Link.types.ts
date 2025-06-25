export type LinkPropsType = {
  href: string;
  active: boolean;
  title: string;
  events: {
    onClick: () => void,
  }
}
