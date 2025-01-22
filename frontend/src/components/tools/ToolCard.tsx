import React from "react";
import {Card, CardContent, Typography, Icon, CardActionArea} from "@mui/material";

export interface IToolCard {
    icon: React.ElementType;
    title: string;
    description: string;
    tool: React.ReactNode;
}

export const ToolCard: React.FC<IToolCard> = ({icon, title, description}) => {
    return (
        <Card sx={{
            backgroundColor: "var(--color1-1)",
            textAlign: "center",
            borderRadius: 1.5,
            flexGrow: 1,
        }}>
            <CardActionArea sx={{
                height: "100%",
            }}>
                <CardContent>
                    <Card sx={{
                        width: "3.5rem",
                        height: "3.5rem",
                        margin: "0 auto",
                        borderRadius: "50%",
                        backgroundColor: "var(--lightness2-1)",
                        boxShadow: "none",
                    }}>
                        <Icon component={icon} style={{
                            marginTop: "0.8rem",
                            fontSize: 30,
                        }}/>
                    </Card>
                    <Typography variant="h6" component="div" sx={{
                        color: "var(--lightness2)"
                    }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{
                        color: "var(--lightness2)",
                        fontStyle: "italic",
                    }}>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};