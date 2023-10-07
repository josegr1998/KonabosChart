import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import { useTableData } from "./UsersTable.hooks";
import Loader from "../Loader/Loader";

const UsersTable = () => {
  const { columns, rows, isLoading } = useTableData();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <AgGridReact rowData={rows} columnDefs={columns as any}></AgGridReact>
      )}
    </>
  );
};

export default UsersTable;
