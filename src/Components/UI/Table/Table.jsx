import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Pagination from "./Pagination";
import paginate from "./paginate";
import { Typography } from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "white",
    color: "#174A84",
    fontSize: 13,
    fontWeight: 600,
    border: "none",
  },
  body: {
    fontSize: 13,
    color: "black",
    border: "none",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#EAFBFF",
    },
    border: "none",
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function StyledTable({
  headers, //arrayy of headers of table.array of string
  data, //array of objects
  mapping, //object key->value in object value->value that need to be displayed in place of key
  defaultPageSize = 25,
  onRowClick, //in case rowClickable is true and we want onclick on row .should be higher orrder function
  Stickycolumn = [],
}) {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultPageSize);
  let tableData = paginate(data, currentPage, rowsPerPage);
  const isSticky = (item) => Stickycolumn.indexOf(item) !== -1;
  const getHeader = () =>
    headers.map((item, index) => (
      <StyledTableCell
        key={item}
        style={isSticky(item) ? { position: "sticky", left: 0 } : {}}
      >
        {mapping[item] || item}
      </StyledTableCell>
    ));
  const getRow = (row, ind) => {
    let temp = [];
    headers.forEach((h, index) => {
      temp.push(
        <StyledTableCell
          key={index}
          align="left"
          style={
            isSticky(h)
              ? {
                  position: "sticky",
                  left: 0,
                  backgroundColor: (ind + 1) % 2 == 0 ? "white" : "#EAFBFF",
                }
              : {}
          }
        >
          {h === "Sno"
            ? currentPage * rowsPerPage + ind + 1
            : (row[h] == null || row[h] == "" || row[h] == undefined) &&
              row[h] != 0
            ? "N/A"
            : row[h]}
        </StyledTableCell>
      );
    });
    return temp;
  };
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };
  if (tableData.length === 0)
    return (
      <Typography
        variant="caption"
        style={{ fontSize: "16px", paddingLeft: "1rem" }}
      >
        No data found
      </Typography>
    );
  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>{getHeader()}</TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <StyledTableRow
                style={onRowClick && { cursor: "pointer" }}
                key={index}
                onClick={onRowClick && onRowClick(row)}
              >
                {getRow(row, index)}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={data.length}
        page={currentPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[3, 5, 10, 15, 20]}
      />
    </>
  );
}
