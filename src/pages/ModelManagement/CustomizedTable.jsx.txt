import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import api from "../../utils/api";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#dfe2e7",
    color: theme.palette.common.black,
    fontSize: "0.8em",
    "& .MuiSvgIcon-fontSizeMedium": {
      width: "0.8em",
      height: "0.8em",
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "0.8em",
    padding: "6px 34px 6px 16px",
    "& .MuiSvgIcon-fontSizeMedium": {
      width: "0.8em",
      height: "0.8em",
    },
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

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "模型名稱",
    align: "center",
  },
  {
    id: "predict",
    numeric: false,
    disablePadding: false,
    label: "預測欄位",
    align: "center",
  },
  {
    id: "r2",
    numeric: true,
    disablePadding: false,
    label: "相關係數(R2)",
    align: "center",
  },
  {
    id: "rmse",
    numeric: true,
    disablePadding: false,
    label: "均方根誤差(RMSE)",
    align: "center",
  },
  {
    id: "operation",
    numeric: false,
    disablePadding: false,
    label: "操作",
    align: "center",
  },
  {
    id: "isFixVersion",
    numeric: true,
    disablePadding: false,
    label: "定版",
    align: "center",
  },
  {
    id: "log",
    numeric: true,
    disablePadding: false,
    label: "Log",
    align: "left",
  },
];
function EmptyTable({ rowsPerPage }) {
  return (
    <TableRow
      style={{
        height: 47 * rowsPerPage,
      }}
    >
      <StyledTableCell align="center" colSpan={20}>
        No Model data available
      </StyledTableCell>
    </TableRow>
  );
}
EmptyTable.propTypes = {
  rowsPerPage: PropTypes.number.isRequired,
};
function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            disabled={numSelected !== 2}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.align}
            // padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({
  selected,
  handleSelectAllClick,
  handleClick,
}) {
  const [rows, setRows] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleFixClick = (e, name) => {
    const newRows = rows.map((row) => {
      if (row.name === name) {
        row.isFixVersion = !row.isFixVersion;
        row.log = row.isFixVersion
          ? `${new Date().toLocaleDateString()}定版`
          : "";
      }
      return row;
    });
    setRows(newRows);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows]
  );
  async function fetchTableData() {
    try {
      const result = await api.getModelManageTableData();
      setRows(result);
    } catch (error) {
      alert(error.message);
    }
  }
  React.useEffect(() => {
    fetchTableData();
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={() => handleSelectAllClick()}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.length === 0 ? (
                <EmptyTable rowsPerPage={rowsPerPage} />
              ) : null}
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <StyledTableCell
                      padding="checkbox"
                      onClick={(event) => handleClick(event, row.name)}
                      align="center"
                    >
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="center"
                    >
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.predict}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.r2}</StyledTableCell>
                    <StyledTableCell align="center">{row.rmse}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.operation}
                    </StyledTableCell>
                    <StyledTableCell
                      onClick={(e) => {
                        handleFixClick(e, row.name);
                      }}
                      align="center"
                    >
                      {row.isFixVersion ? (
                        <IconButton color="default" size="small">
                          <LockOutlinedIcon />
                        </IconButton>
                      ) : (
                        <IconButton color="success" size="small">
                          <LockOpenOutlinedIcon />
                        </IconButton>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.log}</StyledTableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 42 * emptyRows,
                  }}
                >
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            width: "100%",
            // height: 33,
            "& .MuiTablePagination-toolbar": {
              minHeight: 33,
              padding: 0,
              fontSize: "12px",
            },
            "& .MuiTablePagination-selectLabel": {
              margin: 0,
              fontSize: "12px",
            },
            "& .MuiTablePagination-displayedRows": {
              margin: 0,
              fontSize: "12px",
            },
            "& .MuiIconButton-sizeMedium": {
              paddingY: 0,
              fontSize: "12px",
            },
          }}
        />
      </Paper>
    </Box>
  );
}
EnhancedTable.propTypes = {
  selected: PropTypes.array.isRequired,
  handleSelectAllClick: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};
