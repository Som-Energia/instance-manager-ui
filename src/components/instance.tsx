import {Button, Card, CardActions, CardContent, Stack, Typography} from "@mui/material";
import CommitIcon from '@mui/icons-material/Commit';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import BookIcon from '@mui/icons-material/Book';

export default function Instance() {
    return (
        <Card sx={{p: 2}}>
            <CardContent>
                <Typography variant="h5">
                    instance-glwiiyxkrqbs
                </Typography>
                <Stack direction="row" alignItems="center" gap={1} sx={{mt: 2}}>
                    <BusinessCenterIcon/>
                    <Typography>
                        Som-Energia
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1} sx={{mt: 1.5}}>
                    <BookIcon/>
                    <Typography>
                        openerp_som_addons
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1} sx={{mt: 1.5, overflow: 'hidden'}}>
                    <AltRouteIcon/>
                    <Typography sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        MOD_partner_info_component_remove_partner_name
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1} sx={{mt: 1.5, overflow: 'hidden'}}>
                    <CommitIcon/>
                    <Typography sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        435a99d8479b31887c87a9d99465eed38cbc13ac
                    </Typography>
                </Stack>
                <Typography sx={{fontSize: 14, mt: 2}} color="text.secondary" gutterBottom>
                    Started at 13-01-2023
                </Typography>
            </CardContent>
            <CardActions>
                <Button color="primary">LOGS</Button>
                <Button color="error">STOP</Button>
            </CardActions>
        </Card>
    );
}