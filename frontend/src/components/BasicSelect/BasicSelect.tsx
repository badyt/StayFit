import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
interface SelectionProps {
    label: string | undefined,
    items: Array<string> | undefined
    selection: string;
    setSelection: (event: string) => void;
}

export default function BasicSelect({ label, items, setSelection, selection }: SelectionProps) {
    // const [selection, setSelection] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSelection(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120, marginLeft: "1rem" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    style={{ fontFamily: "auto" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selection}
                    label={label}
                    onChange={handleChange}
                    autoWidth
                >
                    {/* <MenuItem disabled value="">
                        <em>{label}</em>
                    </MenuItem> */}
                    {items?.map((element, index) => (
                        <MenuItem
                            key={index}
                            value={`${element}`}
                        >
                            {element}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
