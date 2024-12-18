import {observer} from "mobx-react-lite";
import {useTranslation} from "react-i18next";
import Grid from '@mui/material/Grid2';
import {ToolDetailScreen} from "../../screens/ToolDetailScreen.tsx";
import React, {useState} from "react";
import {Button} from "@mui/material";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import {ToolCard} from "./ToolCard.tsx";
import PeopleIcon from "@mui/icons-material/People";
import {AgeEditorTool} from "./age-editor-tool/AgeEditorTool.tsx";
import {AgeToolUserEditor} from "./tooluser-editor-tool/ToolUserEditor.tsx";
import ApartmentIcon from '@mui/icons-material/Apartment';


export const ToolsMenu = observer(() => {
    const {t} = useTranslation();
    const [activeTool, setActiveTool] = useState<React.ReactElement | null>(null);

    const toolList = [
        <ToolCard
            icon={ApartmentIcon}
            title={t("tools.age-editor.title")}
            description={t("tools.age-editor.description")}
            tool={<AgeEditorTool/>}
            key={1}
        />,
        <ToolCard
            icon={PeopleIcon}
            title={t("tools.tooluser-editor.title")}
            description={t("tools.tooluser-editor.description")}
            tool={<AgeToolUserEditor/>}
            key={2}
        />,
        ...Array.from({length: 10}, (_, index) => (
            <ToolCard
                icon={ScienceOutlinedIcon}
                title={`Testing - ${index+10}`}
                description={`Testing ${index+10}`}
                tool={<h1>Testing {index+10}</h1>}
                key={index+10}
            />
        ))
    ]

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
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                '& > *': {
                                    flex: 1
                                }
                            }}

                        >
                            {toolCard}
                        </Grid>))}
                </Grid></>
            }
            {activeTool && <ToolDetailScreen child={activeTool.props.tool}/>}
        </>
    )
})