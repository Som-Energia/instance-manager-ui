import {Box, Button, Container, Divider, Typography} from "@mui/material";
import InstanceWidgetList from "@/components/InstanceWidgetList";
import CreatePullRequestInstanceDialog from "@/components/dialogs/CreatePullRequestInstanceDialog";
import {useState} from "react";
import CreateBranchInstanceDialog from "@/components/dialogs/CreateBranchInstanceDialog";

export default function InstanceDashboard() {
    const [createBranchInstanceDialogOpen, setCreateBranchInstanceDialogOpen] = useState(false);
    const [createPullRequestInstanceDialogOpen, setCreatePullRequestInstanceDialogOpen] = useState(false);

    const handlePullRequestInstanceCreateDialogOpen = () => {
        setCreatePullRequestInstanceDialogOpen(true);
    };

    const handleBranchInstanceCreateDialogOpen = () => {
        setCreateBranchInstanceDialogOpen(true);
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
                <Typography variant="h4" style={styles.text}>Current instances</Typography>
                <Button
                    variant="contained"
                    onClick={handleBranchInstanceCreateDialogOpen}
                    color="primary"
                    sx={{mr: 1}}
                >
                    New from branch
                </Button>
                <Button variant="contained" onClick={handlePullRequestInstanceCreateDialogOpen} color="primary">
                    New from pull request
                </Button>
                <Divider/>
            </Box>
            <Container sx={{my: 5}}>
                <InstanceWidgetList/>
            </Container>
            <CreatePullRequestInstanceDialog
                createPullRequestInstanceDialogOpen={createPullRequestInstanceDialogOpen}
                setCreatePullRequestInstanceDialogOpen={setCreatePullRequestInstanceDialogOpen}
            />
            <CreateBranchInstanceDialog
                createBranchInstanceDialogOpen={createBranchInstanceDialogOpen}
                setCreateBranchInstanceDialogOpen={setCreateBranchInstanceDialogOpen}
            />
        </Container>
    )
}