import {Grid} from "@mui/material";
import Instance from "@/components/instance"

const cards = [
    {title: 'Card 1', content: 'Content for Card 1'},
    {title: 'Card 2', content: 'Content for Card 2'},
    {title: 'Card 3', content: 'Content for Card 3'},
    {title: 'Card 4', content: 'Content for Card 4'},
    {title: 'Card 5', content: 'Content for Card 5'},
];

export default function InstanceList() {
    return (
        <Grid container spacing={5}>
            {cards.map((card) => (
                <Grid item xs={12} sm={12} md={12} lg={6} key={card.title}>
                    <Instance></Instance>
                </Grid>
            ))}
        </Grid>
    );
};
