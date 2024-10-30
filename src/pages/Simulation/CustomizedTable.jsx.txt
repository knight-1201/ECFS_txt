import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#dfe2e7",
    color: theme.palette.common.black,
    width: "100px",
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: "6px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "0.8rem",
    width: "100px",
    padding: "6px",
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

function EmptyTable() {
  return (
    <TableBody>
      <TableRow>
        <StyledTableCell align="center" colSpan={100}>
          No data available
        </StyledTableCell>
      </TableRow>
    </TableBody>
  );
}
export default function CustomizedTable({ tableData, tableHeads }) {
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
                <StyledTableCell key={column} align="center">
                  {column}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          {tableData.length === 0 ? (
            <EmptyTable />
          ) : (
            <TableBody>
              {tableData.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.type}>
                    {tableHeads.map((column) => {
                      const value = row[column];

                      return (
                        <StyledTableCell
                          key={`${column}_${row["YM"]}`}
                          align={column.align}
                          sx={{
                            background: value === "Not Ready" ? "#ef5350" : "",
                          }}
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
  tableData: PropTypes.array.isRequired,
  tableHeads: PropTypes.array.isRequired,
};
