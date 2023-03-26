import React from 'react';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {ChevronLeft,ChevronRightOutlined} from "@mui/icons-material"
import { useEffect,useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import FlexBetween from "./FlexBetween";
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import {useDispatch,useSelector} from 'react-redux';
import {SetProfile, SetEditProfile} from '../redux/UsersSlice';
import { SetSidebarOpen } from '../redux/DrawerSlice';
const navItems=[
  {
    text: "Users",
    icon : <ListRoundedIcon/>
  },
  {
    text: "Profile",
    icon:<AccountCircleRoundedIcon/>
  }
]

function Sidebar({
   drawerWidth,
  isNonMobile
}) {
  const dispatch = useDispatch()
  const {pathname}=useLocation()
  const [active, setActive]=useState("")
  const navigate=useNavigate()
  const {profile}=useSelector((state) => {
    return state.users;
  })
  const {isSidebarOpen}=useSelector((state) => {
    return state.sidebarToggler;
  })
  useEffect(() => {
    console.log(pathname)
    setActive(pathname.substring(1))// /dashboard
  }, [pathname])
  
  return (
     <Box component="nav" >
      {
        isSidebarOpen&&(
          <Drawer
            open={isSidebarOpen}
            onClose={() => SetSidebarOpen(!isSidebarOpen)}
            variant="persistent"
            anchor="left"
             sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: "white",
              backgroundColor: "#21295c",
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
            }}
          >
            <Box width={"100%"}>
              <Box m={"1.5rem"} >
                <FlexBetween color={"white"} >
                  <Box
                    display={"flex"}
                    alignItems="center"
                    gap={"0.5rem"} >
                    <Typography variant="h4" fontSize={"1.33rem"} >
                      Admin
                    </Typography>
                  </Box>
                  {!isNonMobile&&(
                    <IconButton sx={{
                      cursor:"pointer"
                    }}
                      onClick={() => dispatch(SetSidebarOpen(!isSidebarOpen))} >
                      <ChevronLeft/>
                     </IconButton>
                  )}
                </FlexBetween>
              </Box>
              <List>
                {
                  navItems.map((items) => {
                    const lcText=items.text.toLowerCase();
                    return (
                      <ListItem key={items.text}
                        disablePadding
                        onClick={() => {
                          dispatch(SetEditProfile(null))
                          dispatch(SetProfile(profile))
                          navigate(`/${lcText}`);
                          setActive(lcText);
                        }}
                        sx={{
                          cursor:"pointer",
                          backgroundColor:
                          active === lcText && "#ffd166",
                        color:
                          active === lcText&&"black",
                        }} >
                        <ListItemIcon
                          sx={{
                            color:active === lcText ? "black":"white",
                            ml: "1rem",
                
                          }}  >
                          {items.icon}
                        </ListItemIcon>
                        <ListItemText primary={items.text} />
                        {
                          active===lcText&&(
                            <ChevronRightOutlined sx={{
                              ml:"auto"
                            }} />
                          )
                        }
                       </ListItem>
                    )
                  })
                }
              </List>
            </Box>
           </Drawer>
        )
      }
    </Box>
  )
}

export default Sidebar