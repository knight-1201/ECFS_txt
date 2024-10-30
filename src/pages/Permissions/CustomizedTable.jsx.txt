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
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";

const columns = [
  { id: "user_ID", label: "User_ID", minWidth: 100 },
  { id: "user_Name", label: "User_Name", minWidth: 100 },
  { id: "department", label: "Department", minWidth: 100 },
  { id: "role", label: "Role", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "notify", label: "Notify", minWidth: 100 },
];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#dfe2e7",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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
function TableHeadCheckBox(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;
  return (
    <StyledTableCell padding="checkbox">
      <Checkbox
        color="primary"
        indeterminate={numSelected > 0 && numSelected < rowCount}
        checked={rowCount > 0 && numSelected === rowCount}
        onChange={onSelectAllClick}
      />
    </StyledTableCell>
  );
}

function TableCheckBox({ isItemSelected }) {
  return (
    <StyledTableCell padding="checkbox">
      <Checkbox color="primary" checked={isItemSelected} />
    </StyledTableCell>
  );
}

function EmptyTable() {
  return (
    <TableRow>
      <StyledTableCell align="center" colSpan={7}>
        No Permission data available
      </StyledTableCell>
    </TableRow>
  );
}
export default function CustomizedTable({
  isAdmin,
  permissions,
  selected,
  handleSelectAllClick,
  handleClick,
}) {
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
  const visibleRows = React.useMemo(
    () => [...permissions].sort(getComparator(order, orderBy)),
    [order, orderBy, permissions]
  );

  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: "100vw",
        overflow: "hidden",
        flexGrow: 1,
      }}
    >
      <TableContainer sx={{ maxHeight: "calc(100vh - 160px)" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {isAdmin ? (
                <TableHeadCheckBox
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                  rowCount={permissions.length}
                />
              ) : null}
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={createSortHandler(column.id)}
                  >
                    {column.label}
                    {orderBy === column.id ? (
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
          <TableBody>
            {permissions.length === 0 ? <EmptyTable /> : null}
            {visibleRows.map((row) => {
              const isItemSelected = selected.includes(row.user_ID);
              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.user_ID)}
                  role="checkbox"
                  tabIndex={-1}
                  key={row.user_ID}
                >
                  {isAdmin ? (
                    <TableCheckBox isItemSelected={isItemSelected} />
                  ) : null}
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === "notify") {
                      return (
                        <StyledTableCell
                          key={row.user_ID + column.id}
                          align={column.align}
                        >
                          <Chip
                            label={value ? "True" : "False"}
                            color={value ? "success" : "default"}
                            size="small"
                            sx={{ width: "50px" }}
                          />
                        </StyledTableCell>
                      );
                    }
                    return (
                      <StyledTableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
TableHeadCheckBox.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};
TableCheckBox.propTypes = {
  isItemSelected: PropTypes.bool.isRequired,
};
CustomizedTable.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  permissions: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  handleSelectAllClick: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};
