import {Grid} from "@mui/material";
import InstanceWidget from "@/components/InstanceWidget"
import {useEffect, useState} from 'react';
import {InstanceApiRepository} from "@/infrastructure/InstanceApiRepository";
import {Instance} from "@/domain/Instance";

export default function InstanceWidgetList() {

    const [instances, setInstances] = useState<Instance[]>([])

    useEffect(() => {
        const instanceRepository = new InstanceApiRepository();
        instanceRepository.search()
            .then((data) => {
                setInstances(data)
            });

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
