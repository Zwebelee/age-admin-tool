import {Card, CardContent, Typography} from "@mui/material";

interface SampleCardProps {
    title: string | number;

}

export const SampleCard = ({title}:SampleCardProps) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2">
                    This is a sample card.
                </Typography>
            </CardContent>
        </Card>
    );
};