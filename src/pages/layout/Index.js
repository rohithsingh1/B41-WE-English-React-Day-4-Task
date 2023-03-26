import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import {Outlet} from 'react-router-dom';
import Sidebar from "../../components/Sidebar"

function Index() {
  const isNonMobile=useMediaQuery("(min-width: 600px)");
  return (
     <Box display={isNonMobile? "flex":"block"}
      width="100%"
      height="100%"
    >
      <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth="238px" />
      <Box flexGrow={1} >
        <Outlet />
      </Box>
    </Box>
  )
}

export default Index