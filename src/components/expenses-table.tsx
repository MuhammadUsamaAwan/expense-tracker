import { Table } from '@mantine/core';

export function ExpensesTable() {
  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody></tbody>
    </Table>
  );
}
