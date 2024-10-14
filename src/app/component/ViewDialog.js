import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField } from '@mui/material';

function ViewDialog({ open, handleClose, selectedItem }) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>View Item</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Item ID"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={selectedItem?.id || ''}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    margin="dense"
                    label="Item Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={selectedItem?.name || ''}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    margin="dense"
                    label="Completed"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={selectedItem?.completed ? 'Yes' : 'No'}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ViewDialog;
