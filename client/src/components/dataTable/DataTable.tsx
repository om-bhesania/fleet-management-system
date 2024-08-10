import React, { useState, useEffect } from "react";
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
  CellContext,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Button,
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import CustomModal from "../modal/CustomModal";

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  modalData?: React.ReactNode;
  loading?: boolean;
  error?: string;
  buttonLabel: any;
  onEdit: (row: T) => void;
  onDelete: (id: string) => void;
}

export default function DataTable<T>({
  data,
  columns,
  modalData,
  loading,
  error,
  buttonLabel,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10, // Initial page size
  });
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const table = useReactTable({
    columns,
    data,
    state: {
      columnFilters,
      sorting,
      pagination,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: "includesString",
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-md">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <p className="text-gray-600">No data available</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md overflow-y-auto w-full max-w-[84vw]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search"
            InputProps={{
              startAdornment: <SearchIcon className="mr-2" />,
            }}
            className="bg-gray-50"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
        {modalData && (
          <CustomModal buttonLabel={buttonLabel}>{modalData}</CustomModal>
        )}
      </div>

      <TableContainer component={Paper} className="">
        <Table className="min-w-full whitespace-nowrap">
          <TableHead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    className="font-bold text-sm relative group"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className="cursor-pointer select-none flex items-center space-x-1"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <span>
                          {header.column.columnDef.header as React.ReactNode}
                        </span>
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === "desc" ? (
                            <ArrowDropDownIcon />
                          ) : (
                            <ArrowDropUpIcon />
                          )
                        ) : (
                          <ArrowDropDownIcon className="opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                        )}
                      </div>
                    )}
                  </TableCell>
                ))}
                <TableCell className="font-bold text-sm">Actions</TableCell>
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-gray-50">
                {data.length === 0 ? (
                  <>No data available</>
                ) : (
                  <>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-sm">
                        {typeof cell.column.columnDef.cell === "function"
                          ? cell.column.columnDef.cell({
                              getValue: cell.getValue,
                              row: cell.row,
                              column: cell.column,
                              table,
                              cell,
                              renderValue: cell.renderValue,
                            } as CellContext<T, unknown>)
                          : cell.getValue()}
                      </TableCell>
                    ))}
                  </>
                )}

                <TableCell>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() =>
                      onDelete(
                        (row.original as { vehicleid: string }).vehicleid
                      )
                    }
                    className="ml-2"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <KeyboardDoubleArrowLeftIcon />
          </Button>
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon />
          </Button>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">Rows</InputLabel>
            <Select
              labelId="rows-per-page-select-label"
              id="rows-per-page-select"
              className="p-0"
              value={table.getState().pagination.pageSize.toString()}
              label="Rows"
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 50, 100].map((pageSize) => (
                <MenuItem key={pageSize} value={pageSize}>
                  {pageSize}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <KeyboardArrowRightIcon />
          </Button>
          <Button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <KeyboardDoubleArrowRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
