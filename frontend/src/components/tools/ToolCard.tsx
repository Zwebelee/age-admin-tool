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
        <Card sx={{backgroundColor:'var(--lightness1-2)'}}>
            <CardActionArea sx={{height: '100%'}}>
                <CardContent>
                    <Icon component={icon} style={{fontSize: 40}}/>
                    <Typography variant="h6" component="div" sx={{color: 'var(--lightness2)'}}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{
                        color: 'var(--lightness2)',
                        fontStyle: 'italic'
                    }}>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};