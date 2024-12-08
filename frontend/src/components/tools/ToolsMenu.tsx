import {observer} from "mobx-react-lite";
import {useTranslation} from "react-i18next";
import Grid from '@mui/material/Grid2';
import {ToolDetailScreen} from "../../screens/ToolDetailScreen.tsx";
import React, {useState} from "react";
import {Button} from "@mui/material";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import {ToolCard} from "./ToolCard.tsx";
import PeopleIcon from "@mui/icons-material/People";


const toolList = [
    <ToolCard
        icon={ScienceOutlinedIcon}
        title={"AGE - Editor"}
        description={"AGE Editor"}
        key={1}
    />,
    <ToolCard
        icon={PeopleIcon}
        title={"ToolUsers"}
        description={"ToolUsersEditing"}
        key={2}
    />,
    ...Array.from({length: 10}, (_, index) => (
        <ToolCard
            icon={ScienceOutlinedIcon}
            title={`Testing - ${index+10}`}
            description={`Testing ${index+10}`}
            key={index+10}
        />
    ))
]


export const ToolsMenu = observer(() => {
    const {t} = useTranslation();
    const [activeTool, setActiveTool] = useState<React.ReactElement | null>(null);

    const handleToolCardClick = (toolCard: React.ReactElement) => {
        setActiveTool(toolCard);
    }

    const handleToolCardClose = () => {
        setActiveTool(null);
    }

    return (
        <>
            <h2>
                {t("tools.title")} {activeTool && ` - ${activeTool.props.title}`}
                {activeTool && (
                    <Button onClick={handleToolCardClose} style={{marginLeft: '10px'}}>
                        {t("actions.close")}
                    </Button>
                )}
            </h2>
            {!activeTool && <>
                <Grid container spacing={2}>
                    {toolList.map((toolCard, index) => (
                        <Grid
                            key={index}
                            size={{xs: 12, sm: 6, md: 4, lg: 3}}
                            onClick={() => handleToolCardClick(toolCard)}
                        >
                            {toolCard}
                        </Grid>))}
                </Grid></>
            }
            {activeTool && <ToolDetailScreen/>}
        </>
    )
})