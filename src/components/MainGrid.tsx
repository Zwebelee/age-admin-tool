import {Grid2, Box} from "@mui/material";
import {SampleCard} from "./SampleCard.tsx";
import {tempSampleData} from "../models/tempgeneralsampledata.ts";




const sampleCardData = [
    "Card 1", tempSampleData.users.total, "Card3", "Card4", "Card5", "Card6", "Card7", "Card8"
]

export const MainGrid = () => {
    return (
        <Box sx={{ width: '100%', maxWidth: {sm:'100%', md:'2000px'} }}>
        <Grid2
            container
            spacing={2}
            columns={12}
            sx={{ mb: (theme) => theme.spacing(2) }}
        >
            {sampleCardData.map((title, index) => (
                <Grid2 key={index} size={{xs: 12, sm: 6, lg: 3}}>
                    <SampleCard title={title}/>
                </Grid2>
            ))}
        </Grid2>
        </Box>

    )
}