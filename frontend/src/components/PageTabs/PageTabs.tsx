import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
interface Props {
  tabValues: string[];
  setTab: (value: string) => void;
  selectedTab: string;
}
export default function PageTabs({ tabValues, setTab, selectedTab }: Props) {
  // const [value, setValue] = React.useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
      // aria-label="secondary tabs example"
      sx={{
        '& .MuiTabs-indicator': {
          backgroundColor: 'var(--button-hover-bg-color)', // Custom indicator color
        },
        '& .MuiTab-root': {
          color: 'var(--button-hover-bg-color)', // Custom text color
          '&.Mui-selected': {
            color: 'var(--button-bg-color)', // Keep selected tab's text color
          },
        },
      }}
      >
        {tabValues.map((tab) => (
          <Tab value={tab} label={tab} />
        ))}
      </Tabs>
    </Box>
  );
}
