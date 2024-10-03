import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
interface SelectionProps {
    label: string | undefined,
    items: Array<string> | undefined
    // selection: string;
    // setSelection: (event: string) => void;
}

export default function BasicSelect({ label, items }: SelectionProps) {
    const [selection, setSelection] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSelection(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120, marginLeft: "1rem", borderColor: "var(--border-color)" }}>
            <FormControl sx={{
                m: 1, minWidth: 120, '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'var(--border-color)', // Set border color here
                    },
                    '&:hover fieldset': {
                        borderColor: 'var(--button-hover-bg-color)', // Set hover border color
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'var(--border-color)', // Set focused border color
                    }
                }
            }}>
                <InputLabel id="demo-simple-select-label" sx={{
                    fontSize: '1rem',
                    color: 'var(--primary-text-color)', // Default label color
                    '&.Mui-focused': {
                        color: 'var(--primary-text-color)', // Label color when focused
                    }
                }}>{label}</InputLabel>
                <Select
                    style={{ fontFamily: "monospace", fontSize: '1rem' }}
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
                            sx={{ width: 120, backgroundColor: "var(--secondary-bg-color)" }}
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
