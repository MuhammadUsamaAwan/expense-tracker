import { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';

import type { CategoryExpense } from '~/types';

type CategoryExpenseTableProps = {
  categoryExpenses: CategoryExpense[];
};

export function CategoryExpenseTable({ categoryExpenses }: CategoryExpenseTableProps) {
  const columns = useMemo<MRT_ColumnDef<CategoryExpense>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Category',
      },
      {
        accessorKey: 'value',
        header: 'Amount',
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: categoryExpenses ?? [],
    enablePagination: false,
    enableBottomToolbar: false,
    initialState: {
      density: 'xs',
    },
  });

  return <MantineReactTable table={table} />;
}
