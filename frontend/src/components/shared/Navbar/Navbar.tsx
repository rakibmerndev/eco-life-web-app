import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaShoppingBag, FaUserCircle } from "react-icons/fa";
import "./styles/Navbar.css";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, signOutUser } = useAuth();

  const pages = [
    {
      path: "/",
      pathName: "Home",
    },
    {
      path: "/shop",
      pathName: "Shop",
    },
    {
      path: "/blogs",
      pathName: "Blogs",
    },
    {
      path: "/about",
      pathName: "About Us",
    },
    {
      path: "/contact",
      pathName: "Contact",
    },
  ];

  const settings = [
    { name: "Profile", path: "/profile" },
    { name: "Account", path: "/account" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Logout" },
  ];

  const handleLogout = () => {
    signOutUser();
    setAnchorElUser(null);
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ background: "white", border: "none", boxShadow: "none" }}
    >
      <Container maxWidth="xl" className="h-20">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
            gap: "10px",
            justifyItems: "center",
            alignItems: "center",
            paddingTop: "10px",
          }}
        >
          <Link to="/">
            <h1 className="hidden md:flex font-dancingScript text-[#039671] text-5xl mr-3 font-bold">
              {" "}
              EcoLife
            </h1>
          </Link>

          <Box className="xs:flex md:hidden">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ background: "#039671", padding: "2px" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.pathName}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Link to="/">
            <h1 className="xs:flex md:hidden text-center font-dancingScript text-[#039671] text-5xl font-bold">
              {" "}
              EcoLife
            </h1>
          </Link>

          <Box
            className="md:gap-1 lg:gap-10"
            sx={{
              display: { xs: "none", sm: "flex" },
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            {pages.map((page, index) => (
              <NavLink
                key={index}
                onClick={handleCloseNavMenu}
                className="my-2 text-[#D2B48C] block mr-3 font-openSans font-normal text-lg lg:text-xl hover:text-primary-color"
                to={page.path}
              >
                {page.pathName}
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <div className="w-1/2 mx-auto flex justify-center items-center gap-2">
              <Tooltip title="">
                <IconButton
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  className="flex justify-center items-center gap-2"
                  sx={{ p: 0 }}
                >
                  <FaShoppingBag className="text-primary-color" />
                  {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                </IconButton>
              </Tooltip>
              <Tooltip title="">
                <IconButton
                  onClick={handleOpenUserMenu}
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  className="flex justify-center items-center gap-2"
                  sx={{ p: 0 }}
                >
                  <FaUserCircle className="text-primary-color" />
                  {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                </IconButton>
              </Tooltip>
            </div>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user ? (
                settings.map((setting) =>
                  setting.name === "Logout" ? (
                    <MenuItem key={setting.name} onClick={handleLogout}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  ) : setting.path ? (
                    <MenuItem key={setting.path} onClick={handleCloseUserMenu}>
                      <Link to={setting.path}>
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ) : null
                )
              ) : (
                <MenuItem>
                  <Link to="/login">
                    <Typography onClick={handleCloseUserMenu} textAlign="center">Login</Typography>
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
