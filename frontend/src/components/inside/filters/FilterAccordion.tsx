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
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs, {Dayjs} from 'dayjs';
import {useTranslation} from "react-i18next";


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
        //TODO improvement for proper initValueResets needed
        setFilterField([]);
        setOperator('>');
        setValue('');
        setDateValue(dayjs('2024-12-10'));
        store.clearFilter(storeFilterField);
    }

    const filterOptions = Array.from(new Set(Array.from(
        store.items.values()).map((item: any) => item[storeFilterField])));

    const [filterField, setFilterField] = React.useState<string[]>(initialValue);
    const [isExpanded, setIsExpanded] = useState(initialExpanded);
    const [operator, setOperator] = useState('>');
    const [value, setValue] = useState('');
    const [dateValue, setDateValue] = React.useState<Dayjs | null>(dayjs('2024-12-10'));
    const {t} = useTranslation();

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

    const handleNumberFilterChange = (newOperator: string, newValue: string) => {
        const newFilter = newValue ? `${storeFilterField}-${newOperator}-${newValue}` : '';
        store.filters = [...store.filters.filter(f => !f.startsWith(storeFilterField)), ...(newFilter ? [newFilter] : [])];
    };

    const handleDateFilterChange = (newDate: Dayjs | null) => {
        if (newDate) {
            setDateValue(newDate);
            const newFilter = `${storeFilterField}-${newDate.toISOString()}`;
            store.filters = [...store.filters.filter(f => !f.startsWith(storeFilterField)), newFilter];
        } else {
            setDateValue(null);
            store.filters = store.filters.filter(f => !f.startsWith(storeFilterField));
        }
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
        </Select></>);
    const numberMode = (<>
        <InputLabel id="operator-label">{t("operator")}</InputLabel>
        <Select
            labelId="operator-label"
            id="operator-select"
            value={operator}
            onChange={(e) => {
                const newOperator = e.target.value;
                setOperator(newOperator);
                handleNumberFilterChange(newOperator, value);
            }}
            input={<OutlinedInput label={t("operator")}/>}
        >
            <MenuItem value=">">{">"}</MenuItem>
            <MenuItem value=">=">{">="}</MenuItem>
            <MenuItem value="<">{"<"}</MenuItem>
            <MenuItem value="<=">{"<="}</MenuItem>
        </Select>
        <TextField
            label={t("value")}
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => handleNumberFilterChange(operator, value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleNumberFilterChange(operator, value);
                }
            }}
            sx={{mt: 2}}
        />
    </>);
    const dateMode = (<>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label={filterFieldName}
                        value={dateValue}
                        onChange={(newDate) => handleDateFilterChange(newDate)}
                    />
                </DemoContainer>
            </LocalizationProvider>
        </>);

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
                        filterMode === "number" ? numberMode :
                            filterMode === "date" ? dateMode : null}
            </FormControl>
            {resetButton &&
                <IconButton onClick={handleReset}><RestartAltIcon/></IconButton>
            }
        </Accordion>
    );
}
