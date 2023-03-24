import {Button, Card, CardActions, CardContent, Stack, Typography} from "@mui/material";
import CommitIcon from '@mui/icons-material/Commit';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import LinkIcon from '@mui/icons-material/Link';
import {Instance} from "@/domain/Instance";

export default function InstanceWidget({instance}: { instance: Instance }) {
    return (
        <>
            <Card sx={{p: 2}}>
                <CardContent>
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
                        <LinkIcon/>
                        <Typography sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {instance.connectionUrl}
                        </Typography>
                    </Stack>
                    <Typography sx={{fontSize: 14, mt: 2}} color="text.secondary" gutterBottom>
                        Created at 13-01-2023
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button color="primary" disabled>LOGS</Button>
                    <Button color="error" disabled>DELETE</Button>
                </CardActions>
            </Card>
        </>
    );
}