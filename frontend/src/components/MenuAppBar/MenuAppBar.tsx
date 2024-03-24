import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import useLoginStore from '../../stores/loginstore';
import SideDrawer from '../SideDrawer'

export default function MenuAppBar() {

  const [openDrawer, setDrawer] = React.useState(false);
  const [auth, setAuth] = React.useState(false);
  const { user, logout } = useLoginStore();
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
  }

  return (
    <AppBar position="static" color='primary'>
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
          textAlign={auth ? "left" : "center"} variant="h6" component="div" sx={{ flexGrow: 1 }}>
          StayFit
        </Typography>
        {auth && (
          <div>
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