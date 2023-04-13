import {
    Alert,
    Autocomplete,
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
import useSWR, {mutate} from "swr";
import {createInstanceFromPullRequest, readAllowedRepositories} from "@/services/api";

export default function CreatePullRequestInstanceDialog
({
     createPullRequestInstanceDialogOpen,
     setCreatePullRequestInstanceDialogOpen,
 }: {
    createPullRequestInstanceDialogOpen: boolean,
    setCreatePullRequestInstanceDialogOpen: Function,
}) {

    const [repository, setRepository] = useState('');
    const [pullRequest, setPullRequest] = useState(0);

    const [errorMessage, setErrorMessage] = useState('');
    const [successCreateInstanceMessage, setSuccessCreateInstanceMessage] = useState(false);

    const {data, error, isLoading} = useSWR<string[]>('allowed-repositories', readAllowedRepositories);

    const handleClose = () => {
        setCreatePullRequestInstanceDialogOpen(false);
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
                open={createPullRequestInstanceDialogOpen}
                onClose={handleClose}
            >
                <DialogTitle>
                    Start new instance from pull request
                </DialogTitle>
                <DialogContent>
                    <Autocomplete
                        freeSolo
                        id="repository"
                        options={data || []}
                        onChange={(event, newValue) => setRepository(newValue || '')}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                margin="dense"
                                fullWidth
                                label="Repository"/>
                        }
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
