export type ModalPropsT = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  primaryAction?: () => void;
  secondaryAction?: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
  pending?: boolean;
};
