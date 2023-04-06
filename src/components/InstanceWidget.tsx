import {Alert, Button, Card, CardActions, CardContent, Chip, Snackbar, Stack, Typography} from "@mui/material";
import CommitIcon from '@mui/icons-material/Commit';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import LinkIcon from '@mui/icons-material/Link';
import {Instance} from "@/domain/Instance";
import React, {useState} from "react";
import DeleteInstanceDialog from "@/components/dialogs/DeleteInstanceDialog";
import Link from "next/link";
import {CallMerge} from "@mui/icons-material";

export default function InstanceWidget({instance}: { instance: Instance }) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [instanceDelete, setInstanceDelete] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const handleDeleteDialogOpen = () => {
        setDeleteDialogOpen(true);
    };

    const handleCopyConnection = () => {
        setSuccessMessage(true);
        navigator.clipboard.writeText(instance.port);
    }

    const TerminalButton = () => {
        if (instanceDelete || !instance.is_ready) {
            return <Button color="primary" disabled>TERMINAL</Button>

        } else {
            return (
                <Link href={"/terminal/" + instance.name} style={{textDecoration: 'none'}}>
                    <Button color="primary">TERMINAL</Button>
                </Link>)
        }
    };

    return (
        <>
            <Card sx={{p: 2}}>
                <CardContent>
                    {instanceDelete &&
                        <Chip label="Deleting" color="error" sx={{mb: 1.5}}/>
                    }
                    {!instanceDelete && instance.is_ready &&
                        <Chip label="Ready" color="primary" sx={{mb: 1.5}}/>
                    }
                    {!instanceDelete && !instance.is_ready &&
                        <Chip label="Starting" color="warning" sx={{mb: 1.5}}/>
                    }
                    <Typography variant="h5">
                        instance-{instance.name}
                    </Typography>
                    <Stack direction="row" alignItems="center" gap={1} sx={{mt: 3}}>
                        <BusinessCenterIcon/>
                        <Typography>
                            {instance.repository}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1} sx={{mt: 1.5, overflow: 'hidden'}}>
                        <AltRouteIcon/>
                        <Typography sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {instance.branch}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1} sx={{mt: 1.5, overflow: 'hidden'}}>
                        <CommitIcon/>
                        <Typography sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {instance.commit}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1} sx={{mt: 1.5, overflow: 'hidden'}}>
                        <CallMerge/>
                        <Typography sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {instance.pullRequest}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1} sx={{mt: 1.5, overflow: 'hidden'}}>
                        <LinkIcon/>
                        <Typography sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {process.env.nodeIp}:{instance.port}
                        </Typography>
                    </Stack>
                    <Typography sx={{fontSize: 14, mt: 2}} color="text.secondary" gutterBottom hidden>
                        Created at 13-01-2023
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button color="primary" onClick={handleCopyConnection}>COPY</Button>
                    <Link href={"/logs/" + instance.name} style={{textDecoration: 'none'}}>
                        <Button color="primary">LOGS</Button>
                    </Link>
                    {TerminalButton()}
                    <Button color="error" onClick={handleDeleteDialogOpen} disabled={instanceDelete}>DELETE</Button>
                </CardActions>
            </Card>
            <DeleteInstanceDialog
                instance={instance}
                deleteDialogOpen={deleteDialogOpen}
                setDeleteDialogOpen={setDeleteDialogOpen}
                instanceDelete={instanceDelete}
                setInstanceDelete={setInstanceDelete}
            />
            <Snackbar
                open={successMessage}
                autoHideDuration={5000}
                onClose={() => {
                    setSuccessMessage(false)
                }}
            >
                <Alert severity="success">The instance connection URL has been copied to your clipboard</Alert>
            </Snackbar>
        </>
    );
}