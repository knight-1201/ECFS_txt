import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#dfe2e7",
    color: theme.palette.common.black,
    width: "100px",
    textAlign: "Right",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1.25rem",
    width: "100px",
    textAlign: "Right",
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EmptyTable() {
  return (
    <TableBody>
      <TableRow>
        <StyledTableCell align="center" colSpan={7}>
          No data available
        </StyledTableCell>
      </TableRow>
    </TableBody>
  );
}
export default function CustomizedTable({ tableData, tableHeads }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("user_ID");
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const visibleRows = React.useMemo(() => {
    if (tableData.length > 0) {
      return [...tableData].sort(getComparator(order, orderBy));
    }
  }, [order, orderBy, tableData]);

  return (
    <Paper
      sx={{
        width: "100%",
        flexGrow: 1,
      }}
    >
      <TableContainer sx={{ maxHeight: "calc(100vh - 216px)" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {tableHeads.map((column) => (
                <StyledTableCell
                  key={column}
                  align="center"
                  style={{ Width: "20px" }}
                  sortDirection={orderBy === column ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column}
                    direction={orderBy === column ? order : "asc"}
                    onClick={createSortHandler(column)}
                  >
                    {column}
                    {orderBy === column ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          {tableData.length === 0 ? (
            <EmptyTable />
          ) : (
            <TableBody>
              {visibleRows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.YM}>
                    {tableHeads.map((column) => {
                      const value = row[column];

                      return (
                        <StyledTableCell
                          key={`${column}_${row["YM"]}`}
                          align={column.align}
                          sx={{ background: value === null ? "#ef5350" : "" }}
                        >
                          {typeof value === "number" ? value.toFixed(1) : value}
                        </StyledTableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Paper>
  );
}
CustomizedTable.propTypes = {
  tableData: PropTypes.array,
  tableHeads: PropTypes.array.isRequired,
};
