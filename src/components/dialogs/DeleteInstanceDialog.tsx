import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useEffect} from "react";
import {InstanceApiRepository} from "@/infrastructure/InstanceApiRepository";
import {Instance} from "@/domain/Instance";

export default function DeleteInstanceDialog
({
     instance,
     deleteDialogOpen,
     setDeleteDialogOpen,
     instanceDelete,
     setInstanceDelete
 }: {
    instance: Instance,
    deleteDialogOpen: boolean,
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>CANCEL</Button>
                <Button onClick={handleDelete}>DELETE</Button>
            </DialogActions>
        </Dialog>
    )
}
