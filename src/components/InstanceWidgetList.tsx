import {Grid} from "@mui/material";
import InstanceWidget from "@/components/InstanceWidget"
import useSWR from 'swr';
import {Instance} from "@/domain/Instance";
import {readInstances} from "@/services/api";
import React, {useState} from "react";

export default function InstanceWidgetList() {
    const {data, error} = useSWR<Instance[]>('instances', readInstances, {});

    const instanceRepository = new InstanceApiRepository();
    const [instances, setInstances] = useState<Instance[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await instanceRepository.search();
            setInstances(data);
        };

        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Grid container spacing={5}>
            {instances.map((instance) => (
                <Grid item xs={12} sm={12} md={12} lg={6} key={instance.name}>
                    <InstanceWidget instance={instance}></InstanceWidget>
                </Grid>
            ))}
        </Grid>
    );
};
