"use client"
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { Button, Switch, Box } from '@mui/material';
import AddList from './AddList';
import UpdateList from './UpdateList';
import ViewDialog from './ViewDialog';
import { toDoLists } from '../../../dummy/toDoLists';

const columns = [
    { id: 'id', label: 'id', minWidth: 170 },
    { id: 'name', label: 'name', minWidth: 100 },
    { id: 'completed', label: 'completed', minWidth: 100 },
    { id: 'view', label: 'view', minWidth: 100 },
    { id: 'edit', label: 'edit', minWidth: 100 },
    { id: 'delete', label: 'delete', minWidth: 100 }
];



function createData(id, name, completed) {
    return { id, name, completed };
}

const initialData = toDoLists.map( (todo) => createData(todo.id, todo.name, todo.completed));

export default function List() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2);

    /* Linn Lat Htun */
    const [rows, setRows] = React.useState(initialData);
    const [open, setOpen] = React.useState(false);
    const [updateOpen, setUpdateOpen] = React.useState(false); // Added state for update dialog
    const [viewOpen, setViewOpen] = React.useState(false);  // State for the View dialog
    const [selectedItem, setSelectedItem] = React.useState(null);  // State for the selected item

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdateOpen = (id) => {
        const itemToUpdate = rows.find((row) => row.id === id);
        setSelectedItem(itemToUpdate); // Set the selected item for editing
        setUpdateOpen(true); // Open the update dialog
    };

    const handleUpdateClose = () => {
        setUpdateOpen(false);
        setSelectedItem(null); // Clear the selected item
    };

    const handleToggleCompleted = (id) => {
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, completed: !row.completed } : row
            )
        );
    };

    const handleDelete = (id) => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleViewOpen = (id) => {
        const itemToView = rows.find((row) => row.id === id);
        setSelectedItem(itemToView);  // Set the selected item
        setViewOpen(true);  // Open the view dialog
    };

    const handleViewClose = () => {
        setViewOpen(false);
        setSelectedItem(null);  // Clear the selected item
    };

    const updateItem = (updatedItem) => {
        setRows((prevRows) =>
            prevRows.map((row) => (row.id === updatedItem.id ? updatedItem : row))
        );
    };

    const addTodo = (newTodo) => {
        newTodo.id = rows.length + 1; // Assign a new ID based on the current list length
        setRows([...rows, newTodo]); // Add the new item to the list
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Box display="flex" justifyContent="flex-end" sx={{ padding: 5 }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleOpen}
                >
                    Add Item
                </Button>
            </Box>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={row.completed}
                                            onChange={() => handleToggleCompleted(row.id)}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'completed switch' }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton aria-label="view" color="success" onClick={() => handleViewOpen(row.id)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton aria-label="edit" color="primary" onClick={() => handleUpdateOpen(row.id)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton aria-label="delete" color="error" onClick={() => handleDelete(row.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <AddList open={open} handleClose={handleClose} addTodo={addTodo} />

            <UpdateList
                open={updateOpen}  // Control visibility of update dialog
                handleClose={handleUpdateClose}  // Close dialog function
                selectedItem={selectedItem}  // The item to update
                updateItem={updateItem} // Pass the updateItem function

            />

            {/* View Dialog */}
            {selectedItem && (
                <ViewDialog
                    open={viewOpen}
                    handleClose={handleViewClose}
                    selectedItem={selectedItem}  // Pass the selected item
                />
            )}
        </Paper>
    );
}
