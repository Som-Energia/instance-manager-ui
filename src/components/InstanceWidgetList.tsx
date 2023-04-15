import {
    Alert,
    Box,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    Grid,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import InstanceWidget from "@/components/InstanceWidget"
import useSWR from 'swr';
import {Instance} from "@/domain/Instance";
import {readInstances} from "@/services/api";
import React, {useEffect, useState} from "react";

export default function InstanceWidgetList({showFilters}: { showFilters: boolean }) {
    const [nameFilter, setNameFilter] = useState('');
    const [repositoryFilter, setRepositoryFilter] = useState('');
    const [branchFilter, setBranchFilter] = useState('');
    const [pullRequestFilter, setPullRequestFilter] = useState('');
    const [isReadyFilter, setIsReadyFilter] = useState(false);

    const [filteredData, setFilteredData] = useState<Instance[]>([]);
    const {data, error, isLoading} = useSWR<Instance[]>('instances', readInstances, {refreshInterval: 5000});

    useEffect(() => {
        const filteredItems = data?.filter((instance) =>
            instance.name?.toLowerCase().includes(nameFilter)
            && instance.repository?.toLowerCase().includes(repositoryFilter)
            && (pullRequestFilter == '' || instance.pullRequest?.toString().toLowerCase().includes(pullRequestFilter))
            && !instance.branch || instance.branch.toLowerCase().includes(branchFilter)
            && (!isReadyFilter || instance.is_ready)
        );
        setFilteredData(filteredItems || []);
    }, [data, nameFilter, repositoryFilter, branchFilter, pullRequestFilter, isReadyFilter]);

    const [successDeleteInstanceMessage, setSuccessDeleteInstanceMessage] = useState(false);
    const [successCopyMessage, setSuccessCopyMessage] = useState(false);

    return (
        <>
            {showFilters &&
                <Box sx={{mb: 3}}>
                    <TextField
                        margin="dense"
                        sx={{mr: 3}}
                        id="nameFilter"
                        label="Name filter"
                        onChange={(event) => setNameFilter(event.target.value)}
                        defaultValue={nameFilter}
                    />
                    <TextField
                        margin="dense"
                        sx={{mr: 3}}
                        id="repositoryFilter"
                        label="Repository filter"
                        onChange={(event) => setRepositoryFilter(event.target.value)}
                        defaultValue={repositoryFilter}
                    />
                    <TextField
                        margin="dense"
                        sx={{mr: 3}}
                        id="branchFilter"
                        label="Branch filter"
                        onChange={(event) => setBranchFilter(event.target.value)}
                        defaultValue={branchFilter}
                    />
                    <TextField
                        margin="dense"
                        sx={{mr: 3}}
                        id="pullRequestFilter"
                        type="number"
                        label="Pull request filter"
                        onChange={(event) => setPullRequestFilter(event.target.value)}
                        defaultValue={pullRequestFilter}
                    />
                    <FormControlLabel
                        sx={{my: 2}}
                        control={
                            <Checkbox
                                color="primary"
                                onChange={() => setIsReadyFilter(!isReadyFilter)}
                            />
                        }
                        label="Only ready instances"
                    />
                </Box>
            }
            {(!data || isLoading) &&
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                    <CircularProgress/>
                </div>
            }
            <Grid container spacing={5}>
                {filteredData?.map((instance) => (
                    <Grid item xs={12} sm={12} md={12} lg={6} key={instance.name}>
                        <InstanceWidget
                            instance={instance}
                            setSuccessDeleteInstanceMessage={setSuccessDeleteInstanceMessage}
                            setSuccessCopyMessage={setSuccessCopyMessage}
                        />
                    </Grid>
                ))}
                {filteredData.length == 0 &&
                    <Typography sx={{p: 5}}>No instances found.</Typography>
                }
            </Grid>

            {/* Error message fetching instances from API */}
            {error &&
                <Snackbar open={error}>
                    <Alert variant="filled" severity="error" sx={{width: '100%'}}>
                        Cannot get instances: {error.message}
                    </Alert>
                </Snackbar>
            }

            {/* Success instance deletion message */}
            <Snackbar
                open={successDeleteInstanceMessage}
                autoHideDuration={3000}
                onClose={() => {
                    setSuccessDeleteInstanceMessage(false)
                }}
            >
                <Alert variant="filled" severity="success">Successfully deleted instance</Alert>
            </Snackbar>

            {/* Success copy text to clipboard message */}
            <Snackbar
                open={successCopyMessage}
                autoHideDuration={1000}
                onClose={() => {
                    setSuccessCopyMessage(false)
                }}
            >
                <Alert variant="filled" severity="success">Successfully copied to your clipboard</Alert>
            </Snackbar>
        </>
    );
};
