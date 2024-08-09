import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
  PaginationState,
  ColumnFiltersState,
  CellContext, // Import CellContext type for type checking
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[]; // Strongly type the columns prop
}

export default function DataTable<T>({ data, columns }: DataTableProps<T>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    columns,
    data,
    state: {
      columnFilters,
      sorting,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4 border border-gray-600 rounded-lg overflow-hidden px-4">
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      className="cursor-pointer select-none "
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.column.columnDef.header as React.ReactNode}
                      {header.column.getIsSorted()
                        ? header.column.getIsSorted() === "desc"
                          ? " 🔽"
                          : " 🔼"
                        : null}
                    </div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {typeof cell.column.columnDef.cell === "function"
                    ? cell.column.columnDef.cell({
                        getValue: cell.getValue,
                        row: cell.row,
                        column: cell.column,
                        table,
                        cell, // Add the cell context here
                        renderValue: cell.renderValue, // Add renderValue as part of the context
                      } as CellContext<T, unknown>)
                    : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}
