import * as React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const ROW_HEIGHT = "50px";
const TABLE_HEIGHT = "550px";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#dfe2e7",
    color: theme.palette.common.black,
    width: "100px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: "0px 16px",
    height: ROW_HEIGHT,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1rem",
    width: "100px",
    padding: "0px 16px",
    height: ROW_HEIGHT,
  },
}));

export default function TableWithPage({ tableData, tableHeads }) {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper elevation={1} sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ height: TABLE_HEIGHT }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {tableHeads.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow key={row.link} hover role="checkbox" tabIndex={-1}>
                    {tableHeads.map((column) => {
                      const value = row[column.id];
                      if (column.id === "link") {
                        if (row.state === "完成") {
                          return (
                            <StyledTableCell
                              key={column.id}
                              align={column.align}
                              onClick={() => {
                                navigate(value);
                              }}
                              sx={{ cursor: "pointer" }}
                            >
                              {column.buttonIcon}
                            </StyledTableCell>
                          );
                        }
                        return (
                          <StyledTableCell
                            key={column.id}
                            align={column.align}
                          ></StyledTableCell>
                        );
                      } else {
                        return (
                          <StyledTableCell key={column.id} align={column.align}>
                            {column.format ? column.format(value) : value}
                          </StyledTableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ backgroundColor: "#dfe2e7" }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
TableWithPage.propTypes = {
  tableData: PropTypes.array.isRequired,
  tableHeads: PropTypes.array.isRequired,
};
