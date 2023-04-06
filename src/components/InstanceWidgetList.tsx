import {Alert, Grid, Snackbar} from "@mui/material";
import InstanceWidget from "@/components/InstanceWidget"
import useSWR from 'swr';
import {Instance} from "@/domain/Instance";
import {readInstances} from "@/services/api";
import React, {useState} from "react";

export default function InstanceWidgetList() {
    const {data, error} = useSWR<Instance[]>('instances', readInstances, {refreshInterval: 5000});

    const [successDeleteInstanceMessage, setSuccessDeleteInstanceMessage] = useState(false);
    const [successCopyMessage, setSuccessCopyMessage] = useState(false);

    return (
        <>
            <Grid container spacing={5}>
                {data?.map((instance) => (
                    <Grid item xs={12} sm={12} md={12} lg={6} key={instance.name}>
                        <InstanceWidget
                            instance={instance}
                            setSuccessDeleteInstanceMessage={setSuccessDeleteInstanceMessage}
                            setSuccessCopyMessage={setSuccessCopyMessage}
                        />
                    </Grid>
                ))}
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
