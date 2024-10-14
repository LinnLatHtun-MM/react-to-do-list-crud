"use client";
import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Box
} from '@mui/material';

function UpdateList({ open, handleClose, selectedItem, updateItem }) {
    const [newItem, setNewItem] = React.useState({
        id: selectedItem?.id || '', // Use optional chaining
        name: selectedItem?.name || '',
        completed: selectedItem?.completed ? 'Yes' : 'No' // Map boolean to 'Yes' or 'No'
    });

    // Handle form changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewItem((prevItem) => ({
            ...prevItem,
            [name]: value
        }));
    };

    // Handle save
    const handleSave = () => {
        // Convert the completed status back to a boolean
        const updatedItem = {
            ...newItem,
            completed: newItem.completed === 'Yes' // Convert back to boolean
        };
        updateItem(updatedItem);
        handleClose();
    };

    React.useEffect(() => {
        if (selectedItem) {
            setNewItem({
                id: selectedItem.id,
                name: selectedItem.name,
                completed: selectedItem.completed ? 'Yes' : 'No'
            });
        }
    }, [selectedItem]);

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Update Item</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        margin="dense" // Added dense margin for compactness
                        label="ID"
                        name="id"
                        value={newItem.id}
                        onChange={handleInputChange}
                        fullWidth
                        variant="standard" // Standard variant for a clean look
                        InputProps={{
                            readOnly: true, // Make the ID read-only
                        }}
                    />
                    <TextField
                        margin="dense" // Added dense margin for compactness
                        label="Name"
                        name="name"
                        value={newItem.name}
                        onChange={handleInputChange}
                        fullWidth
                        variant="standard" // Standard variant for a clean look
                    />
                    <FormControl fullWidth variant="standard">
                        <InputLabel>Completed</InputLabel>
                        <Select
                            name="completed"
                            value={newItem.completed}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UpdateList;
