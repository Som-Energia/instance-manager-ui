import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";
import {Instance} from "@/domain/Instance";
import {deleteInstance} from "@/services/api";
import {mutate} from "swr";
import React, {useState} from "react";

export default function DeleteInstanceDialog
({
     instance,
     deleteDialogOpen,
     setDeleteDialogOpen,
     setInstanceDelete,
     setSuccessDeleteInstanceMessage
 }: {
    instance: Instance,
    deleteDialogOpen: boolean,
    setDeleteDialogOpen: Function,
    setInstanceDelete: Function,
    setSuccessDeleteInstanceMessage: Function,
}) {

    const [errorMessage, setErrorMessage] = useState('');

    const handleClose = () => {
        setDeleteDialogOpen(false);
        setErrorMessage('');
    };

    const handleDelete = async () => {
        try {
            await deleteInstance(instance.name);
            setInstanceDelete(true);
            setSuccessDeleteInstanceMessage(true);
            mutate('instances');
            handleClose();
        } catch (error: any) {
            setErrorMessage((error as Error).message)
        }
    };

    return (
        <Dialog
            open={deleteDialogOpen}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">
                {"Delete instance " + instance.name + "?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Deleting an instance will result in the permanent removal of all associated data, and this action
                    cannot be undone.
                </DialogContentText>
                <Typography color="error" sx={{mt: 1.5}} hidden={!errorMessage}>
                    {errorMessage}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>CANCEL</Button>
                <Button onClick={handleDelete}>DELETE</Button>
            </DialogActions>
        </Dialog>
    )
}
