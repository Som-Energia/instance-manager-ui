import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useEffect} from "react";
import {InstanceApiRepository} from "@/infrastructure/InstanceApiRepository";
import {Instance} from "@/domain/Instance";

export default function DeleteInstanceDialog
({
     instance,
     openDeleteDialog,
     setDeleteDialogOpen,
     instanceDelete,
     setInstanceDelete
 }: {
    instance: Instance,
    openDeleteDialog: boolean,
    setDeleteDialogOpen: Function,
    instanceDelete: boolean, setInstanceDelete: Function
}) {

    useEffect(() => {
        if (instanceDelete) {
            new InstanceApiRepository().delete(instance);
        }
    }, [instanceDelete]);

    const handleClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleDelete = () => {
        setDeleteDialogOpen(false);
        setInstanceDelete(true);
    };

    return (
        <Dialog
            open={openDeleteDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Delete instance " + instance.name + "?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Deleting an instance will result in the permanent removal of all associated data, and this action
                    cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDelete}>DELETE</Button>
                <Button onClick={handleClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}
