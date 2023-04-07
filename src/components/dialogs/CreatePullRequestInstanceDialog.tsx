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
import React, {useState} from "react";
import {mutate} from "swr";
import {createInstanceFromPullRequest} from "@/services/api";

export default function CreateInstanceDialog
({
     createDialogOpen,
     setCreateDialogOpen,
 }: {
    createDialogOpen: boolean,
    setCreateDialogOpen: Function,
}) {

    const [repository, setRepository] = useState('');
    const [pullRequest, setPullRequest] = useState(0);

    const [errorMessage, setErrorMessage] = useState('');
    const [successCreateInstanceMessage, setSuccessCreateInstanceMessage] = useState(false);

    const handleClose = () => {
        setCreateDialogOpen(false);
        setErrorMessage('');
    };

    const handleCreate = async () => {
        try {
            await createInstanceFromPullRequest(repository, pullRequest);
            setSuccessCreateInstanceMessage(true);
            handleClose();
            mutate('instances');
        } catch (error: any) {
            setErrorMessage((error as Error).message)
        }
    };

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
                        {errorMessage}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>CANCEL</Button>
                    <Button onClick={handleCreate}>START</Button>
                </DialogActions>
            </Dialog>

            {/* Success instance create message */}
            <Snackbar
                open={successCreateInstanceMessage}
                autoHideDuration={3000}
                onClose={() => {
                    setSuccessCreateInstanceMessage(false)
                }}
            >
                <Alert variant="filled" severity="success">New instance is starting</Alert>
            </Snackbar>
        </>
    );
}
