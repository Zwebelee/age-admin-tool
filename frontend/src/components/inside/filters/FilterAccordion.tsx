import {
    Checkbox,
    FormControl,
    IconButton,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Switch
} from "@mui/material";
import React, {ReactNode, useState} from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import {IAbstractStore} from "../../../stores/abstract-store.ts";

interface FilterAccordionProps {
    accordionName: string;
    filterFieldName: string;
    accordIcon: ReactNode;
    initialValue?: string[];
    resetButton?: boolean;
    onOffSwitch?: boolean;
    initialExpanded?: boolean;
    store: IAbstractStore;
    storeFilterField: string;
}

export const FilterAccordion = ({
                                    accordionName = "AccordionName",
                                    filterFieldName = "FilterFieldName",
                                    accordIcon = <AddPhotoAlternateOutlinedIcon/>,
                                    initialValue = [],
                                    resetButton = true,
                                    onOffSwitch = false,
                                    initialExpanded = false,
                                    store,
                                    storeFilterField
                                }: FilterAccordionProps) => {


    const handleReset = () => {
        setFilterField([]);
        store.clearFilter(storeFilterField);
    }

    const filterOptions = Array.from(new Set(Array.from(
        store.items.values()).map((item: any) => item[storeFilterField])));

    const [filterField, setFilterField] = React.useState<string[]>(initialValue);
    const [isExpanded, setIsExpanded] = useState(initialExpanded);

    const handleAccordionChange = (_event: React.SyntheticEvent, newIsExpanded: boolean) => {
        setIsExpanded(newIsExpanded);
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };


    const handleChange = (event: SelectChangeEvent<typeof filterField>) => {
        const {
            target: {value},
        } = event;
        setFilterField(
            // On autofill, we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        // add filter to store
        store.filters = value ? [`${storeFilterField}-${value}`] : [];

    };

    return (
        <Accordion expanded={isExpanded} onChange={handleAccordionChange}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography>
                    {accordIcon}
                    {accordionName}
                </Typography>
                {onOffSwitch && <Switch/>}
            </AccordionSummary>

            <FormControl sx={{m: 1, width: 300}}>
                <InputLabel id="demo-multiple-checkbox-label">{filterFieldName}</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={filterField}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag"/>}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {filterOptions.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={filterField.includes(name)}/>
                            <ListItemText primary={name}/>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {resetButton &&
                <IconButton onClick={handleReset}><RestartAltIcon/></IconButton>
            }
        </Accordion>
    );
}
