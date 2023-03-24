import {Grid} from "@mui/material";
import InstanceWidget from "@/components/InstanceWidget"
import {useEffect, useState} from 'react';
import {InstanceApiRepository} from "@/infrastructure/InstanceApiRepository";
import {Instance} from "@/domain/Instance";

export default function InstanceWidgetList() {

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
