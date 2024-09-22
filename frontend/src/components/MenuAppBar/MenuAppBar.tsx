import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import useLoginStore from '../../stores/loginstore';
import SideDrawer from '../SideDrawer'
import useSideDrawerStore from '../../stores/sidedrawerstore';
import BasicSelect from '../BasicSelect';
import { resetAllStores } from '../../stores/resetStore';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: "auto",
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


export default function MenuAppBar() {

  const [openDrawer, setDrawer] = React.useState(false);
  const [auth, setAuth] = React.useState(false);
  const { user, logout } = useLoginStore();
  const { pickedDrawerTab } = useSideDrawerStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  React.useEffect(() => {
    const loggedIn = (user?.accessToken) ? true : false;
    setAuth(loggedIn);
  }, [user]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    resetAllStores();
  }

  return (
    <AppBar position="static"  sx={{ backgroundColor: 'var(--primary-bg-color)', color: 'var(--primary-text-color)' }}>
      <Toolbar>
        {(auth &&
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setDrawer(!openDrawer)}
          >
            <MenuIcon />
          </IconButton>)}
        <SideDrawer setDrawer={(value) => setDrawer(value)} isOpen={openDrawer} />
        <Typography
          fontFamily={"Garamond"}
          fontWeight={"bold"}
          fontSize={"25px"}
          color={"azure"}
          width={"auto"}
          textAlign={auth ? "left" : "center"} variant="h6" component="div">
          StayFit
        </Typography>
        {/* {pickedDrawerTab?.containSelect && <BasicSelect label={pickedDrawerTab?.selectionItems?.label} items={pickedDrawerTab.selectionItems?.items} />} */}
        {pickedDrawerTab?.containSearch && <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>}
        {auth && (
          <div style={{ marginLeft: pickedDrawerTab?.containSearch ? "" : "auto" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}