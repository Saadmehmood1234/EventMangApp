"use client";
import Link from "next/link";
import { useState, useMemo, useCallback } from "react";
import { LuSearch } from "react-icons/lu";
import { useTable, usePagination, Column } from "react-table";

interface Request {
  [key: string]: any; 
}

interface DisplayTableProps {
  columns: Column<Request>[];
  requests: Request[];
  searchableFields: string[];
}

const DisplayTable = ({
  columns,
  requests,
  searchableFields,
}: DisplayTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      return searchableFields.some((field) =>
        request[field]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [requests, searchableFields, searchQuery]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, 
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
    setPageSize,
  }: any = useTable(
    { columns, data: filteredRequests },
    usePagination
  );

  // Setting default page size to 5
  useMemo(() => {
    setPageSize(5);
  }, [setPageSize]);

  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <>
      <div className="flex justify-between items-center py-4 px-4 lg:px-8 bg-slate-50">
        <h1 className="text-3xl text-purple-600 font-bold">Users</h1>
        <Link href={"employee/new"}>
          <button className="bg-purple-300 hover:bg-purple-400 rounded-full px-4 py-2">
            <span className="block lg:hidden text-xl font-bold">+</span>
            <span className="hidden lg:block">+ Add User</span>
          </button>
        </Link>
      </div>
      <div className="flex px-4 max-sm:px-2 lg:px-8 mt-6 items-center relative">
        <input
          type="text"
          placeholder="Search employees..."
          className="lg:w-1/3 w-full border rounded-lg px-8 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <LuSearch className="absolute lg:left-10 left-6 max-sm:left-4 w-5 h-5 text-gray-500" />
      </div>

      <div className="flex flex-col py-4 max-sm:px-2 px-4 lg:px-8 h-[calc(100vh-140px)]">
        <div className="overflow-x-auto rounded-md h-full">
          <table {...getTableProps()} className="w-full text-left border-2 rounded-md">
            <thead>
              {headerGroups.map((hg:any, i:any) => (
                <tr {...hg.getHeaderGroupProps()} key={i}>
                  {hg.headers.map((header:any, i:any) => (
                    <th
                      className="px-4 py-4 border-b-2 cursor-pointer bg-[#F9FAFB]"
                      {...header.getHeaderProps()}
                      key={i}
                    >
                      {header.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row:any, i:any) => {
                prepareRow(row);
                return (
                  <tr className="hover:bg-[#e7e7e7]" {...row.getRowProps()} key={i}>
                    {row.cells.map((cell:any, ci:any) => (
                      <td
                        className="px-4 py-4 border-b-2 cursor-pointer text-[#505050]"
                        {...cell.getCellProps()}
                        key={ci}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex lg:justify-center justify-between lg:gap-6 items-center mt-2">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="bg-purple-300 hover:bg-purple-400 text-white py-1 px-4 rounded"
          >
            {"<<"}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="bg-purple-300 hover:bg-purple-400 text-white py-1 px-4 rounded"
          >
            {"<"}
          </button>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="bg-purple-300 hover:bg-purple-400 text-white py-1 px-4 rounded"
          >
            {">"}
          </button>
          <button
            onClick={() => gotoPage(pageOptions.length - 1)}
            disabled={!canNextPage}
            className="bg-purple-300 hover:bg-purple-400 text-white py-1 px-4 rounded"
          >
            {">>"}
          </button>
        </div>
      </div>
    </>
  );
};

export default DisplayTable;
