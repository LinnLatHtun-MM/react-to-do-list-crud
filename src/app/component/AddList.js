import React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Checkbox,
    FormControlLabel
} from '@mui/material';

function AddList({open, handleClose, addTodo}) {

    const [newItem, setNewItem] = React.useState({id: '', name: '', completed: false});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setNewItem({...newItem, [name]: value});
    };

    const handleCheckboxChange = (event) => {
        setNewItem({...newItem, completed: event.target.checked});
    };

    const handleAdd = () => {
        if (newItem.name.trim() === '') return; // Ensure item has a name before adding
        const newTodo = {...newItem};
        addTodo(newTodo); // Call the function passed from the parent component to add the item
        handleClose(); // Close the dialog after adding
        setNewItem({id: '', name: '', completed: false}); // Reset the form
    };

    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Item Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newItem.name}
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={newItem.completed}
                                onChange={handleCheckboxChange}
                                name="completed"
                            />
                        }
                        label="Completed"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default AddList;
