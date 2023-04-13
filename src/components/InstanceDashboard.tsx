import {Box, Button, Container, Divider, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import InstanceWidgetList from "@/components/InstanceWidgetList";
import CreatePullRequestInstanceDialog from "@/components/dialogs/CreatePullRequestInstanceDialog";
import {MouseEvent, useState} from "react";
import CreateBranchInstanceDialog from "@/components/dialogs/CreateBranchInstanceDialog";
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

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

    const [createBranchInstanceDialogOpen, setCreateBranchInstanceDialogOpen] = useState(false);
    const [createPullRequestInstanceDialogOpen, setCreatePullRequestInstanceDialogOpen] = useState(false);

    const handlePullRequestInstanceCreateDialogOpen = () => {
        setCreatePullRequestInstanceDialogOpen(true);
    };

    const handleBranchInstanceCreateDialogOpen = () => {
        setCreateBranchInstanceDialogOpen(true);
    };

    // Show instance dropdown menu
    const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);
    // Show filter inputs
    const [showFilters, setShowFilters] = useState(false);

    const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event: MouseEvent<HTMLLIElement>, option: string) => {
        switch (option) {
            case 'branch':
                handleBranchInstanceCreateDialogOpen();
                break;
            case 'pull_request':
                handlePullRequestInstanceCreateDialogOpen();
                break;
            default:
                break;
        }
        setAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Container sx={{my: 5}}>
            <Box style={styles.root}>
                <Typography variant="h4" style={styles.text}>Current instances</Typography>
                <IconButton aria-label="delete" onClick={() => setShowFilters(!showFilters)} sx={{mr: 2}}>
                    {showFilters ? <FilterListOffIcon/> : <FilterListIcon/>}
                </IconButton>
                <Button
                    variant="contained"
                    onClick={handleButtonClick}
                    color="primary"
                >
                    New instance
                </Button>
                <Menu
                    id="new-instance-menu"
                    anchorEl={anchorEl as HTMLElement}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={(event) => handleMenuItemClick(event, 'branch')}>
                        From branch
                    </MenuItem>
                    <MenuItem onClick={(event) => handleMenuItemClick(event, 'pull_request')}>
                        From pull request
                    </MenuItem>
                </Menu>
                <Divider/>
            </Box>
            <Container sx={{my: 5}}>
                <InstanceWidgetList showFilters={showFilters}/>
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