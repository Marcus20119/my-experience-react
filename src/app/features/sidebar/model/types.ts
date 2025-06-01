export interface SidebarItem {
  children?: Omit<SidebarItem, 'children' | 'icon'>[];
  icon: React.ReactNode;
  key: string;
  label: string;
  match: string;
  path: RouterPath;
}

export enum MainSidebarKey {
  Animation = 'animation',
  Component = 'component',
  Feature = 'feature',
  Game = 'game',
  Technology = 'technology',
}

export enum SubSidebarKey {
  Calendar = 'calendar',
  CanvaEditor = 'canva-editor',
  ChartPlayground = 'chart-playground',
  Configuration = 'configuration',
  DragAndDrop = 'drag-and-drop',
  Excel = 'excel',
  Field = 'field',
  FileReader = 'file-reader',
  Form = 'form',
  FormBuilder = 'form-builder',
  Language = 'language',
  OtherTech = 'other-tech',
  Table = 'table',
  UILibrary = 'ui-library',
}
