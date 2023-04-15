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
import {createInstanceFromCommit, readAllowedRepositories} from "@/services/api";

export default function CreateBranchInstanceDialog
({
     createCommitInstanceDialogOpen,
     setCreateCommitInstanceDialogOpen,
 }: {
    createCommitInstanceDialogOpen: boolean,
    setCreateCommitInstanceDialogOpen: Function,
}) {

    const [repository, setRepository] = useState('');
    const [commit, setCommit] = useState('');
    const [module, setModule] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [successCreateInstanceMessage, setSuccessCreateInstanceMessage] = useState(false);

    const {data, error, isLoading} = useSWR<string[]>(process.env.api, readAllowedRepositories);

    const handleClose = () => {
        setCreateCommitInstanceDialogOpen(false);
        setErrorMessage('');
    };

    const handleCreate = async () => {
        try {
            await createInstanceFromCommit(repository, commit, module);
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
                open={createCommitInstanceDialogOpen}
                onClose={handleClose}
            >
                <DialogTitle>
                    Start new instance from commit
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
                        id="commit"
                        label="Commit"
                        type="text"
                        fullWidth
                        onChange={(event) => setCommit(event.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="module"
                        label="Module to install"
                        type="text"
                        fullWidth
                        onChange={(event) => setModule(event.target.value)}
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
