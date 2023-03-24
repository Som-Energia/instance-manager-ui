import {Box, Button, Container, Divider, Typography} from "@mui/material";
import InstanceWidgetList from "@/components/InstanceWidgetList";

export default function InstanceDashboard() {
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
                <Button variant="contained" color="primary">New instance</Button>
                <Divider/>
            </Box>
            <Container sx={{my: 5}}>
                <InstanceWidgetList></InstanceWidgetList>
            </Container>
        </Container>
    )
}