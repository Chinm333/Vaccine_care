import React from "react";
import TablePagination from "@material-ui/core/TablePagination";
import { Paper } from "@material-ui/core";
export default function TablePaginationDemo({
  count,
  rowsPerPage,
  handleChangeRowsPerPage,
  page,
  handleChangePage,
  rowsPerPageOptions = [5, 10, 25, 50, 100]
}) {
  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
    />
  );
}
