import type { RouterNavigator } from '@/shared/hooks';

export interface SidebarItem {
  children?: Omit<SidebarItem, 'children' | 'icon'>[];
  icon: React.ReactNode;
  key: string;
  label: string;
  match: string;
  route: RouterNavigator;
}

export enum MainSidebarKey {
  Animation = 'animation',
  Component = 'component',
  Feature = 'feature',
  Game = 'game',
  Technology = 'technology',
}

export enum SubSidebarKey {
  Backend = 'backend',
  Calendar = 'calendar',
  CanvaEditor = 'canva-editor',
  ChartPlayground = 'chart-playground',
  Cloud = 'cloud',
  DragAndDrop = 'drag-and-drop',
  Excel = 'excel',
  Field = 'field',
  FileReader = 'file-reader',
  Form = 'form',
  FormBuilder = 'form-builder',
  Frontend = 'frontend',
  Language = 'language',
  Table = 'table',
}
