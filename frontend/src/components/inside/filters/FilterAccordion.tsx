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
    Switch,
    TextField
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
    filterMode?: string;
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
                                    storeFilterField,
                                    filterMode = "string"
                                }: FilterAccordionProps) => {


    const handleReset = () => {
        setFilterField([]);
        store.clearFilter(storeFilterField);
    }

    const filterOptions = Array.from(new Set(Array.from(
        store.items.values()).map((item: any) => item[storeFilterField])));

    const [filterField, setFilterField] = React.useState<string[]>(initialValue);
    const [isExpanded, setIsExpanded] = useState(initialExpanded);
    const [operator, setOperator] = useState('>');
    const [value, setValue] = useState('');

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
        const selectedValues = typeof value === 'string' ? value.split(',') : value;
        setFilterField(selectedValues);
        // add filter to store
        const newFilters = selectedValues.map(val => `${storeFilterField}-${val}`);
        store.filters = [...store.filters.filter(f => !f.startsWith(storeFilterField)), ...newFilters];
    };

    const handleNumberFilterChange = () => {
        store.filters = value ? [`${storeFilterField}-${operator}-${value}`] : [];
    };


    const stringMode = (<>
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
        </Select></>)
    const numberMode = (<>
        <InputLabel id="operator-label">Operator</InputLabel>
        <Select
            labelId="operator-label"
            id="operator-select"
            value={operator}
            onChange={(e) => {
                setOperator(e.target.value);
                handleNumberFilterChange();
            }}
            input={<OutlinedInput label="Operator"/>}
        >
            <MenuItem value=">">{">"}</MenuItem>
            <MenuItem value=">=">{">="}</MenuItem>
            <MenuItem value="<">{"<"}</MenuItem>
            <MenuItem value="<=">{"<="}</MenuItem>
        </Select>
        <TextField
            label="Value"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleNumberFilterChange}
            sx={{mt: 2}}
        />
    </>)

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
                {
                    filterMode === "string" ? stringMode :
                        filterMode === "number" ? numberMode : null}
            </FormControl>
            {resetButton &&
                <IconButton onClick={handleReset}><RestartAltIcon/></IconButton>
            }
        </Accordion>
    );
}
