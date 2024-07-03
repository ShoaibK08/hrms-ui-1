import React, { useState, useEffect, useMemo } from "react";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import LoadingPage from "./LoadingPage";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useParams } from 'react-router-dom';
function ViewSalaryDetails() {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const [salaryInfo, setSalaryInfo] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  useEffect(() => {
    axios
      .get(`/apigateway/payroll/salarydetails/getSalaryDetailsById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSalaryInfo(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "Error fetching details");
        setLoading(false);
      });
  }, [token]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "employeePf",
        header: "Employee Pf",
        meta: { filterable: true }
      },
      {
        accessorKey: "employerPf",
        header: "Employer Pf",
        meta: { filterable: true }
      },
      { accessorKey: "employerEsic", header: "Employer Esic", meta: { filterable: true } },
      { accessorKey: "employeeEsic", header: "Employee Esic",   meta: { filterable: true } },
      {
        accessorKey: "grossDeduction",
        header: "Gross Deduction",
        meta: { filterable: true },
      },
      { accessorKey: "adhoc", header: "ADHOC",  meta: { filterable: true } },
  
    ],
    []
  );

  const table = useReactTable({
    data: salaryInfo,
    columns,
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });


  return (
    <div className="mt-3">
      {loading ? <LoadingPage /> : ""}
      <div style={{ margin: "25px 100px", width: "820px", height: "750px" }}>
        <h1 className="Heading1">Salary Information</h1>
        <div>
        <Table striped bordered hover className="custom-table">
            <thead className="table-danger table-striped">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={
                              header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : ""
                            }
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getIsSorted() === "asc"
                              ? " 🔼"
                              : header.column.getIsSorted() === "desc"
                              ? " 🔽"
                              : null}
                          </div>
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} />
                            </div>
                          ) : null}
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="body">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            </Table>
        </div>
      </div>
    </div>
  );
}


function Filter({ column }) {
    const { filterVariant } = column.columnDef.meta || {};
  
    const columnFilterValue = column.getFilterValue();
  
    const sortedUniqueValues = useMemo(
      () =>
        filterVariant === "select"
          ? Array.from(column.getFacetedUniqueValues().keys()).sort()
          : [],
      [column.getFacetedUniqueValues(), filterVariant]
    );
  
    return filterVariant === "select" ? (
      <select
        onChange={(e) => column.setFilterValue(e.target.value)}
        value={columnFilterValue?.toString() || ""}
      >
        <option value="">All</option>
        {sortedUniqueValues.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    ) : filterVariant === "range" ? (
      <div>
        <div className="flex space-x-2">
          <DebouncedInput
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
            value={(columnFilterValue ? columnFilterValue[0] : "") ?? ""}
            onChange={(e) =>
              column.setFilterValue((old) => [e.target?.value, old?.[1]])
          }
          
            placeholder={`Min ${
              column.getFacetedMinMaxValues()?.[0] !== undefined
                ? `(${column.getFacetedMinMaxValues()?.[0]})`
                : ""
            }`}
            className="w-24 border shadow rounded"
          />
          <DebouncedInput
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
            value={(columnFilterValue ? columnFilterValue[1] : "") ?? ""}
            onChange={(e) =>
              column.setFilterValue((old) => [e.target?.value, old?.[1]])
          }
          
            placeholder={`Max ${
              column.getFacetedMinMaxValues()?.[1] !== undefined
                ? `(${column.getFacetedMinMaxValues()?.[1]})`
                : ""
            }`}
            className="w-24 border shadow rounded"
          />
        </div>
        <div className="h-1" />
      </div>
    ) : null; 
  }
  
  function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
  }) {
    const [value, setValue] = useState(initialValue);
  
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value);
      }, debounce);
  
      return () => clearTimeout(timeout);
    }, [value]);
  
    return (
      <input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  }
export default ViewSalaryDetails;
