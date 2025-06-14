export interface ButtonActionEntity {
  active?: boolean;
  disabled?: boolean;
  icon: React.ReactNode;
  id?: string;
  label?: string;
  onClick?: () => void;
  popover?: React.ReactNode;
  type: 'button';
}

export interface CustomActionEntity {
  element: React.ReactNode;
  label?: string;
  type: 'custom';
}

export type CompactActionEntity = ButtonActionEntity | CustomActionEntity;
