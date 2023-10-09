import { AgGridReact } from "ag-grid-react";
import React from "react";
import { useTableData } from "./UsersTable.hooks";
import Loader from "../Loader/Loader";
import { Tooltip } from "../Tooltip/Tooltip";

const UsersTable = () => {
  const { columns, rows, isLoading } = useTableData();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className='flex justify-end mb-4'>
            <Tooltip
              text={"You can click on a column header to sort the rows"}
            />
          </div>
          <div
            className={`ag-theme-alpine mx-auto mt-4`}
            style={{ height: 500, width: "80%", maxWidth: 1200 }}
          >
            <AgGridReact
              rowData={rows}
              columnDefs={columns as any}
              scrollbarWidth={10}
              rowDragManaged={true}
              animateRows={true}
              className='pb-12'
            ></AgGridReact>
          </div>
        </>
      )}
    </>
  );
};

export default UsersTable;
