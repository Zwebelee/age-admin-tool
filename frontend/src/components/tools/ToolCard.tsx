import React from 'react';
import {Card, CardContent, Typography, Icon, CardActionArea} from '@mui/material';

export interface IToolCard {
    icon: React.ElementType;
    title: string;
    description: string;
    tool: React.ReactNode;
}

export const ToolCard: React.FC<IToolCard> = ({icon, title, description}) => {
    return (
        <Card>
            <CardActionArea>
                <CardContent sx={{backgroundColor: 'grey'}}>
                    <Icon component={icon} style={{fontSize: 40}}/>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};