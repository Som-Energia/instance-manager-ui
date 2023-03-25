import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import {InstanceCreatePullRequest} from "@/domain/InstanceCreatePullRequest";
import React, {useState} from "react";
import {InstanceApiRepository} from "@/infrastructure/InstanceApiRepository";

export default function CreateInstanceDialog
({
     createDialogOpen,
     setCreateDialogOpen,
 }: {
    createDialogOpen: boolean,
    setCreateDialogOpen: Function,
}) {

    const [repository, setRepository] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [pullRequest, setPullRequest] = useState(0);

    const handleClose = () => {
        setCreateDialogOpen(false);
        setErrorMessage(false);
    };

    const handleSubmit = () => {
        const instance: InstanceCreatePullRequest = {
            repository: repository,
            pullRequest: pullRequest,
        };
        new InstanceApiRepository()
            .createPullRequest(instance)
            .then(response => {
                setErrorMessage(!response)
                if (response) {
                    handleClose();
                    setSuccessMessage(true);
                }
            })
    }

    return (
        <>
            <Dialog
                open={createDialogOpen}
                onClose={handleClose}
            >
                <DialogTitle>
                    Start new instance
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="repository"
                        label="Repository"
                        type="text"
                        fullWidth
                        onChange={(event) => setRepository(event.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="pullRequest"
                        label="Pull request"
                        type="number"
                        fullWidth
                        onChange={(event) => setPullRequest(Number(event.target.value))}
                    />
                    <Typography color="error" sx={{mt: 1.5}} hidden={!errorMessage}>
                        Oops! Something went wrong. Please check the input and try again.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>CANCEL</Button>
                    <Button onClick={handleSubmit}>START</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={successMessage}
                autoHideDuration={5000}
                onClose={() => {
                    setSuccessMessage(false)
                }}
            >
                <Alert severity="success">New instance is starting</Alert>
            </Snackbar>

        </>
    );
}
