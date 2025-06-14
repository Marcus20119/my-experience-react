import { Table } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { TableProps } from 'antd/lib';
import type { AnyObject } from 'antd/lib/_util/type';
import { useEffect, useMemo, useState } from 'react';

import type { EditableColumnType } from '../model';
import Cell from './Cell';
import Row from './Row';

interface Props<T extends AnyObject> extends Omit<TableProps<T>, 'columns'> {
  columns: EditableColumnType<T>[];
  onResize?: (columns: EditableColumnType<T>[]) => void;
  resizable?: boolean;
}

function EditableTable<T extends AnyObject>({
  columns: initialColumns = [],
  onResize,
  resizable,
  ...props
}: Props<T>) {
  const [columns, setColumns] =
    useState<EditableColumnType<T>[]>(initialColumns);

  // Need to use this logic to prevent stale dataSource in handleSave (closure issue)
  useEffect(() => {
    setColumns(prev =>
      initialColumns.map((column, index) => {
        const newCol = prev[index];

        return {
          ...column,
          children: column.children?.map((child, childIndex) => {
            const newChild = newCol.children?.[childIndex];

            return {
              ...child,
              fixed: newChild?.fixed,
              width: newChild?.width ?? 0,
            };
          }),
          fixed: newCol.fixed,
          width: newCol.width,
        };
      }),
    );
  }, [initialColumns]);

  const resizedColumns: EditableColumnType<T>[] = useMemo(
    () =>
      columns.map((column, index) => {
        const onResizeStart = () => {
          setColumns(prevColumns => {
            const nextColumns = [...prevColumns];
            nextColumns[index] = {
              ...nextColumns[index],
              children: nextColumns[index].children?.map(child => ({
                ...child,
                fixed: child.fixed || 'left',
              })),
              fixed: nextColumns[index].fixed || 'left',
            };
            return nextColumns;
          });
        };

        const onResizeEnd = (width: number) => {
          setColumns(prevColumns => {
            const defaultFixed = initialColumns[index].fixed;
            const prevWidth = prevColumns[index].width;

            const nextColumns = [...prevColumns];
            nextColumns[index] = {
              ...nextColumns[index],
              children: nextColumns[index].children?.map(child => ({
                ...child,
                fixed: defaultFixed,
                width: width * (child.width / prevWidth),
              })),
              fixed: defaultFixed,
              width,
            };

            onResize?.(nextColumns);
            return nextColumns;
          });
        };

        const onResetSize = () => {
          setColumns(prevColumns => {
            const defaultFixed = initialColumns[index].fixed;
            const defaultWidth = initialColumns[index].width;
            const prevWidth = prevColumns[index].width;

            const nextColumns = [...prevColumns];
            nextColumns[index] = {
              ...nextColumns[index],
              children: nextColumns[index].children?.map(child => ({
                ...child,
                width: defaultWidth * (child.width / prevWidth),
              })),
              fixed: defaultFixed,
              width: defaultWidth,
            };

            onResize?.(nextColumns);
            return nextColumns;
          });
        };

        return {
          ...column,
          onHeaderCell: column => {
            const defaultWidth = initialColumns[index].width;

            return {
              minWidth: column.editable ? defaultWidth : undefined,
              onResetSize,
              onResizeEnd,
              onResizeStart,
              width: column.width,
            };
          },
        };
      }),
    [columns, initialColumns, onResize],
  );

  return (
    <Table<T>
      bordered
      className="editable-table"
      columns={resizedColumns as ColumnType<T>[]}
      components={{
        body: {
          cell: Cell.Editable<T>,
          row: Row.Editable,
        },
        header: resizable
          ? {
              cell: Cell.Header,
            }
          : undefined,
      }}
      rowClassName={() => 'editable-row'}
      {...props}
    />
  );
}

export default EditableTable;
