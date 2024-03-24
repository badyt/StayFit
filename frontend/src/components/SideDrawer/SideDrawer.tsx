import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import HistoryIcon from '@mui/icons-material/History';
import ScaleIcon from '@mui/icons-material/Scale';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import useSideDrawerStore from '../../stores/sidedrawerstore';
interface SideDrawerProps {
  setDrawer: (isOpen: boolean) => void,
  isOpen: boolean
}

interface DrawerTab {
  text: string,
  icon: any
}

type DrawerListType = DrawerTab[];

const FirstDrawerListItems: DrawerListType = [
  { text: "Diet Plan", icon: FoodBankIcon },
  { text: "Diet History", icon: MenuBookIcon },
  { text: "Workout Routine", icon: FitnessCenterIcon },
  { text: "Workout History", icon: HistoryIcon },
  { text: "Weight Measurements", icon: ScaleIcon }
]

const SecondDrawerListItems: DrawerListType = [
  { text: "Food", icon: FastfoodIcon },
  { text: "Workout Plans", icon: FormatListBulletedIcon },
  { text: "Workout Exercises", icon: FitnessCenterIcon }
]

const getListElement = (list: DrawerListType): React.ReactNode => {
  const { setContent } = useSideDrawerStore();
  return (
    <List >
      {list.map((item) => (
        <ListItem onClick={() => setContent(item.text)} key={item.text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {<item.icon />}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

const SideDrawer: React.FC<SideDrawerProps> = ({ setDrawer, isOpen }) => {
  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation" onClick={() => setDrawer(false)}>
      <IconButton onClick={() => setDrawer(false)}>
        <ChevronLeftIcon />
      </IconButton>
      <Divider />
      {getListElement(FirstDrawerListItems)}
      <Divider />
      {getListElement(SecondDrawerListItems)}
    </Box>
  );

  return (
    <div>
      <Drawer open={isOpen} onClose={() => setDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
export default SideDrawer;