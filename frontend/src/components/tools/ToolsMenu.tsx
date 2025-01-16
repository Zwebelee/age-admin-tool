import {observer} from "mobx-react-lite";
import {useTranslation} from "react-i18next";
import Grid from "@mui/material/Grid2";
import {ToolDetailScreen} from "../../screens/ToolDetailScreen.tsx";
import React, {useState} from "react";
import {ToolCard} from "./ToolCard.tsx";
import {AgeEditorTool} from "./age-editor-tool/AgeEditorTool.tsx";
import {AgeToolUserEditor} from "./tooluser-editor-tool/ToolUserEditor.tsx";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";


export const ToolsMenu = observer(() => {
    const {t} = useTranslation();
    const [activeTool, setActiveTool] = useState<React.ReactElement | null>(null);

    const handleToolCardClick = (toolCard: React.ReactElement) => {
        setActiveTool(toolCard);
    }

    const handleToolCardClose = () => {
        setActiveTool(null);
    }

    const toolList = [
        <ToolCard
            icon={ApartmentOutlinedIcon}
            title={t("tools.age-editor.title")}
            description={t("tools.age-editor.description")}
            tool={
                <AgeEditorTool
                    cardClose={handleToolCardClose}
                />
            }
            key={1}
        />,
        <ToolCard
            icon={GroupAddOutlinedIcon}
            title={t("tools.tooluser-editor.title")}
            description={t("tools.tooluser-editor.description")}
            tool={
                <AgeToolUserEditor
                    cardClose={handleToolCardClose}
                />
            }
            key={2}
        />
    ]

    return (
        <div className="toolsMenu">
            <h2>{t("tools.title")} {activeTool && ` – ${activeTool.props.title}`}</h2>
            {/*
            {activeTool && (
                <Button className="toolsMenu__close" onClick={handleToolCardClose}>
                    {t("actions.close")}&nbsp;<HighlightOffOutlinedIcon/>
                </Button>
            )}
            */}
            {!activeTool &&
                <>
                    <Grid container spacing={2}>
                        {toolList.map((toolCard, index) => (
                            <Grid
                                key={index}
                                size={{xs: 12, sm: 6, md: 4, lg: 3}}
                                onClick={() => handleToolCardClick(toolCard)}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                {toolCard}
                            </Grid>))}
                    </Grid>
                </>
            }
            {activeTool && <ToolDetailScreen child={activeTool.props.tool}/>}
        </div>
    )
});
