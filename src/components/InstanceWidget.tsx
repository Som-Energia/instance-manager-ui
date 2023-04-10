import {Button, Card, CardActions, CardContent, Chip, Stack, Typography} from "@mui/material";
import CommitIcon from '@mui/icons-material/Commit';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import LinkIcon from '@mui/icons-material/Link';
import {Instance} from "@/domain/Instance";
import React, {useState} from "react";
import DeleteInstanceDialog from "@/components/dialogs/DeleteInstanceDialog";
import Link from "next/link";
import {CallMerge} from "@mui/icons-material";

export default function InstanceWidget(
    {
        instance,
        setSuccessDeleteInstanceMessage,
        setSuccessCopyMessage,
    }: {
        instance: Instance,
        setSuccessDeleteInstanceMessage: Function,
        setSuccessCopyMessage: Function,
    }) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [instanceDeleted, setInstanceDeleted] = useState(false);

    const handleDeleteDialogOpen = () => {
        setDeleteDialogOpen(true);
    };

    const handleCopyIp = () => {
        if (process.env.nodeIp) {
            navigator.clipboard.writeText(process.env.nodeIp.toString());
            setSuccessCopyMessage(true);
        }
    }

    const handleCopyNode = () => {
        setSuccessCopyMessage(true);
        navigator.clipboard.writeText(instance.port);
    }

    const TerminalButton = () => {
        if (instanceDeleted || !instance.is_ready) {
            return <Button color="primary" disabled>TERMINAL</Button>

        } else {
            return (
                <Link href={"/terminal/" + instance.name} style={{textDecoration: 'none'}}>
                    <Button color="primary">TERMINAL</Button>
                </Link>)
        }
    };

    const formattedDate = () => {
        const year = instance.createdAt.getFullYear();
        const month = String(instance.createdAt.getMonth() + 1).padStart(2, "0");
        const day = String(instance.createdAt.getDate()).padStart(2, "0");
        const hour = String(instance.createdAt.getHours()).padStart(2, "0");
        const minute = String(instance.createdAt.getMinutes()).padStart(2, "0");

        return `${day}/${month}/${year} ${hour}:${minute}`;
    };

    return (
        <>
            <Card sx={{p: 2}}>
                <CardContent>
                    {instanceDeleted &&
                        <Chip label="Deleting" color="error" sx={{mb: 1.5}}/>
                    }
                    {(!instanceDeleted && instance.is_ready) &&
                        <Chip label="Ready" color="primary" sx={{mb: 1.5}}/>
                    }
                    {(!instanceDeleted && !instance.is_ready) &&
                        <Chip label="Starting" color="warning" sx={{mb: 1.5}}/>
                    }
                    <Typography variant="h5">
                        instance-{instance.name}
                    </Typography>
                    <Typography sx={{fontSize: 14, mt: 2}} color="text.secondary" gutterBottom>
                        Created at {formattedDate()}
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
                            {instance.branch ? instance.branch : '-'}
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
                            {instance.pullRequest ? instance.pullRequest : '-'}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1} sx={{mt: 1.5, overflow: 'hidden'}}>
                        <LinkIcon/>
                        <Typography sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {process.env.domain}:{instance.port}
                        </Typography>
                    </Stack>
                </CardContent>
                <CardActions>
                    <Button color="primary" onClick={handleCopyIp}>COPY IP</Button>
                    <Button color="primary" onClick={handleCopyNode}>COPY PORT</Button>
                    <Link href={"/logs/" + instance.name} style={{textDecoration: 'none'}}>
                        <Button color="primary">LOGS</Button>
                    </Link>
                    {TerminalButton()}
                    <Button color="error" onClick={handleDeleteDialogOpen}
                            disabled={instanceDeleted}>DELETE</Button>
                </CardActions>
            </Card>
            <DeleteInstanceDialog
                instance={instance}
                deleteDialogOpen={deleteDialogOpen}
                setDeleteDialogOpen={setDeleteDialogOpen}
                setInstanceDelete={setInstanceDeleted}
                setSuccessDeleteInstanceMessage={setSuccessDeleteInstanceMessage}
            />
        </>
    );
}
