import {Box, Button, Container, Divider, Typography} from "@mui/material";
import InstanceWidgetList from "@/components/InstanceWidgetList";
import CreateInstanceDialog from "@/components/dialogs/CreateInstanceDialog";
import {useState} from "react";

export default function InstanceDashboard() {
    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    const handleCreateDialogOpen = () => {
        setCreateDialogOpen(true);
    };

    const styles = {
        root: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '8px',
            borderBottom: '1px solid #ccc',
        },
        text: {
            flexGrow: 1,
        },
        button: {
            marginLeft: 'auto',
        },
    };

    return (
        <Container sx={{my: 5}}>
            <Box style={styles.root}>
                <Typography variant="h3" style={styles.text}>Current instances</Typography>
                <Button variant="contained" onClick={handleCreateDialogOpen} color="primary">New instance</Button>
                <Divider/>
            </Box>
            <Container sx={{my: 5}}>
                <InstanceWidgetList/>
            </Container>
            <CreateInstanceDialog
                createDialogOpen={createDialogOpen}
                setCreateDialogOpen={setCreateDialogOpen}
            />
        </Container>
    )
}